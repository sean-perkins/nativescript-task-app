import { Task } from './../../models/Task';
import { IAppState } from './../app.state';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';

export class TaskState {

    static NAMESPACE = 'TaskState';

    static ActionTypes = {
        CLEAR: `${TaskState.NAMESPACE} Clear`,
        CREATE: `${TaskState.NAMESPACE} Create Task`,
        CREATE_SUCCESS: `${TaskState.NAMESPACE} Create Task Success`,
        CREATE_FAILED: `${TaskState.NAMESPACE} Create Task Failed`,
        UPDATE: `${TaskState.NAMESPACE} Update Task`,
        UPDATE_SUCCESS: `${TaskState.NAMESPACE} Update Task Success`,
        UPDATE_FAILED: `${TaskState.NAMESPACE} Update Task Failed`,
        DELETE: `${TaskState.NAMESPACE} Delete Task`,
        DELETE_SUCCESS: `${TaskState.NAMESPACE} Delete Task Success`,
        DELETE_FAILED: `${TaskState.NAMESPACE} Delete Task Failed`,
        FETCH: `${TaskState.NAMESPACE} Fetch`,
        FETCH_SUCCESS: `${TaskState.NAMESPACE} Fetch Success`,
        FETCH_FAILED: `${TaskState.NAMESPACE} Fetch Failed`,
        COMPLETE: `${TaskState.NAMESPACE} Complete`,
        COMPLETE_SUCCESS: `${TaskState.NAMESPACE} Complete Success`,
        COMPleTE_FAILED: `${TaskState.NAMESPACE} Complete Failed`
    };
    /**
     * The collection of tasks loaded
     */
    tasks: Task[];
    /**
     * The detail view of a task
     */
    task: Task;
    /**
     * The loading state of the tasks
     */
    loading: boolean;

    static state$(state$: Observable<IAppState>): Observable<TaskState> {
        return state$.select(state => state.tasks);
    }

    static getTasks(state$: Observable<TaskState>) {
        return state$.select(state => state.tasks);
    }

    static getCompletedTasks(state$: Observable<TaskState>) {
        return state$.select(state => state.tasks.filter(res => res.completed));
    }

    static getPendingTasks(state$: Observable<TaskState>) {
        return state$.select(state => state.tasks.filter(res => !res.completed));
    }

    static getTaskDetail(state$: Observable<TaskState>) {
        return state$.select(state => state.task);
    }

    static isTasksLoading(state$: Observable<TaskState>) {
        return state$.select(state => state.loading);
    }

    constructor(options: TaskState = <TaskState>{}) {
        this.tasks = Array.isArray(options.tasks) ?
            options.tasks : [];
        this.task = options.task || null;
    }

}

export const getTasks: any = compose(TaskState.getTasks, TaskState.state$);
export const getCompletedTasks: any = compose(TaskState.getCompletedTasks, TaskState.state$);
export const getPendingTasks: any = compose(TaskState.getPendingTasks, TaskState.state$);
export const getTaskDetail: any = compose(TaskState.getTaskDetail, TaskState.state$);
