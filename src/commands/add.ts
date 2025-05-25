import { Storage } from '../utils/storage.ts';
import { Display } from '../utils/display.ts';

export async function addCommand(content: string): Promise<void> {
  if (!content || content.trim() === '') {
    Display.showError('タスクの内容を入力してください。');
    Display.showInfo('使用例: todo add "買い物に行く"');
    return;
  }

  try {
    const task = await Storage.addTask(content.trim());
    Display.showSuccess(`タスクを追加しました: "${task.content}" (ID: ${task.id})`);
  } catch (error) {
    Display.showError(`タスクの追加に失敗しました: ${(error as Error).message}`);
  }
}
