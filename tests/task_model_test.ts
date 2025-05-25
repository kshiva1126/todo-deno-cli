import { assertEquals, assertExists } from '@std/assert';
import { TaskModel } from '../src/models/task.ts';
import type { Task } from '../src/types/index.ts';

Deno.test('TaskModel - タスクの作成', () => {
  const task = TaskModel.create(1, 'テストタスク');
  
  assertEquals(task.id, 1);
  assertEquals(task.content, 'テストタスク');
  assertEquals(task.completed, false);
  assertExists(task.createdAt);
  
  // 日付が有効なISO文字列かチェック
  const date = new Date(task.createdAt);
  assertEquals(isNaN(date.getTime()), false);
});

Deno.test('TaskModel - タスクの完了', () => {
  const originalTask: Task = {
    id: 1,
    content: 'テストタスク',
    completed: false,
    createdAt: '2024-01-01T00:00:00.000Z'
  };
  
  const completedTask = TaskModel.complete(originalTask);
  
  assertEquals(completedTask.id, 1);
  assertEquals(completedTask.content, 'テストタスク');
  assertEquals(completedTask.completed, true);
  assertEquals(completedTask.createdAt, '2024-01-01T00:00:00.000Z');
  
  // 元のタスクは変更されていないことを確認
  assertEquals(originalTask.completed, false);
});

Deno.test('TaskModel - 日付フォーマット', () => {
  const isoDate = '2024-01-15T10:30:00.000Z';
  const formatted = TaskModel.formatDate(isoDate);
  
  // 日本のタイムゾーンでフォーマットされることを確認
  assertEquals(formatted, '2024/01/15');
});

Deno.test('TaskModel - 異なる日付のフォーマット', () => {
  // 日本時間での日付を考慮したテストケース
  const testCases = [
    { input: '2024-01-01T00:00:00.000Z', expected: '2024/01/01' },
    { input: '2024-06-15T12:00:00.000Z', expected: '2024/06/15' },
    { input: '2024-12-25T15:30:00.000Z', expected: '2024/12/26' } // UTCの15:30は日本時間で翌日の00:30
  ];
  
  testCases.forEach(({ input, expected }) => {
    const result = TaskModel.formatDate(input);
    assertEquals(result, expected);
  });
}); 