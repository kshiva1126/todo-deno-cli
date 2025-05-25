#!/bin/bash

# Git hooks セットアップスクリプト
# 開発環境でpre-commitフックを有効化します

echo "🔧 Git hooks をセットアップ中..."

# Git hooksディレクトリを設定
git config core.hooksPath .githooks

echo "✅ Git hooks のセットアップが完了しました！"
echo ""
echo "📋 設定内容:"
echo "  - Pre-commit hook: フォーマット、リント、型チェック、テストを実行"
echo "  - フックの場所: .githooks/"
echo ""
echo "💡 フックを無効化したい場合:"
echo "  git config --unset core.hooksPath"
echo ""
echo "🎉 これで、コミット前に自動的にコード品質チェックが実行されます！" 