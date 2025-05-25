# 📝 TODO CLI

DenoとTypeScriptで作られたシンプルなCLI TODOリストアプリケーションです。

## 🚀 特徴

- ✅ タスクの追加、一覧表示、完了、削除
- 🎨 美しいテーブル表示と色付き出力
- 💾 ローカルJSONファイルでのデータ保存
- 🔒 Denoのセキュアな実行環境
- 📱 シンプルで直感的なコマンド

## 📋 必要条件

- [Deno](https://deno.land/) v1.30.0 以上

## 🛠️ インストール

1. このリポジトリをクローン:
```bash
git clone <repository-url>
cd todo-deno-cli
```

2. グローバルコマンドとしてインストール:
```bash
deno install --global --allow-read --allow-write --allow-env --config deno.json -n todo main.ts
```

または、deno taskを使用:
```bash
deno task install
```

## 📖 使用方法

### タスクの追加
```bash
todo add "買い物に行く"
todo add "資料を作成する"
```

### タスク一覧の表示
```bash
todo list
```

### タスクの完了
```bash
todo complete 1
```

### タスクの削除
```bash
todo delete 1
```

### ヘルプの表示
```bash
todo help
```

## 🗂️ データ保存

タスクは `~/.todo/tasks.json` に保存されます。

## 🏗️ 開発

### 開発時の実行
```bash
deno run --allow-read --allow-write --allow-env main.ts list
```

または、deno taskを使用:
```bash
deno task dev list
```

### テストの実行
```bash
deno task test
```

### ウォッチモードでのテスト
```bash
deno task test:watch
```

### プロジェクト構造
```
todo-deno-cli/
├── main.ts              # メインエントリーポイント
├── deno.json            # Deno設定ファイル
├── README.md
└── src/
    ├── commands/        # コマンド処理
    │   ├── add.ts
    │   ├── list.ts
    │   ├── complete.ts
    │   └── delete.ts
    ├── utils/           # ユーティリティ
    │   ├── storage.ts   # データ保存・読み込み
    │   └── display.ts   # 表示フォーマット
    ├── models/
    │   └── task.ts      # タスクモデル
    └── types/
        └── index.ts     # 型定義
```

## 🔧 アンインストール

```bash
deno uninstall todo
```

## 💡 権限について

このアプリは以下の権限が必要です：
- `--allow-read`: タスクファイルの読み取り
- `--allow-write`: タスクファイルの書き込み  
- `--allow-env`: ホームディレクトリの取得

## 📄 ライセンス

MIT License 