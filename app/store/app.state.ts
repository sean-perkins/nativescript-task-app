import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import * as appReducers from './reducers/index';
import * as appStates from './states/index';

export interface IAppState {
    tasks: appStates.TaskState;
};

const reducers = {
    tasks: appReducers.taskReducer
};

export function AppReducer(state: any, action: any) {
    return combineReducers(reducers)(state, action);
}

export * from './states/index';
