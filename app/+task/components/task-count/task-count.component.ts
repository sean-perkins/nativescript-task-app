import { Component, Input, Output, EventEmitter } from '@angular/core';
/**
 * Task Count Component
 * Displays a styled number with a label below it
 */
@Component({
    moduleId: module.id,
    selector: 'ns-task-count',
    templateUrl: './task-count.component.html',
    styleUrls: ['./task-count.component.css']
})
export class TaskCountComponent {
    // The number of items
    @Input() count: number;
    // The description of the type of number being displayed (i.e. All)
    @Input() label: string;

    @Output() onPress: EventEmitter<boolean> = new EventEmitter();
    // Bind to the NS input to control display of this element on the parent view
    @Input() col = 0;

    press(): void {
        this.onPress.emit(true);
    }

}
