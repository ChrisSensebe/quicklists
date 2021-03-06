/**
 * Created by nizural on 04/03/17.
 */
import {Observable} from 'rxjs/Observable';

export class CheckListModel{

  checkList: any;
  checkListObserver: any;

  constructor(public title: string, public items: any[] = []){
    this.items = items;
    this.checkList = Observable.create(observer => this.checkListObserver = observer);
  }

  /**
   * Add an item to the checklist
   * @param item
   */
  public addItem(item: any): void{
    this.items.push({
      title: item,
      checked: false
    });
    this.checkListObserver.next(true);
  }

  /**
   * Remove item from the checklist
   * @param item
   */
  public removeItem(item: any): void{
    let index = this.items.indexOf(item);
    if(index > -1){
      this.items.splice(index, 1);
    }
    this.checkListObserver.next(true);
  }

  /**
   * Rename an item in the checklist
   * @param item item to rename
   * @param title new title
   */
  public renameItem(item: any, title:string): void{
    let index = this.items.indexOf(item);
    if(index > -1){
      this.items[index].title = title;
    }
    this.checkListObserver.next(true);
  }

  /**
   * Set the title for the checklist
   * @param title
   */
  public setTitle(title): void{
    this.title = title;
    this.checkListObserver.next(true);
  }

  /**
   * Toggle the checked property of an item
   * @param item
   */
  public toggleItem(item): void{
    item.checked = !item.checked;
    this.checkListObserver.next(true);
  }
}
