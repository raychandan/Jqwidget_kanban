import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { jqxKanbanComponent } from 'jqwidgets-ng/jqxkanban';
// import { jqxKanbanComponent } from 'jqwidgets-ts/angular_jqxkanban';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
declare var $:any;

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class KanbanComponent implements OnInit,AfterViewInit {
  constructor() { }
  popup:any;
  taskPopup:boolean = false;
  columnPopup:boolean = false;
  popupData:any;
  
  public board: Board = new Board('Test Board', [
    new Column('Ideas', '21', [
     { name:'Some random idea'},
      {name:'This is another random idea'},
    ]),
    new Column('Research', '32', [{name:'Lorem ipsum'}, {name:'foo'}]),
  ]);
  boardConectedTo = ['21','32'];
  searchText:any;
  newTaskName:any;
  taskId:any;
  newColumnName:any;
  titleDisable:boolean = true;
  taskError:boolean = false;
  columnError:boolean = false;

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }


  dropGrid(event: CdkDragDrop<string[]>): void {
    // console.log("DropGrid>>>>>>>",event)
    moveItemInArray(
      this.board.columns,
      event.previousIndex,
      event.currentIndex
    );
  }

  drop(event: CdkDragDrop<object[]>): void {
    // console.log("Drop>>>>>>>",event)
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addColumnPopup(){
    this.columnPopup = true;
    this.newColumnName = '';
    this.columnError = false;
  }
  addColumn(){
    if(this.newColumnName != ''){
      let colId = (Math.floor(Math.random()*(999-100+1)+100)).toString();
      this.board.columns.push(new Column(this.newColumnName, colId, []))
      this.boardConectedTo.push(colId)
      this.columnPopup = false;
      this.columnError = false;
    }else{
      this.columnError = true;
    }
    console.log("Board",this.board);
  }

  addTaskPopup(id:any){
    this.taskPopup = true;
    this.newTaskName = '';
    this.taskId = id;
    this.taskError = false;
  }
  addTask(id:any){
    if(this.newTaskName != ''){
      this.board.columns.forEach((col)=>{if(col.id == id) col.tasks.push({name:this.newTaskName})})
      this.taskPopup = false;
      this.taskError = false;
    }else{
      this.taskError = true;
    }
  }

  openPopup(event:any){
    // console.log("event",event.target.innerHTML)
    this.popup = true;
    this.popupData = event.target.innerHTML;
  }

  makeEditableTitle(id:any){
    let titleId = '#title-'+id;
    $(titleId).prop('disabled', false);
    $(titleId).focus();
  }

  onTitleBulr(id:any){
    let titleId = '#title-'+id;
    $(titleId).prop('disabled', true);
    this.board.columns.forEach((col)=>{if(col.id == id)col.name=$(titleId).val()})
    console.log(this.board.columns)
  }

  deleteColumn(id:any){
    this.board.columns = this.board.columns.filter((item) => item.id !== id)
  }
}

class Column {
  constructor(public name: string, public id: string, public tasks: object[]) {}
}

class Board {
  constructor(public name: string, public columns: Column[]) {}
}
