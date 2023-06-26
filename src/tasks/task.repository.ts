import { PrismaService } from '../prisma/prisma.service';
import { Task, User } from '@prisma/client';
import { TaskStatus } from './task.status';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository {
  constructor(private prisma: PrismaService) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const query = { where: {} };

    const { status, search } = filterDto;

    if (status) {
      query.where['status'] = status;
    }

    if (search) {
      query.where['OR'] = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    return this.prisma.task.findMany(query);
  }

  saveTask = (createTaskDto: CreateTaskDto, user: User): Promise<Task> => {
    const { title, description } = createTaskDto;

    return this.prisma.task.create({
      data: {
        title,
        description,
        status: TaskStatus.OPEN,
        authorId: user.id,
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
