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
    createdAt: '2024-01-01T00:00:00.000Z',
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

  // フォーマットが正しい形式（YYYY/MM/DD）であることを確認
  const datePattern = /^\d{4}\/\d{2}\/\d{2}$/;
  assertEquals(datePattern.test(formatted), true);

  // 年が正しいことを確認
  assertEquals(formatted.startsWith('2024/'), true);
});

Deno.test('TaskModel - 異なる日付のフォーマット', () => {
  // タイムゾーンに依存しないテストケース
  const testCases = [
    '2024-01-01T12:00:00.000Z',
    '2024-06-15T12:00:00.000Z',
    '2024-12-25T12:00:00.000Z',
  ];

  testCases.forEach((input) => {
    const result = TaskModel.formatDate(input);

    // フォーマットが正しい形式（YYYY/MM/DD）であることを確認
    const datePattern = /^\d{4}\/\d{2}\/\d{2}$/;
    assertEquals(datePattern.test(result), true);

    // 年が正しいことを確認
    assertEquals(result.startsWith('2024/'), true);

    // 結果が空でないことを確認
    assertEquals(result.length, 10); // YYYY/MM/DD format
  });
});
