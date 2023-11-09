import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enter-zip',
  templateUrl: './enter-zip.page.html',
  styleUrls: ['./enter-zip.page.scss'],
})
export class EnterZipPageComponent implements OnInit {
  isMenuOpen: boolean = false;
  homeSizeValue: number = 100;
  occupantsValue: number = 4;

  constructor() {}

  ngOnInit() {}

  toggleButton() {
    console.log('Hello');
    this.isMenuOpen = !this.isMenuOpen;
  }

  updateHomeSize() {
    this.homeSizeValue = +this.homeSizeValue;
  }

  updateOccupants() {
    this.occupantsValue = +this.occupantsValue;
  }
  play() {
    console.log('play');
  }
}
