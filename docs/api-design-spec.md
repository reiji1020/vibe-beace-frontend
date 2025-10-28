# 🌐 API設計書（REST統合）

このドキュメントは在庫管理ツールの内部API設計をRESTに統合した最新仕様として示します。旧式の名前付きエンドポイント（get*/add*/update*/delete*/set*）は廃止します。

---

## 📘 共通事項

- ベースパス: `/`
- レスポンス: `application/json`（統一フォーマット）
  - 成功: `{ success: true, data: ... }`
  - 失敗: `{ success: false, error: string | object }`
- ステータス: 200/201/204/400/401/403/404/409/500 等
- 認証: セッションCookie `session` 必須（未認証は 401）
- CSRF: Double-Submit Token
  - Cookie: `csrf`
  - ヘッダ: `X-CSRF-Token: <csrf cookie>`（POST/PUT/PATCH/DELETE）

詳細な利用例は `docs/rest-endpoints.md` を参照。

---

## 🗂️ リソースとパス

- Threads: `/api/threads`, `/api/threads/{id}`, `/api/threads/{id}/wishlist`
- Beads: `/api/beads`, `/api/beads/{id}`, `/api/beads/{id}/wishlist`
- CutCloths: `/api/cut-cloths`, `/api/cut-cloths/{id}`, `/api/cut-cloths/{id}/wishlist`
- XStitchCloths: `/api/xstitch-cloths`, `/api/xstitch-cloths/{id}`, `/api/xstitch-cloths/{id}/wishlist`

### メソッド規約

- 一覧 GET `/api/{resource}`: クエリ検索・フィルタ（`query`,`brand`,`status`,`wishlist`,`limit`,`offset` など）
- 取得 GET `/api/{resource}/{id}`: 1件取得
- 追加 POST `/api/{resource}`: 201 + 作成結果
- 更新 PUT `/api/{resource}/{id}`: 全体上書き
- 削除 DELETE `/api/{resource}/{id}`: 204 or 200（削除結果）
- Wishlist PATCH `/api/{resource}/{id}/wishlist`: `{ wishlist: boolean }`

---

## 🧵 スキーマ要点（型）

- Thread: `{ brand, colorNumber, colorName?, quantity>=0, status?: 'unused'|'used'|'low', wishlist, notes?, createdAt, updatedAt }`
- Bead: `{ brand, itemCode, size, colorName?, quantity>=0, status?: 'unused'|'used'|'low', wishlist, notes?, createdAt, updatedAt }`
- CutCloth: `{ brand?, fabricType, pattern, size, quantity>=0, status?: 'unused'|'used', wishlist, notes?, createdAt, updatedAt }`
- XStitchCloth: `{ brand?, count, color, size, quantity>=0, status?: 'unused'|'used', wishlist, notes?, createdAt, updatedAt }`

備考: `notes` は任意（最大1000文字想定）、`status` はリソースによりEnumが異なります。

---

## ✍️ 例（Thread 追加）

リクエスト

```http
POST /api/threads
Cookie: session=...; csrf=...
X-CSRF-Token: <csrf>
Content-Type: application/json

{
  "brand":"DMC",
  "colorNumber":"321",
  "colorName":"Red",
  "quantity":1,
  "status":"unused",
  "wishlist":false
}
```

レスポンス（201）

```json
{
  "success": true,
  "data": { "id": 10, "brand": "DMC", "colorNumber": "321", "quantity": 1, "status": "unused", "wishlist": false }
}
```

---

## 📝 補足

- 旧式APIは廃止しました（互換レイヤーは提供しません）。
- 入力バリデーションは Zod スキーマ（`src/lib/validation/*.ts`）で実施します。
- DB は Prisma（PostgreSQL）、`createdAt`/`updatedAt` はサーバで自動管理します。
