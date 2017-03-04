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

  public addChecklist(): void{
    this.alertController.create({
      title: 'New Checklist',
      message: 'Enter the name of your new checklist below:',
      inputs: [
        {name: 'name'}
      ],
      buttons:[
        {text: 'cancel'},
        {
          text: 'save',
          handler: data => {
            let newCheckList = new CheckListModel(data.name);
            this.checkLists.push(newCheckList);
            newCheckList.checkList.subscribe(update => {
              this.save();
            });
            this.save();
          }
        }
      ]
    }).present();
  }

  public renameCheckList(checkList: CheckListModel): void{}

  public viewCheckList(checkList: CheckListModel): void{}

  public removeCheckList(checkList: CheckListModel): void{}

  public save(): void{}
}
