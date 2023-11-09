import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Inject
} from '@angular/core';
// import { CommonService } from 'src/app/heatfleet-landing/common.config';
// import { Chart } from 'chart.js';
// "chart.js": "^2.9.4",
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-fuel-comparison',
  templateUrl: './fuel-comparison.component.html',
  styleUrls: ['./fuel-comparison.component.scss'],
})
export class FuelComparisonComponent implements OnChanges {

  pieChartData = [
    { label: 'Slice 1', value: 30, color: 'red' },
    { label: 'Slice 2', value: 20, color: 'green' },
    { label: 'Slice 3', value: 50, color: 'blue' },
  ];

  // @ViewChild('pieChart') pieChartElement: ElementRef;
  @Input() townData: any;
  @Input() isState: boolean;
  @Input() isLandingPage: boolean;
  fuels_list: any;
  fuelUserData = [];
  currentYear: number;
  randomNumber: number;
  randomYear: number;
  heatingOilHistory = [];
  electicityChangePercentage: any;
  solarChangePercentage: any;
  heatingOilChangePertage: any;
  twoYearAgoYear: number;
  isTownHouseholdDataAvailable: boolean;
  currentYearHousehold: any;
  isHeatingOilHistory: boolean = false;
  startYear: any;
  endYear: any;
  sumOfRemainingFuels: any;
  isBrowser = false;
  FuelData = [];

  constructor(private cdref: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document) {


    this.fuels_list = [
      {
        key: 0,
        name: 'natural gas',
      },
      {
        key: 1,
        name: 'propane',
      },
      {
        key: 2,
        name: 'electricity',
      },
      {
        key: 3,
        name: 'heating oil',
      },
      {
        key: 4,
        name: 'coal',
      },
      {
        key: 5,
        name: 'wood',
      },
      {
        key: 6,
        name: 'solar',
      },
      {
        key: 7,
        name: 'other fuels',
      },
      {
        key: 8,
        name: 'no fuel',
      },
    ];
  }

  ngOnInit() {
    this.isTownHouseholdDataAvailable =
        this.townData.isTownHouseholdDataAvailable;

    console.log("heatingOilHistory check 1:",this.heatingOilHistory);
        

      this.heatingOilHistory = this.townData.heatingOilData10Years;

      if (parseInt(Object.keys(this.heatingOilHistory)[11]) > 0) {
        this.isHeatingOilHistory = true;
      }

      if (this.isState) {
        this.townData.city = this.townData.stateName.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        );
      }
      if (this.isLandingPage) {
        this.townData.city = 'U.S.';
      }
      this.calculateData();
      
    if (this.fuelUserData.length) {

      const data = [
        { label: "Category A", value: 10 },
        { label: "Category B", value: 20 },
        { label: "Category C", value: 20 },
        { label: "Category D", value: 50 },
      ];

      // this.createCustomPieChart(data);
      // this.createPieChart(this.fuelUserData);


      this.FuelData = [

        {
          label: this.fuelUserData[0].name,
          content: this.fuelUserData[0].percentage
        },
        {
          label: this.fuelUserData[1].name,
          content: this.fuelUserData[1].percentage
        },
        {
          label: this.fuelUserData[2].name,
          content: this.fuelUserData[2].percentage
        },
        {
          label: this.fuelUserData[3].name,
          content: this.fuelUserData[3].percentage
        },
        {
          label: this.fuelUserData[4].name,
          content: this.fuelUserData[4].percentage
        },
        {
          label: this.fuelUserData[5].name,
          content: this.fuelUserData[5].percentage
        },
        {
          label: this.fuelUserData[6].name,
          content: this.fuelUserData[6].percentage
        },
        {
          label: this.fuelUserData[7].name,
          content: this.fuelUserData[7].percentage
        },
        {
          label: this.fuelUserData[8].name,
          content: this.fuelUserData[8].percentage
        },
      ];



      // console.log("  this.FuelData",  this.FuelData);

    }
    console.log("heatingOilHistory check 2:",this.heatingOilHistory);
    
    if (this.heatingOilHistory) {
      // this.createLinegraph(this.heatingOilHistory);                         
      this.startYear = Object.keys(this.heatingOilHistory)[0];
      this.endYear = Object.keys(this.heatingOilHistory)[11];
      this.cdref.detectChanges();
    }
   }

  ngOnChanges(changes: SimpleChanges) {

    // if (changes['townData'] && this.townData) {
    //   this.isTownHouseholdDataAvailable =
    //     this.townData.isTownHouseholdDataAvailable;

    //   this.heatingOilHistory = this.townData.heatingOilData10Years;

    //   if (parseInt(Object.keys(this.heatingOilHistory)[11]) > 0) {
    //     this.isHeatingOilHistory = true;
    //   }

    //   if (this.isState) {
    //     this.townData.city = this.townData.stateName.replace(/\b\w/g, (char) =>
    //       char.toUpperCase()
    //     );
    //   }
    //   if (this.isLandingPage) {
    //     this.townData.city = 'U.S.';
    //   }
    //   this.calculateData();
    // }


    // if (changes['townData'] && this.townData) {
    //   this.isTownHouseholdDataAvailable =
    //     this.townData.isTownHouseholdDataAvailable;

    //   this.heatingOilHistory = this.townData.heatingOilData10Years;

    //   console.log(this.heatingOilHistory);

    //   if (parseInt(Object.keys(this.heatingOilHistory)[11]) > 0) {
    //     this.isHeatingOilHistory = true;
    //   }

    //   if (this.isState) {
    //     this.townData.city = this.townData.stateName.replace(/\b\w/g, (char) =>
    //       char.toUpperCase()
    //     );
    //   }
    //   if (this.isLandingPage) {
    //     this.townData.city = 'U.S.';
    //   }
    //   this.calculateData();
    // }
  }


  createCustomPieChart(data) {


    const chartElement = document.getElementById('chart');
    let angle = 0;

    data.forEach(item => {
      const segment = document.createElement('div');
      segment.classList.add('chart-segment');
      segment.style.transform = `rotate(${angle}deg) skewY(${item.value * 3.6}deg)`;
      chartElement.appendChild(segment);
      angle += item.value * 3.6;
    });
  }
  ngAfterViewInit() {

    // if (this.fuelUserData.length) {

    //   const data = [
    //     { label: "Category A", value: 10 },
    //     { label: "Category B", value: 20 },
    //     { label: "Category C", value: 20 },
    //     { label: "Category D", value: 50 },
    //   ];

    //   // this.createCustomPieChart(data);
    //   // this.createPieChart(this.fuelUserData);


    //   this.FuelData = [

    //     {
    //       label: this.fuelUserData[0].name,
    //       content: this.fuelUserData[0].percentage
    //     },
    //     {
    //       label: this.fuelUserData[1].name,
    //       content: this.fuelUserData[1].percentage
    //     },
    //     {
    //       label: this.fuelUserData[2].name,
    //       content: this.fuelUserData[2].percentage
    //     },
    //     {
    //       label: this.fuelUserData[3].name,
    //       content: this.fuelUserData[3].percentage
    //     },
    //     {
    //       label: this.fuelUserData[4].name,
    //       content: this.fuelUserData[4].percentage
    //     },
    //     {
    //       label: this.fuelUserData[5].name,
    //       content: this.fuelUserData[5].percentage
    //     },
    //     {
    //       label: this.fuelUserData[6].name,
    //       content: this.fuelUserData[6].percentage
    //     },
    //     {
    //       label: this.fuelUserData[7].name,
    //       content: this.fuelUserData[7].percentage
    //     },
    //     {
    //       label: this.fuelUserData[8].name,
    //       content: this.fuelUserData[8].percentage
    //     },
    //   ];



    //   // console.log("  this.FuelData",  this.FuelData);

    // }
    // if (this.heatingOilHistory) {
    //   // this.createLinegraph(this.heatingOilHistory);                         
    //   this.startYear = Object.keys(this.heatingOilHistory)[0];
    //   this.endYear = Object.keys(this.heatingOilHistory)[11];
    //   this.cdref.detectChanges();
    // }
  }

  calculateData() {
    // console.time('functionTime');
    this.randomYear = this.getRandomNumber(8, 11);
    let year = this.currentYear - 1;
    this.currentYearHousehold =
      this.townData.townHouseholdDataByYears[year].totalHousehold;

    this.fuelUserData = this.townData.townHouseholdDataByYears[
      year
    ].fuelUserData.map((data) => {
      return {
        name: this.fuels_list[data.key].name,
        users: data.value,
        percentage: Math.round(
          Math.round(
            (data.value /
              this.townData.townHouseholdDataByYears['2022'].totalHousehold) *
            100 *
            100
          ) / 100
        ),
      };
    });

    this.fuels_list = this.fuels_list.map((fuel) => {
      var currentHousehold;
      this.townData.townHouseholdDataByYears[year].fuelUserData.map((data) => {
        if (fuel.key == data.key) {
          currentHousehold = data.value;
        }
      });

      const temp_year = this.randomYear.toString();
      var historicalHousehold;
      this.townData.townHouseholdDataByYears[temp_year].fuelUserData.map(
        (data) => {
          if (fuel.key == data.key) {
            historicalHousehold = data.value;
          }
        }
      );

      var householdIncrease;
      if (currentHousehold > historicalHousehold) {
        householdIncrease = true;
      } else householdIncrease = false;

      return {
        ...fuel,
        currentHousehold,
        historicalHousehold,
        householdIncrease,
      };
    });
    this.calculatePercentage(this.fuels_list);

    this.sumOfRemainingFuels =
      this.fuelUserData[5].users +
      this.fuelUserData[6].users +
      this.fuelUserData[7].users +
      this.fuelUserData[8].users;
  }

  calculatePercentage(data_: any) {
    if (data_[2].householdIncrease) {
      if (data_[2].historicalHousehold) {
        this.electicityChangePercentage = Math.round(
          Math.round(
            ((data_[2].currentHousehold - data_[2].historicalHousehold) /
              data_[2].historicalHousehold) *
            100 *
            100
          ) / 100
        );
      } else {
        this.electicityChangePercentage = data_[2].currentHousehold * 100;
      }
    } else {
      if (data_[2].currentHousehold) {
        this.electicityChangePercentage = Math.round(
          Math.round(
            ((data_[2].historicalHousehold - data_[2].currentHousehold) /
              data_[2].historicalHousehold) *
            100 *
            100
          ) / 100
        );
      } else {
        this.electicityChangePercentage = data_[2].historicalHousehold * 100;
      }
    }

    if (data_[6].householdIncrease) {
      if (data_[6].historicalHousehold) {
        this.solarChangePercentage = Math.round(
          Math.round(
            ((data_[6].currentHousehold - data_[6].historicalHousehold) /
              data_[6].historicalHousehold) *
            100 *
            100
          ) / 100
        );
      } else {
        this.solarChangePercentage = data_[6].currentHousehold * 100;
      }
    } else {
      if (data_[6].currentHousehold) {
        this.solarChangePercentage = Math.round(
          Math.round(
            ((data_[6].historicalHousehold - data_[6].currentHousehold) /
              data_[6].historicalHousehold) *
            100 *
            100
          ) / 100
        );
      } else {
        this.solarChangePercentage = data_[6].historicalHousehold * 100;
      }
    }

    if (data_[3].householdIncrease) {
      if (data_[3].historicalHousehold) {
        this.heatingOilChangePertage = Math.round(
          Math.round(
            ((data_[3].currentHousehold - data_[3].historicalHousehold) /
              data_[3].historicalHousehold) *
            100 *
            100
          ) / 100
        );
      } else {
        this.heatingOilChangePertage = data_[3].currentHousehold * 100;
      }
    } else {
      if (data_[3].currentHousehold) {
        this.heatingOilChangePertage = Math.round(
          Math.round(
            ((data_[3].historicalHousehold - data_[3].currentHousehold) /
              data_[3].historicalHousehold) *
            100 *
            100
          ) / 100
        );
      } else {
        this.heatingOilChangePertage = data_[3].historicalHousehold * 100;
      }
    }
  }

  getRotation(value: number): number {
    return (value / this.getTotalValue() * 360);
  }

  getTotalValue(): number {
    return this.pieChartData.reduce((total, slice) => total + slice.value, 0);
  }


  //   createPieChart(data_: any) {
  //     const chartElement = this.document.getElementById(
  //       'pieChart'
  //     ) as HTMLCanvasElement;
  //     const ctx = chartElement.getContext('2d');

  //     const data = {
  //       labels: [
  //         data_[0].name,
  //         data_[1].name,
  //         data_[2].name,
  //         data_[3].name,
  //         data_[4].name,
  //         data_[5].name,
  //         data_[6].name,
  //         data_[7].name,
  //         data_[8].name,
  //       ],
  //       datasets: [
  //         {
  //           data: [
  //             data_[0].percentage,
  //             data_[1].percentage,
  //             data_[2].percentage,
  //             data_[3].percentage,
  //             data_[4].percentage,
  //             data_[5].percentage,
  //             data_[6].percentage,
  //             data_[7].percentage,
  //             data_[8].percentage,
  //           ],
  //           backgroundColor: [
  //             '#FF6384',
  //             '#36A2EB',
  //             '#FFCE56',
  //             '#4BC0C0',
  //             '#9966FF',
  //             '#FF9F40',
  //             '#23B6E9',
  //             '#FFC870',
  //           ],
  //           hoverBackgroundColor: [
  //             '#FF6384',
  //             '#36A2EB',
  //             '#FFCE56',
  //             '#4BC0C0',
  //             '#9966FF',
  //             '#FF9F40',
  //             '#23B6E9',
  //             '#FFC870',
  //           ],
  //         },
  //       ],
  //     };
  // // commented_v
  //     new Chart(ctx, {
  //       type: 'pie',
  //       data: data,
  //       options: {
  //         legend: {
  //           display: true,
  //           position: window.innerWidth >= 700 ? 'right' : 'top',
  //           labels: {
  //             fontSize: 16,
  //             fontStyle: 'bold',
  //             fontColor: '#333',
  //             fontFamily: 'HK-Grotesk, Arial, Helvetica, sans-serif',
  //             padding: 10,
  //           },
  //         },
  //         // maintainAspectRatio: window.innerWidth <= 700 ? false : true,
  //         // height: window.innerWidth <= 700 ? 400 : undefined,
  //         // width: window.innerWidth <= 700 ? 400 : undefined,
  //       },
  //     });
  //   }

  getRandomNumber(min: number, max: number) {
    this.currentYear = new Date().getFullYear();
    this.twoYearAgoYear = this.currentYear - 2;
    this.randomNumber = Math.round(Math.random() * (max - min + 1)) + min;
    return this.currentYear - this.randomNumber;
  }

  // createLinegraph(data_: any) {
  //   const chartElement = this.document.getElementById(
  //     'lineGraph'
  //   ) as HTMLCanvasElement;
  //   const ctx = chartElement.getContext('2d');

  //   let years = Object.keys(data_);
  //   let users = Object.values(data_);

  //   const data = {
  //     labels: years,
  //     datasets: [
  //       {
  //         label: 'Households',
  //         data: users,
  //         borderColor: '#0e8bde',
  //         backgroundColor: '#f5f9fd',
  //         tension: 0.4,
  //         fill: true,
  //       },
  //     ],
  //   };

  //   const options = {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         position: 'left',
  //       },
  //       title: {
  //         display: true,
  //         text: 'Heating Oil Households',
  //       },
  //     },
  //     scales: {
  //       xAxes: [
  //         {
  //           gridLines: {
  //             display: false,
  //           },
  //         },
  //       ],
  //       yAxes: [
  //         {
  //           gridLines: {
  //             display: false,
  //           },
  //           ticks: {
  //             callback: function (value, index, values) {
  //               return (value / 1000000).toFixed(2) + 'M';
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   };

  //   // commented_v
  //   const lineGraph = new Chart(ctx, {
  //     type: 'line',
  //     data: data,
  //     options: options,
  //   });
  // }
}
