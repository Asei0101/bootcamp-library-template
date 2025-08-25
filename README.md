# 蔵書検索アプリのテンプレート

## 環境構築

```sh
npm i
```

## 開発サーバー立ち上げ

```sh
npm run dev
```

## このリポジトリの初期設定手順

### 1. `create-next-app`を使ってテンプレートを作成

```shell
npx create-next-app
```

質問には以下のように回答。

```shell
What is your project named? > bootcamp-library-template
Would you like to use TypeScript? > No
Would you like to use ESLint? > Yes
Would you like to use Tailwind CSS? > Yes
Would you like your code inside a `src/` directory? > Yes
Would you like to use App Router? (recommended) > Yes
Would you like to use Turbopack for `next dev`? > No
Would you like to customize the import alias (`@/*` by default)? > No
```

### 2. ESLintのルールを強化

以下のコマンドでパッケージのインストール。

```sh
npm i -D eslint-config-prettier eslint-plugin-sort-exports eslint-plugin-unused-imports prettier
```

また、以下のファイルを追加・編集

- `.vscode/settings.json`
- `eslint.config.mjs`

`lint:fix`スクリプトを`package.json`に追加。

```jsonc
{
  // ...(省略)
  "scripts": {
    // ...(省略)
    "lint": "next lint", // ← コンマを書く
    "lint:fix": "next lint --fix", // ← 追加
  },
  // ... (省略)
}
```

### 3. js ファイルを jsx ファイルにリネーム

```shell
mv src/app/layout.js src/app/layout.jsx
mv src/app/page.js src/app/page.jsx
```

### 4. daisyuiのインストール

[参考サイト](https://daisyui.com/docs/install/nextjs/?lang=ja)

パッケージのインストール

```sh
npm i tailwindcss @tailwindcss/postcss daisyui@latest
```

`src/app/globals.css`の編集

```css
@import "tailwindcss";
@plugin "daisyui"; /* ← 追加 */
```

### 5. lucide-reactのインストール

```sh
npm i lucide-react
```

### 6. Prismaで本のデータベースを作成

パッケージのインストール。

```sh
npm i @prisma/client
npm i -D prisma fast-csv
```

以下のファイルを追加。

- `prisma/schema.prisma`

Prisma向けのスクリプトを`package.json`に追加。

```jsonc
{
  // ...(省略)
  "scripts": {
    // ...(省略)
    "lint": "next lint",
    "lint:fix": "next lint --fix", // ← コンマを書く
    "db:migrate": "npx prisma migrate dev", // 以降すべて追加
    "db:seed": "node prisma/seed.mjs",
    "db:reset": "npx prisma migrate reset --force",
    "prisma:studio": "npx prisma studio",
  },
  // ... (省略)
}
```

マイグレート(スキーマをDBに反映)する。

```sh
npm run db:migrate
```

マイグレーション名を聞かれたら`create book table`と答える。

また、以下のファイルを追加。

- `prisma/seed.mjs`

[このページ](https://www.kaggle.com/datasets/saurabhbagchi/books-dataset)から`books.csv`をダウンロードしプロジェクトルートに配置する。
その後、以下のコマンドを実行。

```sh
npm run db:seed
```

実行後は`books.csv`を削除する。

### 7. `src`フォルダにページとAPIを追加
