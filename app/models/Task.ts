
import { Guid } from '../utils/Guid';

export class Task {
    /**
     * The unique id of the event
     */
    id: string;
    /**
     * The event name
     */
    name: string;
    /**
     * The description of the event
     */
    description: string;
    /**
     * The start time of the event
     */
    startTime: any;
    /**
     * The end time of the event
     */
    endTime: any;
    /**
     * The created timestamp of the event
     */
    createdAt: number;
    /**
     * The updated timestamp of the event
     */
    updatedAt: number;
    /**
     * The timestamp the event was completed
     */
    completedAt: number;

    constructor(options: Task = <Task>{}) {
        this.id = options.id || null;
        this.name = options.name || null;
        this.description = options.description || null;
        this.startTime = options.startTime || null;
        this.endTime = options.endTime || null;
        this.createdAt = options.createdAt || null;
        this.updatedAt = options.updatedAt || null;
        this.completedAt = options.completedAt || null;
    }

    initalize(): void {
        this.id = Guid.next();
        this.createdAt = Date.now();
        this.update();
    }

    update(): void {
        this.updatedAt = Date.now();
    }

    complete(): void {
        this.completedAt = Date.now();
    }

    get completed(): boolean {
        return this.completedAt !== null;
    }

    toString = (): string => {
        return JSON.stringify(this);
    }


}
