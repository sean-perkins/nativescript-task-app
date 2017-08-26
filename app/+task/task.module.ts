import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskCountComponent } from './components/task-count/task-count.component';
import { TaskBannerComponent } from './components/task-banner/task-banner.component';
import { TaskRoutingModule } from './task.routing';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeScriptUIListViewModule } from 'nativescript-telerik-ui/listview/angular';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TaskRoutingModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        TaskListComponent,
        TaskFormComponent,
        TaskCountComponent,
        TaskBannerComponent
    ],
    exports: [],
    entryComponents: [
        TaskFormComponent
    ],
    providers: [
        ModalDialogService
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TaskModule { }
