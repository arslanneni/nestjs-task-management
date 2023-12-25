import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  //For Creating New Task
  createTask(createTask: createTaskDto): Task {
    let { title, description } = createTask;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
  //Find Task By ID
  getTaskByID(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  deleteTaskByID(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  updateTaskStatusByID(id: string, status: TaskStatus) {
    let task = this.getTaskByID(id);
    task.status = status;
    return task;
  }
}
