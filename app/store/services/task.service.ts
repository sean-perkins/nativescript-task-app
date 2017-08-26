import { Task } from './../../models/Task';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { of } from 'rxjs/observable/of';

import * as appSettings from 'tns-core-modules/application-settings';

@Injectable()
export class TaskService {

    private static NAMESPACE = 'TASKS';

    get fetch(): Observable<Task[]> {
        return of(
            this.tasks
        );
    }

    create(task: Task): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            if (this.hasTask(task.id)) {
                observer.error(`Error: Task already exists with id: ${task.id}.`);
            }
            else {
                this.upsert(task);
                observer.next(true);
                observer.complete();
            }
            return observer;
        });
    }

    update(task: Task): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            if (this.hasTask(task.id)) {
                this.upsert(task);
                observer.next(true);
                observer.complete();
            }
            else {
                observer.error(`Error: Could not find task with id: ${task.id}.`);
            }
            return observer;
        });
    }

    remove(taskId: string): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            if (this.hasTask(taskId)) {
                this.delete(taskId);
                observer.next(true);
                observer.complete();
            }
            else {
                observer.error(`Error: Could not find task with id: ${taskId}`);
            }
        });
    }

    complete(task: Task): Observable<any> {
        task.complete();
        return this.update(task);
    }

    clear() {
        appSettings.remove(TaskService.NAMESPACE);
    }

    private indexOfTask(taskId: string): number {
        return this.tasks.findIndex(res => res.id === taskId)
    }

    private hasTask(id: string): boolean {
        return this.tasks
            .filter(res => res.id === id).length > 0;
    }

    private upsert(task: Task) {
        let tasks = this.tasks;
        if (this.hasTask(task.id)) {
            tasks[this.indexOfTask(task.id)] = task;
        }
        else {
            tasks.push(task);
        }
        appSettings.setString(TaskService.NAMESPACE, JSON.stringify(tasks));
    }

    private delete(taskId: string) {
        let tasks: any[] = this.tasks;
        tasks = tasks.filter(res => res.id !== taskId);
        appSettings.setString(TaskService.NAMESPACE, JSON.stringify(tasks));
    }

    private get tasks(): any[] {
        const items: any = appSettings.getString(TaskService.NAMESPACE);
        if (items) {
            let tasks = JSON.parse(items);
            return tasks
                .map(res => new Task(res));
        }
        return [];
    }

}
