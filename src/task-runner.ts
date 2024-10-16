import {TaskFactory} from "./task";
import assert from "node:assert";

export class TaskRunner {
    protected perSecond: number = 1
    protected timestamp: number = 0
    protected interval?: NodeJS.Timeout

    constructor(protected taskFactory: TaskFactory, protected accuracyPeriod: number = 100) {
    }

    public start(perSecond: number = 1): void {
        assert(1 <= perSecond && perSecond <= 3000)
        this.perSecond = perSecond
        if (!this.interval) {
            this.timestamp = new Date().getTime()
            this.interval = setInterval(() => this.onPeriod(), this.accuracyPeriod)
        }
    }

    public stop(): void {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = undefined
        }
    }

    protected onPeriod() {
        const now = new Date().getTime()
        const delta = now - this.timestamp
        this.timestamp = now
        const nTasks = Math.floor(this.perSecond * delta / 1000)
        this.timestamp -= delta - Math.floor(nTasks * 1000 / this.perSecond)

        for (let i = 0; i < nTasks; i++) {
            const task = this.taskFactory.createTask()
            task()
                .then(() => null)
                .catch(() => null)
        }
    }
}