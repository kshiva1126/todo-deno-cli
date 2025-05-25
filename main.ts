#!/usr/bin/env -S deno run --allow-read --allow-write

import { Command } from '@cliffy/command';
import { addCommand } from './src/commands/add.ts';
import { listCommand } from './src/commands/list.ts';
import { completeCommand } from './src/commands/complete.ts';
import { deleteCommand } from './src/commands/delete.ts';
import { Display } from './src/utils/display.ts';

const cli = new Command()
  .name('todo')
  .version('1.0.0')
  .description('📝 シンプルなCLI TODOリストアプリ')
  .action(() => {
    Display.showHelp();
  });

cli
  .command('add <content:string>')
  .description('新しいタスクを追加')
  .action(async (_, content: string) => {
    await addCommand(content);
  });

cli
  .command('list')
  .description('タスク一覧を表示')
  .action(async () => {
    await listCommand();
  });

cli
  .command('complete <id:number>')
  .description('タスクを完了にする')
  .action(async (_, id: number) => {
    await completeCommand(id.toString());
  });

cli
  .command('delete <id:number>')
  .description('タスクを削除')
  .action(async (_, id: number) => {
    await deleteCommand(id.toString());
  });

cli
  .command('help')
  .description('ヘルプを表示')
  .action(() => {
    Display.showHelp();
  });

if (import.meta.main) {
  try {
    await cli.parse(Deno.args);
  } catch (error) {
    Display.showError(`エラーが発生しました: ${error.message}`);
    Deno.exit(1);
  }
} 