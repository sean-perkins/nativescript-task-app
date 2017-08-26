
export class NSDate {

    static isDayTime(today = new Date()): boolean {
        const hours = today.getHours();
        return hours > 8 && hours < 17;
    }
}
