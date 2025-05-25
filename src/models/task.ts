import type { Task } from '../types/index.ts';

export class TaskModel {
  static create(id: number, content: string): Task {
    return {
      id,
      content,
      completed: false,
      createdAt: new Date().toISOString(),
    };
  }

  static complete(task: Task): Task {
    return {
      ...task,
      completed: true,
    };
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
} 