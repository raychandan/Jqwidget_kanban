import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import the KanbanModule for the Kanban component
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KanbanModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
