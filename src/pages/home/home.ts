import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { CheckListPage } from '../check-list/check-list';
import { CheckListModel } from '../../models/checklist-models';
import { Data } from '../../providers/data';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  checkLists: CheckListModel[];

  constructor(public navCtrl: NavController,
              public dataService: Data,
              public alertController: AlertController,
              public platform: Platform) {}

  public ionViewDidLoad(): void{}

  public addCheckList(): void{}

  public renameCheckList(checkList: CheckListModel): void{}

  public viewCheckList(checkList: CheckListModel): void{}

  public removeCheckList(checkList: CheckListModel): void{}

  public save(): void{}
}
