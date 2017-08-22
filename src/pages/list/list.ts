import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Parque} from '../../domain/parque';
import {SharedService} from '../../services/shared.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  parks: Parque[] = [];

  constructor(public navCtrl: NavController, public sharedService: SharedService) {
      this.parks = sharedService.getParques();
  }

  ionViewWillEnter() {
      this.parks = this.sharedService.getParques();
  }

}
