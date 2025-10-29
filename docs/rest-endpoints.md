# REST エンドポイント簡易リファレンス

Vibe Beace フロントエンドの内部API。認証とCSRFを前提に、安全なCRUD操作を提供します。

## 基本

- ベースURL: `/`
- 認証: セッションCookie `session` 必須。未認証は `401 { success:false, error:"Unauthorized" }`。
- CSRF: Double-Submit Token 方式（Cookieとヘッダ/hiddenフィールドの一致検証）。
  - Cookie: `csrf`
  - ヘッダ: `X-CSRF-Token: <csrf cookieの値>`（POST/PUT/PATCH/DELETE で必須）
  - フォーム: hidden `name="csrfToken" value="<csrf cookieの値>"`（フォーム送信時）
  - 備考: Swagger等の自動ドキュメントは未提供。
- レスポンス形式（統一）
  - 成功: `{ success: true, data: ... }`
  - 失敗: `{ success: false, error: string | object }`

## リソースとパス

- Threads: `/api/threads`、`/api/threads/{id}`、`/api/threads/{id}/wishlist`
- Beads: `/api/beads`、`/api/beads/{id}`、`/api/beads/{id}/wishlist`
- CutCloths: `/api/cut-cloths`、`/api/cut-cloths/{id}`、`/api/cut-cloths/{id}/wishlist`
- XStitchCloths: `/api/xstitch-cloths`、`/api/xstitch-cloths/{id}`、`/api/xstitch-cloths/{id}/wishlist`

いずれも以下のメソッドに準拠します（現状）。

### 一覧取得 GET `/api/{resource}?query=...`

- 認証必須。CSRF不要。
- クエリ `query` で簡易検索（ブランド・品番など）。現状は `query` のみ対応。

例（Threads）:

```bash
curl -sS -b "session=<your_session_cookie>" \
  "/api/threads?query=310"
```

成功例:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "brand": "DMC",
      "colorNumber": "310",
      "colorName": "Black",
      "quantity": 2,
      "status": "unused",
      "wishlist": false
    }
  ]
}
```

### 追加 POST `/api/{resource}`

- 認証+CSRF必須（`X-CSRF-Token`）。
- ボディはリソース別スキーマに従う。

例（Thread 追加）:

```bash
curl -sS -X POST \
  -b "session=<your_session_cookie>; csrf=<csrf_token>" \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: <csrf_token>" \
  -d '{
    "brand":"DMC",
    "colorNumber":"321",
    "colorName":"Red",
    "quantity":1,
    "status":"unused",
    "wishlist":false
  }' \
  "/api/threads"
```

成功例（201）:

```json
{
  "success": true,
  "data": {
    "id": 10,
    "brand": "DMC",
    "colorNumber": "321",
    "colorName": "Red",
    "quantity": 1,
    "status": "unused",
    "wishlist": false
  }
}
```

### 更新 PUT `/api/{resource}/{id}`

- 認証+CSRF必須。`id` は数値。

例（Thread 更新）:

```bash
curl -sS -X PUT \
  -b "session=<your_session_cookie>; csrf=<csrf_token>" \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: <csrf_token>" \
  -d '{
    "brand":"DMC",
    "colorNumber":"310",
    "colorName":"Black",
    "quantity":3,
    "status":"used",
    "wishlist":false
  }' \
  "/api/threads/1"
```

### 削除 DELETE `/api/{resource}/{id}`

- 認証+CSRF必須。

```bash
curl -sS -X DELETE \
  -b "session=<your_session_cookie>; csrf=<csrf_token>" \
  -H "X-CSRF-Token: <csrf_token>" \
  "/api/threads/1"
```

成功例:

```json
{ "success": true, "data": { "id": 1 } }
```

### Wishlist 更新 PATCH `/api/{resource}/{id}/wishlist`

- 認証+CSRF必須。ボディ `{ "wishlist": true|false }`。

```bash
curl -sS -X PATCH \
  -b "session=<your_session_cookie>; csrf=<csrf_token>" \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: <csrf_token>" \
  -d '{ "wishlist": true }' \
  "/api/threads/1/wishlist"
```

## スキーマ要点

- Thread: `{ brand, colorNumber, colorName?, quantity>=0, status?: 'unused'|'used'|'low', wishlist, notes?, createdAt, updatedAt }`
- Bead: `{ brand, itemCode, size, colorName?, quantity>=0, status?: 'unused'|'used'|'low', wishlist, notes?, createdAt, updatedAt }`
- CutCloth: `{ brand?, fabricType, pattern, size, quantity>=0, status?: 'unused'|'used', wishlist, notes?, createdAt, updatedAt }`
- XStitchCloth: `{ brand?, count, color, size, quantity>=0, status?: 'unused'|'used', wishlist, notes?, createdAt, updatedAt }`
  - `notes`: 文字列（最大1000文字）、省略可、`null`可

## まだ未提供の操作

- `GET /api/{resource}/{id}`（1件取得）: 今後の拡張候補。


## エラー例とステータス

- 400 Bad Request: バリデーションエラー

```json
{
  "success": false,
  "error": { "fieldErrors": { "brand": ["String must contain at least 1 character(s)"] } }
}
```

- 401 Unauthorized: 認証なし

```json
{ "success": false, "error": "Unauthorized" }
```

- 403 Forbidden: CSRF不正

```json
{ "success": false, "error": "Invalid CSRF token" }
```

- 500 Server Error: 予期せぬサーバ例外

```json
{ "success": false, "error": "<error message>" }
```

## ブラウザFetch例（CSRF）

```ts
// Cookieからcsrfトークンを取り出し、ヘッダに付与
const csrf = document.cookie
  .split('; ')
  .find((c) => c.startsWith('csrf='))
  ?.split('=')[1];

await fetch('/api/threads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrf ?? ''
  },
  body: JSON.stringify({ brand: 'DMC', colorNumber: '321', quantity: 1, wishlist: false })
});
```

注意: `csrf` Cookieは`/`パス、`httpOnly: false`, `sameSite: 'strict'` で付与されます。
