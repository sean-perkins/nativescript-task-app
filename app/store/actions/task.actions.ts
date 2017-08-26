import { Task } from './../../models/Task';
import { TaskState } from './../states/task.state';
import { Action } from '@ngrx/store';

export default class TaskActions {

    // Clear Actions

    static ClearAction = class implements Action {
        readonly type = TaskState.ActionTypes.CLEAR;
        payload = null;
    }

    // Create Actions

    static CreateAction = class implements Action {
        readonly type = TaskState.ActionTypes.CREATE;
        constructor(public payload: Task) { }
    }

    static CreateSuccessAction = class implements Action {
        readonly type = TaskState.ActionTypes.CREATE_SUCCESS;
        payload = null;
    }

    static CreateFailedAction = class implements Action {
        readonly type = TaskState.ActionTypes.CREATE_FAILED;
        constructor(public payload?: any) { }
    }

    // Update Actions

    static UpdateAction = class implements Action {
        readonly type = TaskState.ActionTypes.UPDATE;
        constructor(public payload: Task) { }
    }

    static UpdateSuccessAction = class implements Action {
        readonly type = TaskState.ActionTypes.UPDATE_SUCCESS;
        payload = null;
    }

    static UpdateFailedAction = class implements Action {
        readonly type = TaskState.ActionTypes.UPDATE_FAILED;
        constructor(public payload?: any) { }
    }

    // Delete Actions

    static DeleteAction = class implements Action {
        readonly type = TaskState.ActionTypes.DELETE;
        constructor(public payload: string) { }
    }

    static DeleteSuccessAction = class implements Action {
        readonly type = TaskState.ActionTypes.DELETE_SUCCESS;
        payload = null;
    }

    static DeleteFailedAction = class implements Action {
        readonly type = TaskState.ActionTypes.DELETE_FAILED;
        constructor(public payload?: any) { }
    }

    // Fetch Actions

    static FetchAction = class implements Action {
        readonly type = TaskState.ActionTypes.FETCH;
        payload = null;
    }

    static FetchSuccessAction = class implements Action {
        readonly type = TaskState.ActionTypes.FETCH_SUCCESS;
        constructor(public payload: any[]) { }
    }

    static FetchFailedAction = class implements Action {
        readonly type = TaskState.ActionTypes.FETCH_FAILED;
        constructor(public payload?: any) { }
    }

    // Complete Actions

    static CompleteAction = class implements Action {
        readonly type = TaskState.ActionTypes.COMPLETE;
        constructor(public payload: Task) { }
    }

    static CompleteSuccessAction = class implements Action {
        readonly type = TaskState.ActionTypes.COMPLETE_SUCCESS;
        payload = null;
    }

    static CompleteFailedAction = class implements Action {
        readonly type = TaskState.ActionTypes.COMPleTE_FAILED;
        constructor(public payload?: any) { }
    }

}
