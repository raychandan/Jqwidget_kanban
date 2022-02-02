
import { Component } from '@angular/core';
import { CardSettingsModel } from '@syncfusion/ej2-angular-kanban';
import { kanbanData } from './datasource';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>&nbsp;<button class="btn btn-primary"><a [routerLink]="['/kanban']">
  Kanban
</a></button>`,
 styleUrls: ['./app.component.css'],
})

export class AppComponent {
    public data: Object[] = kanbanData;
    public cardSettings: CardSettingsModel = {
        contentField: 'Summary',
        headerField: 'Id'
    };
}

// <ejs-kanban keyField='Status' [dataSource]='data' [cardSettings]='cardSettings'>
//                 <e-columns>
//                   <e-column headerText='To do' keyField='Open'></e-column>
//                   <e-column headerText='In Progress' keyField='InProgress'></e-column>
//                   <e-column headerText='Testing' keyField='Testing'></e-column>
//                   <e-column headerText='Done' keyField='Close'></e-column>
//                 </e-columns>
//             </ejs-kanban>