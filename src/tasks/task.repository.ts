import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { TaskStatus } from './task.status';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTasksWithFilters(filterDto) {
    const { status, search } = filterDto;

    let tasks = await this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  saveTask = (createTaskDto: CreateTaskDto): Promise<Task> => {
    const { title, description } = createTaskDto;

    return this.prisma.task.create({
      data: {
        title,
        description,
        status: TaskStatus.OPEN,
      },
    });
  };

  async findTaskById(id: string): Promise<Task> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async deleteTask(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }

  async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
    const { status } = updateTaskStatusDto;
    this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }
}
