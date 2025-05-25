import { join } from '@std/path';
import { ensureDir, exists } from '@std/fs';
import type { TodoData, Task } from '../types/index.ts';

export class Storage {
  private static readonly TODO_DIR = '.todo';
  private static readonly TODO_FILE = 'tasks.json';

  private static async getTodoPath(): Promise<string> {
    const homeDir = Deno.env.get('HOME') || Deno.env.get('USERPROFILE') || '.';
    const todoDir = join(homeDir, this.TODO_DIR);
    await ensureDir(todoDir);
    return join(todoDir, this.TODO_FILE);
  }

  static async load(): Promise<TodoData> {
    try {
      const filePath = await this.getTodoPath();
      
      if (!(await exists(filePath))) {
        return this.getDefaultData();
      }

      const content = await Deno.readTextFile(filePath);
      const data = JSON.parse(content) as TodoData;
      
      // データの妥当性チェック
      if (!data.nextId || !Array.isArray(data.tasks)) {
        console.warn('データファイルが破損しています。新しいファイルを作成します。');
        return this.getDefaultData();
      }

      return data;
    } catch (error) {
      console.error('データの読み込みに失敗しました:', (error as Error).message);
      return this.getDefaultData();
    }
  }

  static async save(data: TodoData): Promise<void> {
    try {
      const filePath = await this.getTodoPath();
      const content = JSON.stringify(data, null, 2);
      await Deno.writeTextFile(filePath, content);
    } catch (error) {
      console.error('データの保存に失敗しました:', (error as Error).message);
      throw error;
    }
  }

  static async addTask(content: string): Promise<Task> {
    const data = await this.load();
    const newTask: Task = {
      id: data.nextId,
      content,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    data.tasks.push(newTask);
    data.nextId++;
    
    await this.save(data);
    return newTask;
  }

  static async getTasks(): Promise<Task[]> {
    const data = await this.load();
    return data.tasks;
  }

  static async completeTask(id: number): Promise<boolean> {
    const data = await this.load();
    const task = data.tasks.find(t => t.id === id);
    
    if (!task) {
      return false;
    }
    
    task.completed = true;
    await this.save(data);
    return true;
  }

  static async deleteTask(id: number): Promise<boolean> {
    const data = await this.load();
    const initialLength = data.tasks.length;
    data.tasks = data.tasks.filter(t => t.id !== id);
    
    if (data.tasks.length === initialLength) {
      return false;
    }
    
    await this.save(data);
    return true;
  }

  private static getDefaultData(): TodoData {
    return {
      nextId: 1,
      tasks: [],
    };
  }
} 