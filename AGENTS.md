# Codex Agent Settings (Vibe Beace Frontend)

このファイルは、本リポジトリで利用する Codex CLI エージェント（以下「エージェント」）の振る舞い・作業方針を定義します。原則として本ファイルの内容に従って応答・編集・計画を行います。

## 目的と範囲

- 目的: Vibe Beace フロントエンドの開発支援（コード編集、設計整理、ドキュメント整備、軽微な検証）。
- 範囲: リポジトリ内のファイルに限定した変更（workspace-write）。ネットワークは基本禁止（必要時は明示）。
- 既存ルール尊重: 既存のスタイル・構成・命名・設計方針を尊重し、変更は最小限かつ局所的に。

## リポジトリ概要（要約）

- 技術: SvelteKit v2 + TypeScript + Vite、Tailwind CSS v4、Prisma v6（PostgreSQL）、Zod。
- UI: `cclkit4svelte` とカスタムコンポーネント。
- データモデル: `prisma/schema.prisma` に Thread / Bead / CutCloth / XStitchCloth。
- 主な配置:
  - コントローラー: `src/lib/controllers/*Controller.ts`
  - バリデーション: `src/lib/validation/*.ts`
  - 画面/ルーティング: `src/routes/inventory/*`, `src/routes/api/*`
  - 認証: `src/hooks.server.ts`（session クッキー、/inventory 保護）
- スクリプト: `dev`, `build`, `preview`, `check`, `format`, `lint`, `prisma:deploy`。
- デプロイ: Netlify（`@sveltejs/adapter-netlify`）。

## プロジェクトの目的

- 対象: ハンドメイド／刺繍／ビーズクラフト制作者の個人在庫管理。
- 目的: 所持資材の可視化と検索性の向上、買い足し判断や制作計画の支援。
- コア機能:
  - 資材（Thread/Bead/CutCloth/XStitchCloth）の追加・編集・削除・一覧表示。
  - `status`（unused/used/low など）と `wishlist` による優先度・購入管理。
  - フリーテキスト検索と今後のフィルタリング強化（ブランド等）。
- 運用前提: `/inventory` は認証で保護。Netlify への配備、PostgreSQL（Prisma）で永続化。

## 応答スタイル

- 既定言語: 日本語（ユーザーが指定した場合はそれに従う）。
- トーン: 簡潔・直接・友好的。余計な冗長説明は避け、行動可能な指示を優先。
- 構成（要点）:
  - 必要時のみ見出しを使用（1–3語、Title Case、両端に `**`）。
  - 箇条書きは `- `、キーワードは太字、コード/パス/コマンドはバッククォート。
  - 関連事項をまとめ、短く、重複を避ける。

## ツール使用方針

- `apply_patch`: 変更編集の唯一の手段。無関係な修正はしない。小さく焦点化。
- `shell`: 読取系は自由。書込や破壊的操作、ネットワーク、外部実行が必要な場合は事前に意図を明記し承認を得る（on-request）。
- `update_plan`: 非自明な複数ステップ作業で使用。常に1つだけ `in_progress` を保つ。ステップ完了毎に更新。
- 禁止: 依存追加やグローバル設定変更などの越権操作、秘密情報の露出（`.env` 等）

## 実行ポリシー

- 根本原因を修正。表面的回避や暫定対処は避ける。
- 既存のスタイル/パターンに合わせる。不要なファイル名変更・大規模リファクタは行わない。
- テスト/検証: 変更箇所に限定して確認可能な範囲で実施。無関係な失敗は触れない（必要なら報告）。
- ドキュメント: 影響がある場合は該当ドキュメントを更新。

## コマンド/メッセージ作法

- ツール呼び出し前プレアンブル: 1–2文で次に行うことを簡潔に説明し、関連操作はまとめる。些末な単発読取は単独プレアンブルを省略可。
- 進捗共有: 長めの作業では合間に短く状況共有（8–10語程度）。
- 最終メッセージ: 簡潔に成果・変更点・次アクションを提示。必要に応じて見出し/箇条書き/コード体裁を使用。

## セキュリティ/安全

- 機密: `.env` や資格情報は表示/送信しない。外部送信・ネットワークアクセスはしない。
- 破壊的操作: 明示的なユーザー合意なく `rm`/`reset` 等は実行しない。
- 依存: ネットワーク制限下での追加/アップグレードは行わない（必要時は承認要請）。

## 開発の事前知識

- SvelteKit 基本:
  - 画面は `+page.svelte`、サーバロードは `+page.server.ts` の `load` で行い、戻り値はシリアライズ可能なデータのみ。
  - API は `+server.ts` に `GET/POST/PUT/DELETE` ハンドラを定義。フォーム送信やフェッチはここを経由。
  - サーバ専用コード（Prisma・環境変数）はクライアントにバンドルしない。`lib/controllers`/`routes/**/+server.ts` でのみ使用。
  - 認証は `src/hooks.server.ts` の `session` クッキーで `/inventory` を保護。新規保護ルートも同様の方針に準拠。
- Prisma 運用:
  - スキーマは `prisma/schema.prisma`。クライアント生成は `postinstall` で自動（`prisma generate`）。
  - 変更時はローカルでマイグレーション（例: `prisma migrate dev`）、本番/CI は `npm run prisma:deploy` を使用。
  - DB 接続は `src/lib/db.ts` の単一 `PrismaClient` を再利用。複数インスタンス生成は避ける。
  - 必須環境変数: `DATABASE_URL`（`.env` 非公開、デプロイ先の環境変数で設定）。
- バリデーション/ドメイン:
  - 入力検証は `src/lib/validation/*.ts` の Zod スキーマを利用し、`safeParse` で堅牢に処理。
  - 資材モデル: `Thread/Bead/CutCloth/XStitchCloth`。共通項目に `quantity`, `status`, `wishlist`。`status` は `unused/used/low` 等の文字列を想定。
  - 検索: `/inventory` は `?query=` を `+page.server.ts` で受け取り、各 `getAll*` に引き渡しフィルタ。
- UI/スタイル:
  - 既存の `MaterialCard.svelte` パターンを踏襲。適宜 `cclkit4svelte` を優先活用。
  - Tailwind v4 構成。クラス順序は Prettier の tailwind プラグインに従う。
  - フォーム/一覧は一貫した UX（エラーメッセージ、ローディング、確認モーダル）を実装。
- エラーハンドリング/レスポンス:
  - API は `try/catch` と明確な HTTP ステータス・JSON で応答。ユーザー向けにはフロントで分かりやすいメッセージを表示。
  - `load`/アクションは失敗時のリダイレクトやエラー表示フローを統一。
- 品質/ツール:
  - フォーマット: `npm run format`、Lint: `npm run lint`。変更は小さく、関連ファイルのみ。
  - TypeScript を徹底（型の明示、`any` 回避）。不要なグローバル変更・依存追加は行わない。
 - ドキュメント更新は影響範囲内で実施（`GEMINI.md`/`docs/*`/本ファイル）。

## 開発バックログ

- XStitchCloth 一式:
  - コントローラ `src/lib/controllers/xStitchClothController.ts` を新規作成（CRUD + 検索）。
  - API ルート `/src/routes/api/` に GET/POST/PUT/DELETE を整備（`getXStitchCloth`/`addXStitchCloth`/`updateXStitchCloth`/`deleteXStitchCloth`）。
  - UI: `/inventory` にラジオと一覧表示を追加、`/inventory/add-xstitch-cloth`、`/inventory/edit-xstitch-cloth/[id]` を実装。
  - `MaterialCard.svelte` に XStitchCloth 表示分岐を追加、Zod 検証適用。
- API 保護:
  - `/api/*` をセッション必須にする（`hooks.server.ts` でガード拡張 or 各 `+server.ts` で検証）。
  - CSRF 対策（フォームアクションの利用 or トークン導入）。
- 入力検証の徹底:
  - `add*/update*` で Zod の `safeParse` を使用し、エラーを UI へ還元。
  - フォームは `enhance` を活用し hidden ミラーを縮小。
- API/設計の整合性:
  - 取得系 API の不足補完（例: `/api/getCutCloth`）。
  - 追加系 API の揃え（`/api/addBead`、`/api/addCutCloth`、`/api/addXStitchCloth`）。
  - ルート命名の統一（REST 風 `/api/threads|beads|cut-cloths|xstitch-cloths` + メソッド or kebab-case へ）。
- UI/UX 改善:
  - 検索/フィルタ（ブランド・ステータス・ウィッシュリスト）、ソート切替。
  - 削除モーダルの導入（`confirm` 置換）。
  - ウィッシュリストのトグルをカード上で操作可能に。
  - ページネーション/無限スクロール（API に `limit/offset` or `cursor`）。
- バリデーション/スキーマ整合:
  - `status` 値の統一方針（XStitchCloth だけ `low` 無し → 仕様決定）。
  - 型・UI の整合（サーバ側で厳格パース、`any` 回避）。
- セキュリティ/信頼性:
  - 環境変数名の明確化（`VITE_AUTH_*` → `AUTH_*` 等へ見直し）。
  - API エラーレスポンスの標準化（構造化 JSON、メッセージ整備）。
- DX/運用:
  - コントローラの単体テスト、簡易 E2E（認証/主要 CRUD）。
  - Prisma Seed による開発用データ投入。
  - 検索頻出列の DB インデックス検討。
  - 変更に伴う `docs/*` と `GEMINI.md` の更新。

## 参考/連携

- プロジェクトの将来計画・タスク詳細は `GEMINI.md` と `docs/*` を参照。
- 設定変更要望があれば本ファイルを編集（追記・更新）して明示。

---

更新履歴:
- 2025-08-30: 初版作成（エージェント設定、概要、作法、ポリシー）
