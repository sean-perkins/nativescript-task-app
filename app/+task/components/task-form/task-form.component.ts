import { Component } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Color } from 'tns-core-modules/color';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../../models/Task';
import { NSDate } from '../../../utils/Date';
/**
 * Task Form Component
 * Modal page that allows a user to create a new task or update an existing one
 */
@Component({
    moduleId: module.id,
    selector: 'ns-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

    /**
     * The collection of form inputs and validation states
     */
    form: FormGroup;
    /**
     * The submitted state of the form (default: false)
     */
    submitted = false;
    /**
     * Referece to the passed in task (if updating)
     */
    task: Task;
    /**
     * Determines if the form is creating or updating a record
     */
    isCreate = true;

    constructor(
        private params: ModalDialogParams,
        private page: Page,
        private fb: FormBuilder) {
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.backgroundColor = new Color(this.isDayTime ? '#ff9d6e' : '#0061ef');

        this.initFormGroup(params.context);

        this.page.on('unloaded', () => {
            this.params.closeCallback();
        });
    }

    /**
     * Initializes the form group and sets existing field values
     * @param task The existing task (if updating)
     */
    private initFormGroup(task?: any) {
        this.task = task.id ? new Task(task) : null;
        this.isCreate = !task.id;
        this.form = this.fb.group({
            id: [task.id],
            name: [task.name, Validators.required],
            description: [task.description],
            complete: [this.task && this.task.completed]
        });
    }

    /**
     * Helper function to get access to the isDayTime in the view
     */
    get isDayTime(): boolean {
        return NSDate.isDayTime();
    }

    /**
     * The cancel action of the dialog - dismisses the modal
     */
    cancel(): void {
        this.params.closeCallback();
    }

    /**
     * The save action of the dialog
     * Checks if the form is valid before dismissing
     */
    save(value = this.form.value): void {
        this.submitted = true;
        if (this.form.valid) {
            if (value.complete) {
                if (!this.task.completedAt) {
                    value.completedAt = Date.now();
                }
            }
            else {
                value.completedAt = null;
            }
            this.params.closeCallback(value);
        }
    }

}
