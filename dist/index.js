"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const FILE_PATH = './tasks.json';
let tasks = [];
function addTask(newTask) {
    const newTaskData = {
        id: tasks.length + 1,
        title: newTask.title,
        completed: false
    };
    tasks.push(newTaskData);
    return newTaskData;
}
function listTask() {
    for (const task of tasks) {
        console.log(`[${task.completed ? 'x' : ' '}] ${task.id}: ${task.title}`);
    }
    return tasks;
}
function markCompleted(id) {
    const found = tasks.find(task => task.id === id);
    if (found) {
        found.completed = true;
    }
    else {
        console.log("id not found");
    }
    return found;
}
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    return tasks;
}
function saveTasks() {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}
function loadTasks() {
    if (!fs.existsSync(FILE_PATH)) {
        return [];
    }
    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    tasks = parsed;
    return tasks;
}
function main() {
    loadTasks();
    const command = process.argv[2];
    switch (command) {
        case 'add': {
            const title = process.argv[3];
            if (title === undefined) {
                console.log('A task title is required');
                break;
            }
            addTask({ title });
            saveTasks();
            break;
        }
        case 'list': {
            listTask();
            break;
        }
        case 'complete': {
            const id = process.argv[3];
            if (id === undefined) {
                console.log('An id is required');
                break;
            }
            markCompleted(Number(id));
            saveTasks();
            break;
        }
        case 'delete': {
            const id = process.argv[3];
            if (id === undefined) {
                console.log('An id is required');
                break;
            }
            deleteTask(Number(id));
            saveTasks();
            break;
        }
        default:
            console.log('Unknown command. Use: add | list | complete | delete');
    }
}
main();
//# sourceMappingURL=index.js.map