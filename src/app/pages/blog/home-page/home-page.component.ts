import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  @ViewChild("el") el: ElementRef;
  scroll() {
    // this.el.nativeElement.scrollIntoView();
    this.el.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    })
  }
}
