import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';

@Component({
  selector: 'app-fuel-oil-tank-installation-diagram',
  templateUrl: './fuel-oil-tank-installation-diagram.component.html',
  styleUrls: ['./fuel-oil-tank-installation-diagram.component.scss'],
})
export class FuelOilTankInstallationDiagramComponent implements OnInit {
  constructor(private blogSerive: BlogService) {}
  ngOnInit(): void {
    this.blogSerive.breadCrumbsList = [
      { title: 'Heating System Repair', url: 'blog/heating-system-repair' },
      {
        title: 'Oil Tank Replacement',
        url: 'blog/heating-system-repair/oil-tank-replacement',
      },
      {
        title: 'Fuel Oil Tank Installation Diagram',
        url: 'blog/heating-system-repair/fuel-oil-tank-installation-diagram',
      },
    ];
  }
}
