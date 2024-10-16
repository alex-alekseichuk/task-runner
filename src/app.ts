import {TaskRunner} from "./task-runner";
import {TimeoutTaskFactory} from "./timeout-task";

const taskRunner = new TaskRunner(new TimeoutTaskFactory())
taskRunner.start(10)
setTimeout(() => taskRunner.stop(), 10_000)
