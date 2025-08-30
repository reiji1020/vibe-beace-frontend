# GEMINI.md - Vibe Beace フロントエンドの次のステップ

このドキュメントは、Vibe Beace フロントエンドプロジェクトの次の計画ステップを概説し、継続性と将来の開発のための明確な方向性を提供します。

## プロジェクト概要

- 目的: ハンドメイド資材の在庫管理（Thread / Bead / CutCloth / XStitchCloth）の追加・編集・削除・閲覧を中心に、検索・フィルタ機能で素早く絞り込める管理ツール。
- 技術スタック: SvelteKit v2（TypeScript, Vite）/ Tailwind CSS v4 / Prisma v6（PostgreSQL）/ Zod / Netlify Adapter / UI: cclkit4svelte + カスタムコンポーネント。
- データモデル: `prisma/schema.prisma` に Thread, Bead, CutCloth, XStitchCloth を定義。`@prisma/client` を経由して操作。
- 主要構成:
  - コントローラー: `src/lib/controllers/*Controller.ts`（各資材のCRUDロジック、検索対応）
  - バリデーション: `src/lib/validation/*.ts`（Zodで入力検証）
  - 画面/ルーティング: `src/routes/inventory/*`（在庫一覧/追加/編集）、`src/routes/api/*`（APIエンドポイント）
  - 認証: `src/hooks.server.ts` による `session` クッキー判定。`/inventory` は認証必須。
- スクリプト: `npm run dev/build/preview/check/format/lint`、`prisma:deploy`（マイグレーション適用）。
- デプロイ: Netlify（`@sveltejs/adapter-netlify`）。

## 完了したタスク

### 1. 資材編集機能の実装

すべての資材（`Thread`、`Bead`、`CutCloth`）の編集機能が実装されました。これには、APIエンドポイント、コントローラーロジック、および編集フォームページの作成が含まれます。

---

## 次のステップ

### 1. XStitchCloth (クロスステッチ用の布) 機能の実装

`XStitchCloth` モデルは `prisma/schema.prisma` で定義されていますが、その完全な機能 (一覧表示、追加、削除) はまだフロントエンドまたは API に実装されていません。

**タスク:**

- **API エンドポイント:** 既存の資材タイプと同様に、API ルート (`src/routes/api/getXStitchCloths/+server.ts`、`src/routes/api/addXStitchCloth/+server.ts`、`src/routes/api/deleteXStitchCloth/+server.ts`) を作成します。
- **コントローラー:** `src/lib/controllers/xStitchClothController.ts` に `getAllXStitchCloth`、`addXStitchCloth`、`deleteXStitchCloth` 関数を実装します。
- **フロントエンド統合:**
  - `src/routes/inventory/+page.server.ts` を更新して `XStitchCloth` データを取得します。
  - `src/routes/inventory/+page.svelte` を更新して、ラジオボタンの選択に `XStitchCloth` を含め、`MaterialCard.svelte` を使用してカードを表示します。
  - 新しい `XStitchCloth` アイテムを追加するための `src/routes/inventory/add-xstitch-cloth/+page.svelte` と `src/routes/inventory/add-xstitch-cloth/+page.server.ts` を作成します。

## 2. 資材編集機能の実装

現在、資材は追加と削除のみ可能です。既存の在庫を管理するには、編集機能が不可欠です。

**タスク:**

- **API エンドポイント:** 各資材タイプを更新するための API ルート (例: `src/routes/api/updateThread/+server.ts`) を作成します。
- **コントローラー:** 各コントローラーに `updateThread`、`updateBead`、`updateCutCloth`、`updateXStitchCloth` 関数を実装します。
- **フロントエンド統合:**
  - 「編集」ボタンを追加するか、カードをクリック可能にして編集フォームに移動できるようにします。
  - 汎用または特定の編集フォームページ (例: `src/routes/inventory/edit-thread/[id]/+page.svelte`) を作成します。
  - 既存の資材データで編集フォームを事前に入力します。
  - API を介して資材データを更新するためのフォーム送信を実装します。

### 2. 検索およびフィルタリング機能の追加

在庫が増えるにつれて、ユーザーは特定の資材をすばやく見つける方法が必要になります。

**タスク:**

- **フロントエンド UI:** `src/routes/inventory/+page.svelte` に検索入力フィールドやフィルターオプション (例: ブランド、ステータス、ウィッシュリスト別) を追加します。
- **API/コントローラー:** 既存の `getAll...` 関数を変更するか、検索クエリとフィルターパラメーターを受け入れる新しい API エンドポイントを作成します。
- **データ取得:** `src/routes/inventory/+page.server.ts` を更新して、検索/フィルターパラメーターをバックエンドに渡します。

### 3. UI/UX の改善

- フォームとカードのスタイルを改善し、視覚的な魅力と使いやすさを向上させます。
- 大量の在庫に対してページネーションまたは無限スクロールの追加を検討します。
- ブラウザの `confirm()` の代わりに、削除確認モーダルを実装します。

---

**Gemini への注意点:**

- 常に既存のプロジェクト規則 (SvelteKit ルーティング、Prisma の使用、TypeScript) に従ってください。
- 利用可能で適切な場合は、`cclkit4svelte` コンポーネントの使用を優先してください。そうでない場合は、既存の `MaterialCard.svelte` パターンに従ってカスタムコンポーネントを作成してください。
- すべての新機能に対して、堅牢なエラー処理とユーザーフィードバックを確実に実装してください。
