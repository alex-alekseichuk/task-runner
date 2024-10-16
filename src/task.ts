export type Task = () => Promise<void>

export interface TaskFactory {
    createTask(): Task;
}
