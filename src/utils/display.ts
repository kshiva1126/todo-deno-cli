import { Table } from '@cliffy/table';
import { green, red, yellow, blue } from '@std/fmt/colors';
import type { Task } from '../types/index.ts';
import { TaskModel } from '../models/task.ts';

export class Display {
  static showTasks(tasks: Task[]): void {
    if (tasks.length === 0) {
      console.log(yellow('📝 タスクがありません。'));
      console.log('新しいタスクを追加するには: todo add "タスク内容"');
      return;
    }

    const table = new Table()
      .header(['ID', 'Status', 'Task', 'Created'])
      .border(true);

    for (const task of tasks) {
      const status = task.completed ? green('[✓]') : red('[ ]');
      const content = task.completed ? 
        `${task.content}` : 
        task.content;
      const date = TaskModel.formatDate(task.createdAt);
      
      table.push([
        task.id.toString(),
        status,
        content,
        date
      ]);
    }

    console.log(table.toString());
    
    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    console.log(`\n📊 完了: ${green(completedCount.toString())} / 全体: ${blue(totalCount.toString())}`);
  }

  static showSuccess(message: string): void {
    console.log(green(`✅ ${message}`));
  }

  static showError(message: string): void {
    console.log(red(`❌ ${message}`));
  }

  static showInfo(message: string): void {
    console.log(blue(`ℹ️  ${message}`));
  }

  static showHelp(): void {
    console.log(blue('📝 TODO CLI - シンプルなタスク管理ツール\n'));
    
    const helpTable = new Table()
      .header(['コマンド', '説明', '例'])
      .border(true);

    helpTable.push(['add <content>', 'タスクを追加', 'todo add "買い物に行く"']);
    helpTable.push(['list', 'タスク一覧を表示', 'todo list']);
    helpTable.push(['complete <id>', 'タスクを完了にする', 'todo complete 1']);
    helpTable.push(['delete <id>', 'タスクを削除', 'todo delete 1']);
    helpTable.push(['help', 'ヘルプを表示', 'todo help']);

    console.log(helpTable.toString());
    console.log('\n💡 タスクは ~/.todo/tasks.json に保存されます');
  }
} 