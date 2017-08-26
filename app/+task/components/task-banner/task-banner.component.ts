import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NSDate } from '../../../utils/Date';
import * as dialogs from 'tns-core-modules/ui/dialogs';
/**
 * Styled Banner Header
 * Displays personalized background graphic with todays date and
 * an action to clear existing tasks from the app.
 */
@Component({
    moduleId: module.id,
    selector: 'ns-task-banner',
    templateUrl: './task-banner.component.html',
    styleUrls: ['./task-banner.component.css']
})
export class TaskBannerComponent {

    /**
     * Output event when a Label is tapped
     */
    @Output() onClear: EventEmitter<boolean> = new EventEmitter();
    /**
     * Todays' date object
     */
    today = new Date();

    /**
     * Returns a different heading label based on if it is daytime or nighttime
     */
    get todayLabel(): string {
        return NSDate.isDayTime(this.today) ? 'Today' : 'Tonight';
    }

    clearTask(): void {
        // Prompts the user to confirm before clearing all tasks
        dialogs.confirm('Are you sure you want to clear all tasks?')
            .then(confirmed => {
                if (confirmed) {
                    this.onClear.next(true);
                }
            });
    }

}
