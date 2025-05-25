import { Storage } from '../utils/storage.ts';
import { Display } from '../utils/display.ts';

export async function listCommand(): Promise<void> {
  try {
    const tasks = await Storage.getTasks();
    Display.showTasks(tasks);
  } catch (error) {
    Display.showError(`タスクの取得に失敗しました: ${(error as Error).message}`);
  }
}
