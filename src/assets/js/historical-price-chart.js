class HistoricalPriceChart {
  constructor({ el }) {
    this.el = el;
    this.resize = this.resize.bind(this);
    this.moved = this.moved.bind(this);
    this.left = this.left.bind(this);
    this.init();
  }

  init() {
    this.setup();
    this.scaffold();
    this.resize();
    window.addEventListener("resize", this.resize);
  }

  setup() {
    this.parseDate = d3.utcParse("%-m/%-d/%Y");
    this.formatFocusDate = d3.utcFormat("%B %-d, %Y");
    this.formatValue = (d) => `$${d.toFixed(2)}`;
    this.formatYTick = d3.format("$.2f");

    this.januaryFormatThresholdInDays = 180;
    this.formatDay = d3.utcFormat("%b"); // d3.utcFormat("%-d");
    this.formatMonth = d3.utcFormat("%b");

    this.formatXTick = (date) =>
      (d3.utcMonth(date) < date
        ? this.formatDay
        : d3.utcYear(date) < date
        ? this.formatMonth
        : this.formatYear)(date);

    this.focusCircleRadius = 5;
    this.marginTop = this.focusCircleRadius;
    this.marginRight = 0;
    this.marginBottom = this.focusCircleRadius + 20;
    this.marginLeft = 0;

    this.x = d3.scaleUtc();
    this.y = d3.scaleLinear();

    this.line = d3
      .line()
      .x((_, i) => this.x(this.dates[i]))
      .y((d) => this.y(d))
      .curve(d3.curveMonotoneX)
      .defined((d) => d !== null);

    this.area = d3
      .area()
      .x((_, i) => this.x(this.dates[i]))
      .y0(() => this.y.range()[0])
      .y1((d) => this.y(d))
      .curve(d3.curveMonotoneX);
  }

  scaffold() {
    this.container = d3
      .select(this.el)
      .append("div")
      .attr("class", "historical-price-chart");

    this.chartContainer = this.container
      .append("div")
      .attr("class", "chart-container");

    this.svg = this.chartContainer
      .append("svg")
      .attr("class", "chart-svg")
      .on("pointermove", this.moved)
      .on("pointerleave", this.left)
      .on("touchend", this.left);
    this.gRects = this.svg.append("g").attr("class", "rects-g");
    this.gAreas = this.svg.append("g").attr("class", "areas-g");
    this.gLines = this.svg.append("g").attr("class", "lines-g");
    this.gX = this.svg.append("g").attr("class", "axis-g axis-g--x");
    this.gY = this.svg.append("g").attr("class", "axis-g axis-g--y");
    this.gFocus = this.svg.append("g").attr("class", "focus-g");

    this.tooltip = this.container.append("div").attr("class", "chart-tooltip");
  }

  resize() {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth || 0;
    this.width = window.innerWidth - scrollBarWidth;
    this.height = this.chartContainer.node().clientHeight;
    this.boundedWidth = this.width - this.marginLeft - this.marginRight;
    this.boundedHeight = this.height - this.marginTop - this.marginBottom;

    this.x.range([this.marginLeft, this.width - this.marginRight]);
    this.y.range([this.height - this.marginBottom, this.marginTop]);

    this.chartContainer
      .style("width", `${this.width}px`)
      .style("margin-left", `calc(-50vw + ${scrollBarWidth / 2}px)`)
      .style("margin-right", `calc(-50vw + ${scrollBarWidth / 2}px)`);
    this.svg.attr("viewBox", [0, 0, this.width, this.height]);

    if (this.data) this.render();
  }

  wrangle(animate) {
    const keys = Object.keys(this.data[0]);
    const dateKey = keys.find((key) => key.toLowerCase().includes("date"));
    if (!dateKey) {
      throw Error("Date key is required for historical price chart data.");
    }
    const heatFleetKey = keys.find((key) =>
      key.toLowerCase().includes("heatfleet")
    );
    if (!heatFleetKey) {
      throw Error(
        "Heat fleet key is required for historical price chart data."
      );
    }
    const stateKey = keys.find((key) => ![dateKey, heatFleetKey].includes(key));

    this.data.sort((a, b) =>
      d3.ascending(this.parseDate(a[dateKey]), this.parseDate(b[dateKey]))
    );

    this.dates = this.data.map((d) => this.parseDate(d[dateKey]));
    this.series = [heatFleetKey, stateKey].map((key, i) => ({
      type: i ? "state" : "heat-fleet",
      key,
      displayName: i ? stateKey : "Heating Oil Average",
      values: this.data.map((d) => d[key] || null),
    }));

    this.iFocus = null;

    this.x.domain(d3.extent(this.dates));
    this.y.domain([
      d3.min(this.series, (d) => d3.min(d.values)),
      d3.max(this.series, (d) => d3.max(d.values)),
    ]);

    this.formatYear =
      d3.utcDay.count(...this.x.domain()) <= this.januaryFormatThresholdInDays
        ? d3.utcFormat("%b")
        : d3.utcFormat("%Y");

    this.render(animate);
  }

  render(animate) {
    this.renderRects();
    this.renderAreas();
    this.renderLines();
    this.renderXAxis();
    this.renderYAxis();
    this.renderFocus();
    if (animate) {
      this.setupEnterAnimation();
    }
  }

  renderAreas() {
    this.areaPath = this.gAreas
      .selectAll(".area-path")
      .data(this.series.slice(0, 1))
      .join((enter) =>
        enter.append("path").attr("class", (d) => `area-path ${d.type}`)
      )
      .attr("d", (d) => this.area(d.values));
  }

  renderLines() {
    this.linePath = this.gLines
      .selectAll(".line-path")
      .data(this.series)
      .join((enter) =>
        enter.append("path").attr("class", (d) => `line-path ${d.type}`)
      )
      .attr("d", (d) => this.line(d.values));
  }

  renderRects() {
    this.areaRect = this.gRects
      .selectAll(".area-rect")
      .data([0])
      .join((enter) =>
        enter
          .append("rect")
          .attr("class", "area-rect")
          .attr("height", this.marginBottom)
      )
      .attr("y", this.height - this.marginBottom)
      .attr("width", this.width);
  }

  renderXAxis() {
    this.gX
      .attr("transform", `translate(0,${this.height - this.marginBottom})`)
      .call(
        d3
          .axisBottom(this.x)
          .ticks(this.boundedWidth / 100)
          .tickFormat(this.formatXTick)
          .tickSize(0)
          .tickPadding(8 + this.focusCircleRadius)
      )
      .call((g) =>
        g.selectAll(".tick").style("display", (d, i, n) => {
          // if (d.getUTCDate() !== 1) return "none";
          if (d.getUTCHours() !== 0) return "none";
          if (i > 0) {
            const prevText = d3
              .select(n[i - 1])
              .select("text")
              .text();
            const cureeText = d3.select(n[i]).select("text").text();
            if (prevText == cureeText) return "none";
          }
          if (i === 0 || i === n.length - 1) {
            const box = n[i].getBoundingClientRect();
            if (box.x < 0 || box.x + box.width > this.width) return "none";
          }
          return null;
        })
      )
      .call((g) => g.select(".domain").remove());
  }

  renderYAxis() {
    this.gY
      .attr("transform", `translate(${this.marginLeft}, 0)`)
      .call(
        d3
          .axisRight(this.y)
          .ticks(this.boundedHeight / 100)
          .tickFormat(this.formatYTick)
          .tickSize(0)
          .tickPadding(8)
      )
      .call((g) => g.select(".domain").remove());
  }

  setupEnterAnimation() {
    if (IntersectionObserver) {
      this.svg.attr("pointer-events", "none");
      this.linePath
        .attr("pathLength", 1)
        .attr("stroke-dasharray", 1)
        .attr("stroke-dashoffset", 1);
      this.areaPath.attr("fill-opacity", 0);
      this.areaRect.attr("fill-opacity", 0);

      this.observer = new IntersectionObserver(() => {
        this.observer.unobserve(this.el);
        const t0 = this.svg.transition().ease(d3.easeLinear).duration(1000);
        this.linePath.transition(t0).attr("stroke-dashoffset", 0);
        const t1 = t0.transition();
        this.areaPath.transition(t1).attr("fill-opacity", 1);
        this.areaRect.transition(t1).attr("fill-opacity", 1);
        t1.on("end", () => {
          this.svg.attr("pointer-events", null);
        });
      });
      this.observer.observe(this.el);
    }
  }

  renderFocus() {
    const i = this.iFocus === null ? this.dates.length - 1 : this.iFocus;
    this.gFocus
      .selectAll(".focus-circle")
      .data(this.series)
      .join((enter) =>
        enter
          .append("circle")
          .attr("class", (d) => `focus-circle ${d.type}`)
          .attr("r", this.focusCircleRadius)
      )
      .attr("cx", this.x(this.dates[i]))
      .attr("cy", (d) => this.y(d.values[i]))
      .style("display", (d) => (d.values[i] === null ? "none" : null));
  }

  moved(event) {
    if (!this.dates) return;
    const [mx] = d3.pointer(event, this.svg.node());
    const vx = this.x.invert(mx);
    const i = d3.bisectCenter(this.dates, vx);
    if (i !== this.iFocus) {
      this.iFocus = i;
      this.renderFocus();
      this.showTooltip();
    }
    this.moveTooltip(event);
  }

  left() {
    this.iFocus = null;
    this.renderFocus();
    this.hideTooltip();
  }

  showTooltip() {
    const focusDate = this.dates[this.iFocus];

    const focusValues = this.series
      .map((d) => ({
        type: d.type,
        displayName: d.displayName,
        value: d.values[this.iFocus],
      }))
      .filter((d) => d.value !== null)
      .sort((a, b) => d3.descending(a.value, b.value));

    const content = `
        <div class="focus-date">${this.formatFocusDate(focusDate)}</div>
        <table>
          <tbody>
            ${focusValues
              .map(
                (d) => `<tr class="focus ${d.type}">
              <td class="focus-label">${d.displayName}</td>
              <td class="focus-value">${this.formatValue(d.value)}</td>
            </tr>`
              )
              .join("")}
          </tbody>
        </table>
    `;

    this.tooltip.html(content).classed("is-visible", true);

    this.tBox = this.tooltip.node().getBoundingClientRect();
  }

  moveTooltip(event) {
    let x = this.x(this.dates[this.iFocus]);
    const offset = this.focusCircleRadius + 8;
    const margin = 16;
    if (x < window.innerWidth / 2) {
      x += offset;
      if (x + this.tBox.width > window.innerWidth - margin) {
        x = window.innerWidth - margin - this.tBox.width;
      }
    } else {
      x -= offset + this.tBox.width;
      if (x < margin) {
        x = margin;
      }
    }
    let y = event.y - this.tBox.height - offset;

    this.tooltip.style("transform", `translate(${x}px,${y}px)`);
  }

  hideTooltip() {
    this.tooltip.classed("is-visible", false);
  }

  updateData(data) {
    this.data = data;
    this.wrangle(true);
  }
}
