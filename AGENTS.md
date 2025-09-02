# Codex Agent Settings (Vibe Beace Frontend)

本リポジトリで利用する Codex CLI エージェント（以下「エージェント」）の基本方針を定義します。原則として本ファイルに従い、最小変更で安全・一貫した支援を行います。

## 目的と範囲

- 目的: Vibe Beace フロントエンドの開発支援（実装・設計・ドキュメント・軽微検証）。
- 範囲: リポジトリ内のみ編集（workspace-write）。ネットワークは原則禁止（必要時に明示）。
- 既存ルール: 既存のスタイル・構成・命名・設計を尊重し、変更は小さく局所的に。

## リポジトリ概要（要点）

- 技術: SvelteKit v2, TypeScript, Vite, Tailwind CSS v4, Prisma v6(PostgreSQL), Zod。
- 主配置: コントローラー `src/lib/controllers/*Controller.ts`、検証 `src/lib/validation/*.ts`、画面/ルート `src/routes/**`。
- データモデル: `prisma/schema.prisma`（Thread/Bead/CutCloth/XStitchCloth）。
- スクリプト: `dev`/`build`/`preview`/`check`/`format`/`lint`/`prisma:deploy`。
- デプロイ: Netlify（`@sveltejs/adapter-netlify`）。

## 運用原則

- 根本原因を修正: 暫定回避は避ける。
- 小さく安全に: 変更は局所・最小限、既存スタイルに合わせる。
- 検証は局所: 変更箇所に限りテスト/動作確認。無関係な失敗は触れない（必要時に報告）。
- ドキュメント更新: 影響範囲のドキュメント（本書/`docs/*`/`GEMINI.md`）を必要に応じ更新。

## 応答/メッセージ作法

- 既定言語: 日本語。トーンは簡潔・直接・友好的。
- プレアンブル: ツール実行前に1–2文で次の操作を要約（関連操作はまとめる）。
- 進捗共有: 長め作業では8–10語で区切り報告。
- 最終メッセージ: 成果・変更点・次アクションを簡潔に提示。

## ツール使用

- `apply_patch`: 唯一の編集手段。不要な併修は避ける。
- `shell`: 読取は自由。書込/ネット/外部実行は意図を明示し承認（on-request）。
- `update_plan`: 非自明な複数ステップで使用。常に1つだけ`in_progress`。
- 禁止: 依存追加/グローバル設定変更、機密露出（`.env`等）、無断の破壊的操作。

## セキュリティ

- 機密: `.env` 等は表示/送信しない。外部送信・ネットワークアクセスは行わない。
- 破壊的操作: 明示的な合意なく `rm`/`reset` 等を行わない。
- 依存: ネットワーク制限下での追加/更新はしない（必要時のみ申請）。

## 技術上の注意（簡潔）

- SvelteKit: APIは`+server.ts`に実装。サーバ専用コード（Prisma/環境変数）はクライアントにバンドルしない。`/inventory`と`/api`は`src/hooks.server.ts`で保護。
- Prisma: 単一の`PrismaClient`を再利用。`DATABASE_URL`必須。デプロイは`npm run prisma:deploy`。
- 検証: `src/lib/validation/*.ts`のZodスキーマ＋`safeParse`を徹底。
- UI/スタイル: `MaterialCard`パターン、`cclkit4svelte`優先、Tailwind v4。フォーム/一覧のUX一貫性を維持。
- エラー/レスポンス: 明確なHTTPステータス＋JSON。`load`/アクションの失敗フローを統一。
- 品質ツール: `npm run format`/`lint`。TypeScriptで型を明示し`any`回避。

## API 配置方針

- 推奨（REST）: リソースベースの階層構造
  - スレッド: `/api/threads`（GET/POST）、`/api/threads/[id]`（PUT/DELETE）、`/api/threads/[id]/wishlist`（PATCH）
  - ビーズ: `/api/beads`（GET/POST）、`/api/beads/[id]`（PUT/DELETE）、`/api/beads/[id]/wishlist`（PATCH）
  - カットクロス: `/api/cut-cloths`（GET/POST）、`/api/cut-cloths/[id]`（PUT/DELETE）、`/api/cut-cloths/[id]/wishlist`（PATCH）
  - クロスステッチ布: `/api/xstitch-cloths`（GET/POST）、`/api/xstitch-cloths/[id]`（PUT/DELETE）、`/api/xstitch-cloths/[id]/wishlist`（PATCH）
- 旧式（互換・非推奨）: `/api/{add|get|update|delete}/<ActionName>` は当面維持しつつ、順次RESTへ移行。

## 開発計画（要点）

- ドキュメント: RESTエンドポイントの簡易リファレンス（リクエスト/レスポンス/エラー例）を拡充。
- 検索UIポリッシュ: フィルタ状態保持、ブランド入力の資材別最適化、並び替え整備。
- ページネーション/無限スクロール: `limit/offset` または `cursor` の導入。
- 型安全化強化: フロントで `ApiResponse<T>` を活用し、ページ間の型共有を整理。
- テスト拡張: 500系（コントローラ例外）のRESTテストを全リソースで均一化。
- 削除モーダル: `cclkit4svelte` のモーダル提供後に導入（現状は `confirm` 維持）。

## 参考/連携

- 将来計画・詳細ドキュメント: `docs/*`
- 方針の変更要望は本ファイルを編集して明示。

---

更新履歴:

- 2025-08-30: 初版作成（エージェント設定、概要、作法、ポリシー）
- 2025-09-01: スキーマ整合（status Enum 化）と型/UI 調整を反映。
