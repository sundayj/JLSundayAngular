import { Component, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Tour of Heroes';
  links = ['Dashboard', 'Heroes']
  activeLink = this.links[0];

  background: ThemePalette = undefined;


  constructor(
    private location: Location
  ) {}

  ngOnInit() {
    // This allows the correct link to be active if the page is reloaded
    // on something other than the Dashboard
    this.location.onUrlChange(
      (url, state) => {
        // Removes the forwards slash and capitalizes the first letter
        this.activeLink = url.charAt(1).toUpperCase() + url.slice(2);
      }
    )
  }
}
