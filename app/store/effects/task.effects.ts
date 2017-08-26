
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TaskState } from '../states/task.state';
import { TaskService } from '../services/task.service';

import { default as taskActions } from '../actions/task.actions';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class TaskEffects {

    @Effect() create$: Observable<Action> = this.actions$
        .ofType(TaskState.ActionTypes.CREATE)
        .switchMap(({ payload }) =>
            this.taskService.create(payload)
                .map(() => new taskActions.CreateSuccessAction)
                .catch(error => of(new taskActions.CreateFailedAction(error)))
        );

    @Effect() update$: Observable<Action> = this.actions$
        .ofType(TaskState.ActionTypes.UPDATE)
        .switchMap(({ payload }) =>
            this.taskService.update(payload)
                .map(() => new taskActions.UpdateSuccessAction)
                .catch(error => of(new taskActions.UpdateFailedAction(error)))
        );

    @Effect() complete$: Observable<Action> = this.actions$
        .ofType(TaskState.ActionTypes.COMPLETE)
        .switchMap(({ payload }) =>
            this.taskService.complete(payload)
                .map(() => new taskActions.CompleteSuccessAction)
                .catch(error => of(new taskActions.CompleteFailedAction(error)))
        );

    @Effect() delete$: Observable<Action> = this.actions$
        .ofType(TaskState.ActionTypes.DELETE)
        .switchMap(({ payload }) =>
            this.taskService.remove(payload)
                .map(() => new taskActions.DeleteSuccessAction)
                .catch(error => of(new taskActions.DeleteFailedAction(error)))
        );

    @Effect() fetch$: Observable<Action> = this.actions$
        .ofType(TaskState.ActionTypes.FETCH)
        .switchMap(({ payload }) =>
            this.taskService.fetch
                .map(res => new taskActions.FetchSuccessAction(res))
                .catch(error => of(new taskActions.FetchFailedAction(error)))
        );

    @Effect() clear$: Observable<Action> = this.actions$
        .ofType(TaskState.ActionTypes.CLEAR)
        .switchMap(() => {
            this.taskService.clear();
            return empty();
        });

    constructor(
        private actions$: Actions,
        private taskService: TaskService
    ) { }
}
