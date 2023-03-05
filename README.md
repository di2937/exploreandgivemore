本ページは元のGitLabの概要を日本語に翻訳したものです。
(元のGitLabページ->https://gitlab.com/RikGhosh487/exploreandgivemore)

----

Explore&GiveMoreのWebページ：https://www.exploreandgivemore.me

----

# Explore&GiveMore


**プロジェクト提案：** Explore＆GiveMoreウェブサイトは、市の情報、公共の観光名所、そしてどのような慈善団体がこの市と深く関わっているかについて、包括的な都市ガイドとなることを目指しています。この都市ガイドは、収益や救済の面で市を直接支援する都市と観光名所を強調し、人々が寄付できる慈善団体を紹介することを目的としています。



## 開発チーム
| 名前 | GitLabID | 大学ID
| :--: | :--: | :--: |
| Rik Ghosh | [`RikGhosh487`](https://gitlab.com/RikGhosh487) | `rgg857` |
| Katherine Eisen | [`katherine-eisen`](https://gitlab.com/katherine-eisen) | `kee663` |
| Mariana Medina | [`marianamedina`](https://gitlab.com/marianamedina) | `mm94863` |
| Daimu Iwata | [`dimeonvin`](https://gitlab.com/dimeonvin) | `di2937` |
| Jarrod Brown | [`jarrod-brown`](https://gitlab.com/jarrod-brown) | `jcb5852` |

----

** フェーズ１ リーダー: Rik Ghosh**
> 役割:
> - ミーティングのまとめ
> - デザインの選択肢やバグに関する質問の明確化
> - Gitlにおけるタスクとイシューの管理

| 名前 | 実装にかかる予想時間 | 実際にかかった時間 |
| :--: | :--: | :--: |
| Rik Ghosh | 15 hrs  | 20 hrs |
| Katherine Eisen | 15 hrs | 17 hrs |
| Mariana Medina | 13 hrs | 15 hrs |
| Daimu Iwata | 15 hrs | 20 hrs |
| Jarrod Brown | 10 hrs | 8 hrs  |

----

**フェーズ２ リーダー: Daimu Iwata**
> 役割:
> - APIからのデータ抽出の概算、スクレイピングスクリプトの実装
> - Google Cloud Runを利用してのバックエンドのホスティングの作成、更新されたインスタンスのデプロイ
> - モデルの画像などのリッチデータのためのAPIスクレイピングを実装
> - GitLab runnerのパイプライン
> - テストコンポーネントのバグの修正

| 名前 | 実装にかかる予想時間 | 実際にかかった時間 |
| :--: | :--: | :--: |
| Rik Ghosh | 40 hrs  | 50 hrs |
| Katherine Eisen | 25 hrs | 33 hrs |
| Mariana Medina | 25 hrs | 28 hrs |
| Daimu Iwata | 40 hrs | 50 hrs |
| Jarrod Brown | 30 hrs | 15 hrs  |

----

**フェーズ３ リーダー: Katherine Eisen**
> 役割:
> - フェーズ３におけるイシューの提案
> - モデルページにおける「検索/ソート/フィルター」バーの作成
> - 検索、ソート、フィルターにおけるフロントエンドテストの追加

| 名前 | 実装にかかる予想時間 | 実際にかかった時間 |
| :--: | :--: | :--: |
| Rik Ghosh | 25 hrs  | 15 hrs |
| Katherine Eisen | 30 hrs | 18 hrs |
| Mariana Medina | 25 hrs | 15 hrs |
| Daimu Iwata | 30 hrs | 20 hrs |
| Jarrod Brown | 10 hrs | 15 hrs  |

----

**フェーズ４ リーダー: Mariana Medina**
> 役割:
> - フロントエンドページの整理
> - フロントエンドのファイルのフォーマット
> - プレゼンテーションのデザイン

| 名前 | 実装にかかる予想時間 | 実際にかかった時間 |
| :--: | :--: | :--: |
| Rik Ghosh | 10 hrs  | 8 hrs |
| Katherine Eisen | 5 hrs | 2 hrs |
| Mariana Medina | 5 hrs | 3 hrs |
| Daimu Iwata | 2 hrs | 2 hrs |
| Jarrod Brown | 2 hrs | 2 hrs  |

----

## Project Information

- **最新のGit SHA**: `264de20720467090356d817ea60e2148a10d501f`
- **プロジェクトのWebページ:** [exploreandgivemore.me](https://www.exploreandgivemore.me) (こちらのページは現在停止中)
- **GitLab Pipelne:** [GitLab Pipeline](https://gitlab.com/RikGhosh487/exploreandgivemore/-/blob/main/.gitlab-ci.yml)
- **GitLabレポジトリのURL:** [ExploreAndGiveMore](https://gitlab.com/RikGhosh487/exploreandgivemore)

<details>
    <summary markdown="span"> 以前のSHAs </summary>
    <ul>
        <li> Phase I - <a href="https://gitlab.com/RikGhosh487/exploreandgivemore/-/commit/b0a7d66442e7e2fd6beb882a8465b2a0e424d81a" target="blank_">b0a7d66</a>
        <li> Phase II - <a href="https://gitlab.com/RikGhosh487/exploreandgivemore/-/commit/f7ee67699948f803fb0c83a5d4bfc03b1c23ac1b" target="blank_">f7ee676</a>
        <li> Phase III - <a href="https://gitlab.com/RikGhosh487/exploreandgivemore/-/commit/264de20720467090356d817ea60e2148a10d501f" target="blank_">264de20</a>
        <li> Phase IV - <a href="https://gitlab.com/RikGhosh487/exploreandgivemore/-/commit/f9ff5a4311d3b93036625e6dc60c573ef1c2a9e5" target="blank_">f9ff5a4</a>
    </ul>
</details>


----

## APIs
**モデルデータのRESTful API:**
* [**Cities API**](https://www.roadgoat.com/business/cities-api): https://www.roadgoat.com/business/cities-api
* [**Charitable Organizations API**](https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397): https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397
* [**Attractions API**](https://opentripmap.io/product): https://opentripmap.io/product 
* [**Attractions API**](https://developers.google.com/maps/documentation/places/web-service): https://developers.google.com/maps/documentation/places/web-service

----

## モデル
- 都市 (アメリカ内)
- 観光名所 (アメリカ内)
- 慈善団体 (アメリカ内)

<details>
    <summary markdown="span"> インスタンス数について </summary>
    <b>モデルあたりのインスタンス数:</b>
    <ul>
        <li> 531 都市
        <li> 5573 慈善団体
        <li> 2643 観光名所
    </ul>
</details>

----

<details>
    <summary markdown="span"> フィルター、ソートの属性について </summary>
    <b>フィルター、ソートの属性</b>
    <ul>
        <li> Cities
            <ul>
                <li> 人口数
                <li> タイムゾーン
                <li> 予算スコア
                <li> ウォークスコア
                <li> "通称"タグ
            </ul>
        <li> Attractions
            <ul>
                <li> 都市
                <li> 州
                <li> 知名度
                <li> 文化遺産認知度
                <li> "属性"タグ
            </ul>
        <li> Charities
            <ul>
                <li> 応用範囲
                <li> 評価
                <li> 都市
                <li> 州
                <li> 寄付控除可能性のステータス
            </ul>
    </ul>
</details>

----

<details>
    <summary> 追加の検索項目 </summary>
    <b>追加の検索項目</b>
    <ul>
        <li> Cities
            <ul>
                <li> 都市名
                <li> 州
                <li> バイクスコア
                <li> タイムゾーン
                <li> 居住費
            </ul>
        <li> Attractions
            <ul>
                <li> 設立年
                <li> 近隣の慈善団体
                <li> 所属宗教
                <li> 営業時間
                <li> 連絡先情報
            </ul>
        <li> Charities
            <ul>
                <li> IRS Subsection
                <li> IRSの組織分類
                <li> 財務評価
                <li> 信頼性
                <li> Charity EIN
            </ul>
    </ul>
</details>

----

<details>
    <summary> 使用されたリッチメディア </summary>
    <b> インスタンスページにおけるメディア </b>
    <ul>
        <li> Cities
            <ul>
                <li> 画像
                <li> 概要
                <li> 地図情報
                <li> ウォークスコアのIFrame
            </ul>
        <li> Attractions
            <ul>
                <li> 画像
                <li> 概要
                <li> 該当URL
                <li> 地図情報
                <li> 連絡先情報
                <li> レビュー
            </ul>
        <li> Charities
            <ul>
                <li> ロゴの画像
                <li> ミッションステートメント
                <li> 該当URL
            </ul>
    </ul>
</details>

----

**このサイトは下記の質問に答えます：**
1. 「この都市を訪れたら、訪れるべき観光名所は？」
2. 「この都市に関連した慈善団体は？」
3. 「これらの公共施設が支援する慈善団体は？」

----

### コメント
フェーズ2で可能だったユーザーストーリーはすべて実装しましたが、実装が遅れたものはフェーズ3で実装する予定です。

このプロジェクトで使用することに明示的に許可を与えてくれたCole Weinmann氏とKristina Zhou氏に感謝します。設計されたコンポーネントの一部を使用させていただきました。
GitLab情報：
- Cole Weinmann: [`@coleweinman`](https://gitlab.com/coleweinman)
- Kristina Zhou: [`@zhou.kristina`](https://gitlab.com/zhou.kristina)

このサイトを起動するために使用されたアイデアとコンセプトを提供してくれた『UniverCity』ウェブサイトに感謝します。

『UniverCity』のページ:
- https://www.univercity.me/

このプロジェクトでテストコンポーネントの一部を使用することに明示的に許可を与えてくれたNathaniel Nemenzo氏に感謝します(Seleniumテスト)。
GitLab情報：
- Nathaniel Nemenzo [`@Nathaniel-Nemenzo`](https://gitlab.com/Nathaniel-Nemenzo)

Seleniumテストのアイデアとコンセプトを提供してくれたGetThatBread GitLabに感謝します。
GitLab情報：
- https://gitlab.com/Nathaniel-Nemenzo/getthatbread/

開発者向けメモ:
- 各ツールがどのように使用されるかについては、Aboutページの各カードにマウスを乗せることで詳細を学ぶことができます。
- Attractionsモデルに十分なデータがないため、次のフェーズでは異なる(より精巧な)データセットが期待できます(このメッセージは変更が実施されたら更新されます)。
