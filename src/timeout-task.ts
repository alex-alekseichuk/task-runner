import {Task, TaskFactory} from "./task";

export class TimeoutTaskFactory implements TaskFactory {
    protected counter = 0

    public createTask(): Task {
        const index = this.counter++
        return () => new Promise(resolve => {
            console.log(`task ${index} started`)
            setTimeout(() => {
                console.log(`task ${index} finished`)
                resolve()
            }, Math.random() * 300)
        })
    }
}
