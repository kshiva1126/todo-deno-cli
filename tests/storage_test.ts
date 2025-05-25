import { assertEquals, assertExists } from '@std/assert';
import { Storage } from '../src/utils/storage.ts';
import { join } from '@std/path';
import { exists } from '@std/fs';

// テスト用の一時ディレクトリを使用
const TEST_HOME = './test_home';

// テスト前にホームディレクトリを設定
function setupTestEnv() {
  Deno.env.set('HOME', TEST_HOME);
}

// テスト後にクリーンアップ
async function cleanupTestEnv() {
  try {
    await Deno.remove(TEST_HOME, { recursive: true });
  } catch {
    // ディレクトリが存在しない場合は無視
  }
}

Deno.test('Storage - 初期データの作成', async () => {
  setupTestEnv();

  try {
    const data = await Storage.load();
    assertEquals(data.nextId, 1);
    assertEquals(data.tasks.length, 0);
  } finally {
    await cleanupTestEnv();
  }
});

Deno.test('Storage - タスクの追加', async () => {
  setupTestEnv();

  try {
    const task = await Storage.addTask('テストタスク');

    assertEquals(task.id, 1);
    assertEquals(task.content, 'テストタスク');
    assertEquals(task.completed, false);
    assertExists(task.createdAt);

    // データが保存されているか確認
    const data = await Storage.load();
    assertEquals(data.nextId, 2);
    assertEquals(data.tasks.length, 1);
    assertEquals(data.tasks[0].content, 'テストタスク');
  } finally {
    await cleanupTestEnv();
  }
});

Deno.test('Storage - 複数タスクの追加', async () => {
  setupTestEnv();

  try {
    await Storage.addTask('タスク1');
    await Storage.addTask('タスク2');

    const tasks = await Storage.getTasks();
    assertEquals(tasks.length, 2);
    assertEquals(tasks[0].content, 'タスク1');
    assertEquals(tasks[1].content, 'タスク2');
    assertEquals(tasks[0].id, 1);
    assertEquals(tasks[1].id, 2);
  } finally {
    await cleanupTestEnv();
  }
});

Deno.test('Storage - タスクの完了', async () => {
  setupTestEnv();

  try {
    await Storage.addTask('完了テスト');

    const success = await Storage.completeTask(1);
    assertEquals(success, true);

    const tasks = await Storage.getTasks();
    assertEquals(tasks[0].completed, true);
  } finally {
    await cleanupTestEnv();
  }
});

Deno.test('Storage - 存在しないタスクの完了', async () => {
  setupTestEnv();

  try {
    const success = await Storage.completeTask(999);
    assertEquals(success, false);
  } finally {
    await cleanupTestEnv();
  }
});

Deno.test('Storage - タスクの削除', async () => {
  setupTestEnv();

  try {
    await Storage.addTask('削除テスト1');
    await Storage.addTask('削除テスト2');

    const success = await Storage.deleteTask(1);
    assertEquals(success, true);

    const tasks = await Storage.getTasks();
    assertEquals(tasks.length, 1);
    assertEquals(tasks[0].content, '削除テスト2');
  } finally {
    await cleanupTestEnv();
  }
});

Deno.test('Storage - 存在しないタスクの削除', async () => {
  setupTestEnv();

  try {
    const success = await Storage.deleteTask(999);
    assertEquals(success, false);
  } finally {
    await cleanupTestEnv();
  }
});

Deno.test('Storage - データファイルの永続化', async () => {
  setupTestEnv();

  try {
    // タスクを追加
    await Storage.addTask('永続化テスト');

    // ファイルが作成されているか確認
    const todoPath = join(TEST_HOME, '.todo', 'tasks.json');
    const fileExists = await exists(todoPath);
    assertEquals(fileExists, true);

    // ファイルの内容を確認
    const content = await Deno.readTextFile(todoPath);
    const data = JSON.parse(content);
    assertEquals(data.tasks[0].content, '永続化テスト');
  } finally {
    await cleanupTestEnv();
  }
});
