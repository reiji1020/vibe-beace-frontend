# 🌐 API設計書（在庫管理ツール）

このドキュメントは、在庫管理ツールにおける各素材カテゴリのAPI設計を定義します。  
命名は `get*`, `add*`, `update*`, `delete*`, `set*` の接頭辞を用いた一貫した構成とします。

---

## 📘 共通事項

- レスポンス形式：`application/json`
- ステータスコード：200, 201, 400, 404, 500 など適切に使用
- 認証：現時点ではなし（将来的に追加予定）
- URIベースパス：`/api/`

---

## 🧵 Thread（刺繍糸）

### 取得系
- `GET /api/getThreads`：全件取得
- `GET /api/getThread/:id`：ID指定取得
- `GET /api/getWishlistThreads`：買い物リストのみ

### 登録・更新・削除
- `POST /api/addThread`：新規追加
- `PUT /api/updateThread/:id`：上書き更新
- `PATCH /api/setWishlistThread/:id`：wishlistフラグのみ更新
- `DELETE /api/deleteThread/:id`：削除

---

## 🟣 Bead（ビーズ）

### 取得系
- `GET /api/getBeads`
- `GET /api/getBead/:id`
- `GET /api/getWishlistBeads`

### 登録・更新・削除
- `POST /api/addBead`
- `PUT /api/updateBead/:id`
- `PATCH /api/setWishlistBead/:id`
- `DELETE /api/deleteBead/:id`

---

## 🧵 CutCloth（カットクロス）

### 取得系
- `GET /api/getCutCloths`
- `GET /api/getCutCloth/:id`
- `GET /api/getWishlistCutCloths`

### 登録・更新・削除
- `POST /api/addCutCloth`
- `PUT /api/updateCutCloth/:id`
- `PATCH /api/setWishlistCutCloth/:id`
- `DELETE /api/deleteCutCloth/:id`

---

## 🧵 XStitchCloth（クロスステッチ布）

### 取得系
- `GET /api/getXStitchCloths`
- `GET /api/getXStitchCloth/:id`
- `GET /api/getWishlistXStitchCloths`

### 登録・更新・削除
- `POST /api/addXStitchCloth`
- `PUT /api/updateXStitchCloth/:id`
- `PATCH /api/setWishlistXStitchCloth/:id`
- `DELETE /api/deleteXStitchCloth/:id`

---

## 📦 リクエストボディ例（共通）

### addThread / updateThread 用
```json
{
  "brand": "DMC",
  "colorNumber": "310",
  "colorName": "Black",
  "quantity": 3,
  "status": "used",
  "wishlist": false
}
```

（他カテゴリも構造は類似）

---

## 📤 レスポンス形式（例）

```json
{
  "success": true,
  "data": {
    "id": 1,
    "brand": "DMC",
    "colorNumber": "310",
    "quantity": 3
  }
}
```

---

## 📝 補足

- `PATCH` エンドポイントは、部分的な更新（wishlistやstatusのトグル）に使用
- 名前付きエンドポイントのため、Vibe CodingやUI側で意図が明確に

