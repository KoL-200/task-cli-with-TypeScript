interface Task {
    id: number;
    title: string;
    completed: boolean;
}

let tasks: Task[] = []

type TaskInput = Omit<Task, 'id' | 'completed'>

function addTask(newTask: TaskInput) {
    const newTaskData: Task = {
        id: tasks.length + 1,
        title: newTask.title,
        completed: false
    }

    tasks.push(newTaskData)
    return newTaskData
}