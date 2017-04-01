import {Component} from "@angular/core";
import {NavController, NavParams, AlertController} from "ionic-angular";

/*
  Generated class for the CheckList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-check-list',
  templateUrl: 'check-list.html'
})
export class CheckListPage {

  checkList: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertController: AlertController) {
  }

  ionViewWillEnter(){
    this.checkList = this.navParams.get('checkList');
  }

  addItem(): void {
    this.alertController.create({
      title: 'Add item',
      message: 'Enter the name of the task',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'cancel'
        },
        {
          text: 'save',
          handler: data => {
            this.checkList.addItem(data.name);
          }
        }
      ]
    }).present();
  }

  toggleItem(item): void {
    this.checkList.toggleItem(item);
  }

  removeItem(item): void {
    this.checkList.removeItem(item);
  }

  renameItem(item): void {
    this.alertController.create({
      title: 'Rename item',
      message: 'Enter the newname of the task',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'cancel'
        },
        {
          text: 'save',
          handler: data => {
            this.checkList.renameItem(item, data.name);
          }
        }
      ]
    }).present();
  }

  uncheckItems(): void {
    this.checkList.items.forEach((item) => {
      if(item.checked){
        this.checkList.toggleItem(item);
      }
    });
  }
}
