import { Storage } from '../utils/storage.ts';
import { Display } from '../utils/display.ts';

export async function deleteCommand(idStr: string): Promise<void> {
  const id = parseInt(idStr);
  
  if (isNaN(id) || id <= 0) {
    Display.showError('有効なタスクIDを入力してください。');
    Display.showInfo('使用例: todo delete 1');
    return;
  }

  try {
    const success = await Storage.deleteTask(id);
    
    if (success) {
      Display.showSuccess(`タスク ${id} を削除しました。`);
    } else {
      Display.showError(`ID ${id} のタスクが見つかりません。`);
      Display.showInfo('タスク一覧を確認するには: todo list');
    }
  } catch (error) {
    Display.showError(`タスクの削除に失敗しました: ${error.message}`);
  }
} 