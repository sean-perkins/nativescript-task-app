import { TaskState } from './../states/task.state';
import { Action } from '@ngrx/store';

export function taskReducer(
    state: TaskState = new TaskState,
    action: Action) {
    switch (action.type) {
        case TaskState.ActionTypes.CLEAR:
            return Object.assign({}, state, {
                tasks: []
            });
        case TaskState.ActionTypes.FETCH:
            return Object.assign({}, state, {
                loading: true
            });
        case TaskState.ActionTypes.FETCH_SUCCESS:
            return Object.assign({}, state, {
                tasks: action.payload,
                loading: false
            });
        case TaskState.ActionTypes.FETCH_FAILED:
            return Object.assign({}, state, {
                task: [],
                loading: false
            });
        default:
            return state;
    }
}
