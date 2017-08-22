import { Component } from '@angular/core';

import { ListPage } from '../list/list';
import { HomePage } from '../home/home';
import {Parque} from '../../domain/parque';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  parques: Parque[] = [];

  tab1Root = HomePage;
  tab2Root = ListPage;

  constructor() {

  }
}
