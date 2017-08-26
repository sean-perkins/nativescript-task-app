import { Task } from './../../../models/Task';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Color } from 'tns-core-modules/color';
import { Store } from '@ngrx/store';
import { IAppState, getTasks, getCompletedTasks, getPendingTasks, TaskState } from '../../../store/app.state';
import { Page } from 'tns-core-modules/ui/page';
import { View, layout } from 'tns-core-modules/ui/core/view';
import { ListViewEventData, RadListView, SwipeActionsEventData } from 'nativescript-telerik-ui/listview';
import { Actions } from '@ngrx/effects';

import { NSDate } from '../../../utils/Date';

import { default as taskActions } from '../../../store/actions/task.actions';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

export type SupportedFilters = 'all' | 'completed' | 'pending';

@Component({
    moduleId: module.id,
    selector: 'ns-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
    // The collection to hold all tasks
    tasks$: Observable<Task[]>;
    // The collection to hold pending tasks
    completedTasks$: Observable<Task[]>;
    // The collection to hold pending (incomplete) tasks
    pendingTasks$: Observable<Task[]>;

    private leftThresholdPassed = false;
    private rightThresholdPassed = false;

    private activeFilter: SupportedFilters = 'all';

    constructor(
        private page: Page,
        private vcRef: ViewContainerRef,
        private modalService: ModalDialogService,
        private actions$: Actions,
        private store$: Store<IAppState>) { }

    ngOnInit(): void {
        this.page.backgroundSpanUnderStatusBar = true;
        this.page.backgroundColor = new Color(NSDate.isDayTime() ? '#ff9d6e' : '#0061ef');

        this.tasks$ = this.store$.let(getTasks);
        this.completedTasks$ = this.store$.let(getCompletedTasks);
        this.pendingTasks$ = this.store$.let(getPendingTasks);

        this.store$.dispatch(new taskActions.FetchAction);

        this.onTaskDeleteSuccess();
        this.onTaskCompleteSuccess();
    }

    /**
     * Gets the collection to be displayed based on the active filter
     */
    get displayedTasks$(): Observable<any> {
        return this.activeFilter === 'all' ?
            this.tasks$ : (this.activeFilter === 'completed' ? this.completedTasks$ : this.pendingTasks$);
    }

    /**
     * Sets the active filter for displaying segmented results
     * @param newFilter The new filter mode
     */
    setFilter(newFilter: SupportedFilters = 'all') {
        this.activeFilter = newFilter;
    }

    /**
     * Displays the modal for creating or updating a task
     * @param existingTask The task to update (optional)
     */
    displayForm(existingTask?: Task): void {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: existingTask,
            fullscreen: false, // defaults true on Phone
        };
        this.modalService.showModal(TaskFormComponent, options)
            .then(formData => {
                if (formData) {
                    const task = new Task((<any>Object).assign({}, existingTask, formData));
                    // If the task has an id, update the task
                    if (task.id !== null) {
                        console.log('the task', task);
                        task.update();
                        this.store$.dispatch(new taskActions.UpdateAction(task));
                        this.onTaskUpdateSuccess();
                    }
                    else {
                        // otherwise initialize a new task
                        task.initalize();
                        this.store$.dispatch(new taskActions.CreateAction(task));
                        this.onTaskCreateSuccess();
                    }
                }
            });
    }

    onLeftSwipeClick(args: ListViewEventData) {
        const listView: RadListView = args.object;
        listView.notifySwipeToExecuteFinished();
    }

    onRightSwipeClick(args: ListViewEventData) {
        const listView = args.object
        listView.notifySwipeToExecuteFinished();
    }

    onSwipeCellStarted(args: SwipeActionsEventData) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args.swipeView;
        var leftItem = swipeView.getViewById('mark-view');
        var rightItem = swipeView.getViewById('delete-view');
        swipeLimits.left = swipeLimits.right = args.data.x > 0 ? swipeView.getMeasuredWidth() / 2 : swipeView.getMeasuredWidth() / 2;
        swipeLimits.threshold = swipeView.getMeasuredWidth();
    }

    onCellSwiping(args: SwipeActionsEventData) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args.swipeView;
        var mainView = args.mainView;
        var leftItem: View = swipeView.getViewById('mark-view');
        var rightItem: View = swipeView.getViewById('delete-view');

        if (args.data.x > swipeView.getMeasuredWidth() / 4 && !this.leftThresholdPassed) {
            var markLabel = leftItem.getViewById('mark-text');
            this.leftThresholdPassed = true;
        } else if (args.data.x < -swipeView.getMeasuredWidth() / 4 && !this.rightThresholdPassed) {
            var deleteLabel = rightItem.getViewById('delete-text');
            this.rightThresholdPassed = true;
        }
        if (args.data.x > 0) {
            var leftDimensions = View.measureChild(
                <View>leftItem.parent,
                leftItem,
                layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
                layout.makeMeasureSpec(mainView.getMeasuredHeight(), layout.EXACTLY));
            View.layoutChild(<View>leftItem.parent, leftItem, 0, 0, leftDimensions.measuredWidth, leftDimensions.measuredHeight);
        } else {
            var rightDimensions = View.measureChild(
                <View>rightItem.parent,
                rightItem,
                layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
                layout.makeMeasureSpec(mainView.getMeasuredHeight(), layout.EXACTLY));

            View.layoutChild(<View>rightItem.parent, rightItem, mainView.getMeasuredWidth() - rightDimensions.measuredWidth, 0, mainView.getMeasuredWidth(), rightDimensions.measuredHeight);
        }
    }

    onSwipeCellFinished(args: SwipeActionsEventData) {
        const task: Task = new Task(args.swipeView.bindingContext);
        if (this.leftThresholdPassed) {
            if (!task.completed) {
                this.store$.dispatch(new taskActions.CompleteAction(task));
            }
        } else if (this.rightThresholdPassed) {
            this.store$.dispatch(new taskActions.DeleteAction(task.id));
        }
        this.leftThresholdPassed = false;
        this.rightThresholdPassed = false;
    }

    /**
     * Dispatches an action to clear all existing tasks
     * Reloads tasks on completion
     */
    clearTask(): void {
        this.store$.dispatch(new taskActions.ClearAction);
        this.reloadTasks();
    }

    get placeholderImage(): string {
        return `res://app/images/tasks-complete-${NSDate.isDayTime() ? 'day' : 'night'}.png`;
    }

    private onTaskUpdateSuccess(): void {
        this.actions$
            .ofType(TaskState.ActionTypes.UPDATE_SUCCESS)
            .take(1)
            .do(() => {
                this.reloadTasks();
            })
            .subscribe();
    }

    private onTaskCompleteSuccess(): void {
        this.actions$
            .ofType(TaskState.ActionTypes.COMPLETE_SUCCESS)
            .do(() => {
                this.reloadTasks();
            })
            .subscribe();
    }

    private onTaskCreateSuccess(): void {
        this.actions$
            .ofType(TaskState.ActionTypes.CREATE_SUCCESS)
            .take(1)
            .do(() => {
                this.reloadTasks();
            })
            .subscribe();
    }

    private onTaskDeleteSuccess(): void {
        this.actions$
            .ofType(TaskState.ActionTypes.DELETE_SUCCESS)
            .do(() => {
                console.log('delete success');
                this.reloadTasks();
            })
            .subscribe();
    }

    private reloadTasks(): void {
        this.store$.dispatch(new taskActions.FetchAction);
    }
}
