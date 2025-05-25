# 🤝 コントリビューションガイド

TODO CLI プロジェクトへのコントリビューションをありがとうございます！

## 🚀 開発環境のセットアップ

### 必要条件
- [Deno](https://deno.land/) v2.0.0 以上

### セットアップ手順

1. リポジトリをフォーク・クローン:
```bash
git clone https://github.com/YOUR_USERNAME/todo-deno-cli.git
cd todo-deno-cli
```

2. Git hooksをセットアップ（推奨）:
```bash
deno task setup-hooks
```

3. 開発用の実行:
```bash
deno task dev help
```

4. テストの実行:
```bash
deno task test
```

## 📋 開発ワークフロー

### 1. ブランチの作成
```bash
git checkout -b feature/your-feature-name
# または
git checkout -b fix/your-bug-fix
```

### 2. コード品質チェック
開発中は以下のコマンドを定期的に実行してください：

```bash
# フォーマット
deno task fmt

# リント
deno task lint

# 型チェック
deno task check

# テスト
deno task test

# 全体チェック
deno task fmt && deno task lint && deno task check && deno task test
```

**💡 Git Hooksを使用した自動チェック**

Git hooksをセットアップしている場合、コミット時に自動的に上記のチェックが実行されます：

```bash
# Git hooksが有効な場合、コミット時に自動実行される
git commit -m "your commit message"

# 手動でpre-commitチェックを実行
deno task pre-commit
```

### 3. コミット
コミットメッセージは以下の形式に従ってください：

```
type(scope): description

feat: 新機能
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル改善
refactor: リファクタリング
test: テスト追加・修正
chore: その他の変更
```

例:
```bash
git commit -m "feat: タスクの編集機能を追加"
git commit -m "fix: 完了済みタスクの表示バグを修正"
```

### 4. プルリクエスト
1. 変更をプッシュ
2. GitHub でプルリクエストを作成
3. PRテンプレートに従って情報を記入
4. CI チェックが通ることを確認

## 🧪 テスト

### テストの実行
```bash
# 全テスト実行
deno task test

# ウォッチモード
deno task test:watch

# 特定のテストファイル
deno test tests/storage_test.ts
```

### テストの書き方
- 新機能には必ずテストを追加
- `tests/` ディレクトリに `*_test.ts` ファイルを作成
- Deno標準の `@std/assert` を使用

例:
```typescript
import { assertEquals } from '@std/assert';
import { YourClass } from '../src/your-module.ts';

Deno.test('YourClass should work correctly', () => {
  const instance = new YourClass();
  assertEquals(instance.method(), 'expected result');
});
```

## 📁 プロジェクト構造

```
todo-deno-cli/
├── main.ts              # メインエントリーポイント
├── deno.json            # Deno設定
├── src/
│   ├── commands/        # コマンド実装
│   ├── utils/           # ユーティリティ
│   ├── models/          # データモデル
│   └── types/           # 型定義
└── tests/               # テストファイル
```

## 🎯 コントリビューションのガイドライン

### コードスタイル
- TypeScript strict mode を使用
- シングルクォートを使用
- セミコロンを使用
- インデントは2スペース
- 行幅は100文字以内

### 命名規則
- ファイル名: `snake_case.ts`
- クラス名: `PascalCase`
- 関数名: `camelCase`
- 定数: `UPPER_SNAKE_CASE`

### ドキュメント
- 新機能には適切なドキュメントを追加
- README.md を必要に応じて更新
- JSDoc コメントを重要な関数に追加

## 🐛 バグレポート

バグを見つけた場合は、以下の情報を含めてIssueを作成してください：

- 再現手順
- 期待される動作
- 実際の動作
- 環境情報（OS、Denoバージョン）

## ✨ 機能リクエスト

新機能の提案は大歓迎です！以下を含めてIssueを作成してください：

- 機能の説明
- 動機・背景
- 使用例
- 実装の提案（あれば）

## 📞 質問・サポート

質問がある場合は、以下の方法でお気軽にお問い合わせください：

- GitHub Issues で質問
- GitHub Discussions で議論

## 📄 ライセンス

このプロジェクトに貢献することで、あなたの貢献が MIT ライセンスの下でライセンスされることに同意したものとみなされます。 