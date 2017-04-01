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

  public ionViewDidLoad(): void{
    this.checkLists = [];
  }

  public addChecklist(): void{
    this.alertController.create({
      title: 'New Checklist',
      message: 'Enter the name of your new checklist below:',
      inputs: [
        {name: 'name'}
      ],
      buttons:[
        {text: 'Cancel'},
        {
          text: 'Save',
          handler: data => {
            console.log(data);
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

  public renameCheckList(checkList: CheckListModel): void{
    this.alertController.create({
      title: 'Rename checklist',
      message: 'Enter the new name of this checklist below:',
      inputs: [
        {name: 'name'}
      ],
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Save',
          handler: data => {
            let index = this.checkLists.indexOf(checkList);
            if(index > -1){
              this.checkLists[index].setTitle(data.name);
              this.save();
            }
          }
        }
      ]
    }).present();
  }

  public viewChecklist(checkList: CheckListModel): void{
    this.navCtrl.push(CheckListPage, {checkList: checkList});
  }

  public removeCheckList(checkList: CheckListModel): void{
    let index = this.checkLists.indexOf(checkList);
    if(index > -1){
      this.checkLists.splice(index, 1);
      this.save();
    }
  }

  public save(): void{}
}
