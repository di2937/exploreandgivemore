本ページはポートフォリオ用のもので、開発で使用していたレポジトリは下のものになります。  
(元のGitLabページ: https://gitlab.com/RikGhosh487/exploreandgivemore)

----

**開発したWebページ：** https://www.explorengivemore.me  
（なお、Aboutページにて各メンバーのコミット数のみ正しく反映されていない状況にあります。）

『元のGitLabページ』に記載してあるチームでデプロイしたページのURL（https://www.exploreandgivemore.me) は、アカウントの無料利用枠の期限などの理由で現在停止しております。  
『開発したWebページ』のURLは、私個人でAWS Amplify、Namecheap（ドメイン登録）を用いてデプロイし直したページになります。（バックエンドはCloud Runを用いてデプロイ）

----

## プロジェクトについて

本プロジェクトはテキサス大学オースティン校（The Univerisity of Texas at Austin）の[CS373: Software Engineering](https://www.cs.utexas.edu/users/downing/cs373/index.html)の授業にて制作したものです。  

プロジェクト作成にあたっての詳細説明ページ：https://www.cs.utexas.edu/users/downing/cs373/projects/IDB.html

プロジェクト制作において達成しなければいけない項目：
- [IMDB](https://www.imdb.com/)を模した、特定のトピックに関する役立つ情報を提供するWebアプリケーションの開発。
- プロジェクトには、RESTful APIを使用し、異なる３つのデータセットのスクレイピングをしなければいけない、また、何らかの形で市民の関与を促進するようなものを開発しなければいけない。
- 最低３つのデータモデルが必要であり、各モデルは他の2つのデータモデルに接続されていなければいけない。
- 各モデルのすべてのインスタンスには、フィード、画像、マップ、テキスト、ビデオなどの異なるメディアが含まれていなければいけない。

----

# 開発したプロジェクト：Explore&GiveMore


**サービス内容：** Explore＆GiveMoreウェブサイトは、都市の情報、またその市に関連する観光名所、慈善団体について、包括的な都市ガイドとなることを目指しています。この都市ガイドは、収益や救済の面で市を直接支援する都市と観光名所を強調し、人々が寄付できる慈善団体を紹介することを目的としています。

----

**使用した技術一覧：** 右ページの”Toolchain"項目より下に記載：https://www.explorengivemore.me/about  
（各ツールがどのように使用されるかについては、各カードにカーソルを合わせることで詳細を見ることができます。）

----

**各モデルのデータ収集のためにスクレイピングで使用したRESTful API:**
* [**Cities API**](https://www.roadgoat.com/business/cities-api): https://www.roadgoat.com/business/cities-api
* [**Charitable Organizations API**](https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397): https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1397
* [**Attractions API**](https://opentripmap.io/product): https://opentripmap.io/product 
* [**Attractions API**](https://developers.google.com/maps/documentation/places/web-service): https://developers.google.com/maps/documentation/places/web-service

----

**データモデル**
- Cities（in USA)
- Attractions (in USA)
- Charities (in USA)

<details>
    <summary markdown="span"> インスタンス数について </summary>
    <b>モデルあたりのインスタンス数:</b>
    <ul>
        <li> 都市　531 
        <li> 慈善団体　5573 
        <li> 観光名所　2643 
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
- **GitLab Pipelne:** [GitLab Pipeline](https://gitlab.com/RikGhosh487/exploreandgivemore/-/blob/main/.gitlab-ci.yml)
- **GitLabレポジトリのURL:** [ExploreAndGiveMore](https://gitlab.com/RikGhosh487/exploreandgivemore)

<details>
    <summary markdown="span"> 各フェーズにおけるSHA </summary>
    <ul>
        <li> Phase I - <a href="https://gitlab.com/RikGhosh487/exploreandgivemore/-/commit/b0a7d66442e7e2fd6beb882a8465b2a0e424d81a" target="blank_">b0a7d66</a>
        <li> Phase II - <a href="https://gitlab.com/RikGhosh487/exploreandgivemore/-/commit/f7ee67699948f803fb0c83a5d4bfc03b1c23ac1b" target="blank_">f7ee676</a>
        <li> Phase III - <a href="https://gitlab.com/RikGhosh487/exploreandgivemore/-/commit/264de20720467090356d817ea60e2148a10d501f" target="blank_">264de20</a>
        <li> Phase IV - <a href="https://gitlab.com/RikGhosh487/exploreandgivemore/-/commit/f9ff5a4311d3b93036625e6dc60c573ef1c2a9e5" target="blank_">f9ff5a4</a>
    </ul>
</details>


----

### 備考

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
