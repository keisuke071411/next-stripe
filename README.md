# tua-lp

## Links

- Production
  - https://main.d29rq60cotvyh2.amplifyapp.com/
- Staging
  - https://develop.d29rq60cotvyh2.amplifyapp.com/
- Adobe XD
  - coming soon

## Setup

### ▼ First of all

```bash
$ git clone https://github.com/hackz-inc/tua-lp.git
$ yarn install
```

Check => http://localhost:3000/

### ▼ Secret Key

環境変数を設定する必要があります。  
誰かに教えてもらって、`.env.local` ファイルに設定しましょう。

## 開発方針

### ▼ 開発ルール

- [命名規則](https://github.com/hackz-inc/developer-docs/blob/master/developer_rules/naming_convention.md#-%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E5%91%BD%E5%90%8D%E8%A6%8F%E5%89%87)
- [GitHub に関するルール](https://github.com/hackz-inc/developer-docs/blob/master/developer_rules/github_rules.md)
- [その他](https://github.com/hackz-inc/developer-docs/blob/master/developer_rules/other_rules.md)

### ▼ 開発フロー

1. `develop`から`feature/#issue[x]`を切ってから開発
2. 開発後はやなぎくん or ふっけをレビュワーに設定し、PR を投げる
3. `develop` へのマージ後、ステージング環境にデプロイされる

### ▼ 本番デプロイ

1. ステージング環境での動作を確認する
2. `develop` → `main` ブランチに PR を作成
3. CI が All Green になることを確認する
4. マージすると、本番環境にデプロイされる
