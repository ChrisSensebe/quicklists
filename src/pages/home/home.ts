import {Component} from "@angular/core";
import {NavController, AlertController, Platform} from "ionic-angular";
import {CheckListPage} from "../check-list/check-list";
import {Data} from "../../providers/data";
import {CheckListModel} from "../../models/checklist-models";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  checkLists: CheckListModel[];

  constructor(public navCtrl: NavController,
              public dataService: Data,
              public alertController: AlertController,
              public platform: Platform) {

    this.checkLists = [];
  }

  public ionViewDidLoad(): void{
    this.platform.ready()
      .then(() => {
        this.dataService.getData()
          .then((checkLists) => {
            if(checkLists){
              let savedCheckLists = JSON.parse(checkLists);
              savedCheckLists.forEach((savedCheckList) => {
                let loadCheckList = new CheckListModel(savedCheckList.title, savedCheckList.items);
                console.log(loadCheckList);
                this.checkLists.push(loadCheckList);
                loadCheckList.checkList.subscribe(update => {
                  this.save();
                })
              });
            }
          });
      })
  }

  public addCheckList(): void{
    this.alertController.create({
      title: 'New CheckList',
      message: 'Enter the name of your new checkList below:',
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
      title: 'Rename checkList',
      message: 'Enter the new name of this checkList below:',
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

  public viewCheckList(checkList: CheckListModel): void{
    this.navCtrl.push(CheckListPage, {checkList: checkList});
  }

  public removeCheckList(checkList: CheckListModel): void{
    let index = this.checkLists.indexOf(checkList);
    if(index > -1){
      this.checkLists.splice(index, 1);
      this.save();
    }
  }

  public save(): void{
    this.dataService.saveData(this.checkLists);
  }
}
