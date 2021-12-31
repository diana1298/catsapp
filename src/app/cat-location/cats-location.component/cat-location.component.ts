import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Cat, Marker} from "../../cat.model";

@Component({
  selector: 'app-cat-location-component',
  templateUrl: './cat-location.component.html',
  styleUrls: ['./cat-location.component.scss']
})
export class CatLocationComponent implements OnInit, AfterViewInit {

  title = 'Where are My Cats?';
  lat = 9.946476;
  lng = -84.131804;
  catList: Cat[];
  zoom: number = 16;

  markers: Marker[] = [];

  @Input('catsList') set _catListRef(catsStore: any) {
    console.log(catsStore)
    this.catList = catsStore.catsList.cats;
    for(const cat of this.catList) {
      this.markers.push({
        lat: cat.location._lat,
        lng: cat.location._long,
        label: cat.name,
        draggable: false
      });
    }
    console.log('markers',this.markers)
  }

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

}
