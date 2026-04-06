// npm install lucide-react firebase

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, BookOpen, RotateCcw, Home, ChevronRight, Flag, User, LogIn, List, AlertCircle } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ============================================================
// Firebase 設定 — ここを本番の値に書き換えてください
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyCyo4bAZwqaN2V0g91DehS6mHmjZD5XJTc",
  authDomain: "sabu-hide-web-app.firebaseapp.com",
  projectId: "sabu-hide-web-app",
  storageBucket: "sabu-hide-web-app.firebasestorage.app",
  messagingSenderId: "145944786114",
  appId: "1:145944786114:web:0da0c2d87a9e24ca6cf75b",
  measurementId: "G-XSS72H1ZKV"
};

// アプリ固有のID — 他の問題集アプリと混在しないよう固有の値を設定
const APP_ID = "financial-quiz-3-9";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================================
// 問題データ
// ============================================================
const QUESTIONS = [
  {
    id: 1,
    title: "問題1 物流",
    question: "物流に関する記述として、最も不適切なものはどれか。",
    choices: [
      "物流の主な機能には、輸送、保管、荷役、包装、流通加工の5つがある。",
      "荷役とは、流通の過程で製品の付加価値を高める作業のことである。",
      "物流の種類には大きく分けて、調達物流、社内物流、販売物流、回収物流がある。",
      "検品を正確かつ高速に行うために、EDIを介してメーカーから事前に送付される出荷明細をASNと呼ぶ。",
    ],
    answer: 1,
    explanation: `【解答：イ（選択肢2）】

「荷役」ではなく「流通加工」が、流通の過程で製品の付加価値を高める作業です。

▼物流の5大機能
`,
    explanationTable: {
      headers: ["機能", "内容"],
      rows: [
        ["輸送", "荷物を運ぶこと"],
        ["保管", "荷物を一定期間保管すること"],
        ["荷役", "輸送機器への積み込み、積み降ろしや、倉庫の入出庫などの作業のこと"],
        ["包装", "輸送や保管をするために、荷物を保護すること"],
        ["流通加工", "流通の過程で製品の付加価値を高めるような加工をすること（例：値札などのラベル貼り、小分け、検品、詰合せなど）"],
      ],
    },
    explanationExtra: `
▼物流の種類
・動脈物流：調達物流（材料・部品の調達）、社内物流（工場内）、販売物流（消費者への配送）
・静脈物流：回収物流（廃棄物・リサイクル物資の回収）

▼ASN（Advanced Shipping Notice：事前出荷明細）
検品を正確かつ高速に行うために、EDIを介してメーカーから事前に送付される出荷明細のことです。`,
  },
  {
    id: 2,
    title: "問題2 ロケーション管理",
    question: "物流センター内のロケーション管理に関する記述として、最も不適切なものはどれか。",
    choices: [
      "固定ロケーションは、出庫する際に商品を探す時間が短縮できる。",
      "固定ロケーションは、品種が多い場合にスペース効率が悪くなる。",
      "フリーロケーションは、商品の収納作業が効率的である。",
      "フリーロケーションは、固定ロケーションよりも品種と在庫量が把握しやすい。",
    ],
    answer: 3,
    explanation: `【解答：エ（選択肢4）】

フリーロケーションは商品の保管場所が固定されていないため、管理システムがなければ品種と在庫量の把握が固定ロケーションより「難しく」なります（把握しやすいの逆）。

▼ロケーション管理の方法`,
    explanationTable: {
      headers: ["", "固定ロケーション", "フリーロケーション"],
      rows: [
        ["方式", "商品の保管場所を固定する", "商品の保管場所を固定しない"],
        ["メリット", "・出庫時に商品を探す時間が短縮できる\n・在庫量が把握しやすい", "・空いている場所に保管できるため収納作業が効率的\n・倉庫のスペースを有効活用できる"],
        ["デメリット", "・倉庫スペースを有効活用できない\n・取扱商品が頻繁に変わると保管場所設定作業が増える", "・システムを導入していないと出庫時に商品を探すムダが増える\n・システムがないと在庫量の把握が難しい"],
      ],
    },
    explanationExtra: "",
  },
  {
    id: 3,
    title: "問題3 ピッキング作業",
    question: "物流センター内で行われるピッキング作業に関する記述として、最も適切なものはどれか。",
    choices: [
      "バッチピッキングは、多品種少量の品目を、多くの小売店に出荷する場合に適している。",
      "トータルピッキングは、いくつかの小売店に、特定の少量品目を大量に出荷する場合に適している。",
      "シングルピッキングは、ピッキング後の仕分け作業が必要になるため、出荷品目が多い場合には適さない。",
      "種まき方式は、オーダー毎にピッキングするため、移動距離が長くなる傾向にある。",
      "品種別ピッキングは、複数の作業者が作業範囲を分担し、各範囲の担当者がコンテナを中継しながら、ピッキング作業を完結する方式である。",
    ],
    answer: 1,
    explanation: `【解答：イ（選択肢2）】

トータルピッキング（種まき方式）では、1度のピッキングで複数オーダーに対応します。品目が少量であれば仕分け作業も簡単で、全体的に効率的です。

▼ピッキングの方法`,
    explanationTable: {
      headers: ["", "種まき方式（トータル/バッチピッキング）", "摘み取り方式（シングル/オーダーピッキング）"],
      rows: [
        ["メリット", "まとめてピッキングするので、ピッキング作業が効率的", "オーダーごとにピッキングするので、仕分け作業が効率的"],
        ["デメリット", "仕分け作業が複雑になる", "ピッキング作業が複雑になる"],
        ["適している商品", "品種が少なく、1品あたりの出荷量が多い商品", "品種が多く、1品あたりの出荷量が少ない商品"],
      ],
    },
    explanationExtra: `
覚え方：「種まき、品種、トータル、バッチリです」「摘み取り、リレー、シングル、オーダーしました」

※品種別ピッキング（選択肢5）は「種まき型」の一種。選択肢の記述は「リレー式ピッキング」の内容です。`,
  },
  {
    id: 4,
    title: "問題4 一括物流",
    question: "一括物流に関する記述として、最も不適切なものはどれか。",
    choices: [
      "一括物流により、小売店舗におけるカテゴリーマネジメントが実現しやすくなる。",
      "一括物流により、小売店舗側での検品の負荷を減らすことができる。",
      "一括物流センターには、在庫を持つTC型と、在庫をもたないDC型の2種類がある。",
      "通過型センターには、ベンダー仕分型とセンター仕分け型の2種類がある。",
    ],
    answer: 2,
    explanation: `【解答：ウ（選択肢3）】

TC型とDC型の説明が逆です。
・DC型（ディストリビューションセンター）＝在庫を「持つ」在庫型センター
・TC型（トランスファーセンター）＝在庫を「持たない」通過型センター

▼一括物流センターの種類`,
    explanationTable: {
      headers: ["種類", "略称", "内容"],
      rows: [
        ["在庫型センター", "DC型（ディストリビューションセンター）", "センター内に在庫を持ち、各小売店の要求に応じてピッキングや仕分けを行い配送・納品する形態"],
        ["通過型センター（ベンダー仕分型）", "TC型（トランスファーセンター）", "ベンダー（卸売業者）が事前に小売店別に仕分けを行って、センターに納品する形態"],
        ["通過型センター（センター仕分型）", "TC型（トランスファーセンター）", "ベンダーは事前に仕分けを行わずにセンターに納品し、センター内で小売店別にピッキング・仕分けを行う形態"],
      ],
    },
    explanationExtra: "",
  },
  {
    id: 5,
    title: "問題5 一括物流センター",
    question: "一括物流センターの特徴に関する記述として、最も適切なものはどれか。",
    choices: [
      "在庫型センターは、各メーカーや卸売業者から納品された商品をいったん保管し、小売店から発注があるとピッキングや仕分けを行って、各店舗へ出荷する。",
      "在庫型センターは、通過型センターに比べて、小売店が商品を発注してから店舗に納品されるまでのリードタイムが長くなる。",
      "通過型センターには、センター内で店別に仕分けを行うベンダー仕分型と、事前に店別に仕分けされた状態で納入されるセンター仕分型がある。",
      "通過型センターは、在庫を持たないため、カテゴリー納品に対応しやすい。",
    ],
    answer: 0,
    explanation: `【解答：ア（選択肢1）】

在庫型センター（DC型）は記述のとおり、センター内の在庫から店別にピッキング・仕分けを行い出荷します。

▼各選択肢の解説
・イ×：在庫型センターは在庫を持つため、リードタイムは通過型センターより「短い」（逆）
・ウ×：説明が逆。ベンダー仕分型＝事前に店別仕分けしてから納入。センター仕分型＝センター内で仕分け。
・エ×：カテゴリー納品に対応しやすいのは在庫型センター（DC型）。通過型は対応しにくい。

▼在庫型センターと通過型センターの比較`,
    explanationTable: {
      headers: ["比較項目", "在庫型（DC型）", "通過型・ベンダー仕分型（TC型）", "通過型・センター仕分型（TC型）"],
      rows: [
        ["センター在庫", "あり", "なし", "なし"],
        ["店舗へのリードタイム", "短い（在庫から即出庫）", "長い（在庫なし）", "長い（在庫なし）"],
        ["カテゴリー納品", "対応しやすい", "対応しにくい（2度手間）", "対応できる"],
      ],
    },
    explanationExtra: "",
  },
  {
    id: 6,
    title: "問題6 共同物流",
    question: "共同物流に関する記述として、最も適切なものはどれか。",
    choices: [
      "共同物流の推進により、物流事業者は減少する傾向にある。",
      "共同物流では、物流サービスのレベルは低下する傾向にある。",
      "共同物流では、小売店からの急な納品依頼にも柔軟に対応しやすい。",
      "共同物流の推進により、荷主側の物流コストは増える傾向にある。",
    ],
    answer: 0,
    explanation: `【解答：ア（選択肢1）】

共同物流を推進すると対応できる事業者に依頼が集約されるため、物流事業者は減少する傾向があります。

▼共同物流のポイント
【メリット（事業者側）】
・複数の卸売企業の商品を混載して配送 → 積載効率が向上
・物流コスト削減
・環境負荷の低減

【メリット（小売店側）】
・一括納品で受入作業を軽減
・物流サービスのレベルは「高く」なる傾向（選択肢イは逆）

【課題】
・競合業者が連携する必要があり足並みが揃いにくい
・荷動き情報が同業者に知られる懸念
・個別要求（急な納品依頼など）への対応が難しい（選択肢ウは誤り）
・荷主側の物流コストは「減る」傾向（選択肢エは逆）`,
    explanationTable: null,
    explanationExtra: "",
  },
  {
    id: 7,
    title: "問題7 トラック運送の生産性指標",
    question: "トラック運送の生産性指標に関する説明として、最も不適切なものはどれか。",
    choices: [
      "トラックが走行した距離のうち、貨物を輸送した距離の割合を表したものが、実車率（距離あたり）である。",
      "トラックが稼働していた時間のうち、貨物を運んで走行していた時間の割合を表したものが、実車率（時間あたり）である。",
      "運行可能なトラックの総車両数のうち、貨物を運んで走行していた車両数の割合を表したものが、実働率である。",
      "トラックの輸送能力に対する実際の輸送活動の割合を表したものが、積載率である。",
    ],
    answer: 2,
    explanation: `【解答：ウ（選択肢3）】

実働率とは、調査期間中にあった車両数のうち、何両が輸送のために走行したかを「延日数」による割合で表したもので、「総車両数に対する走行車両数の割合」ではありません。

▼4つの生産性指標`,
    explanationTable: {
      headers: ["指標", "定義", "計算式"],
      rows: [
        ["実車率（距離あたり）", "走行距離のうち貨物を輸送した距離の割合", "実車距離 ÷ 走行距離 × 100"],
        ["実車率（時間あたり）", "稼働時間のうち貨物を輸送した時間の割合", "走行時間 ÷ 稼働時間"],
        ["実働率", "調査期間中の車両数のうち輸送のために走行した延日数の割合", "実働延日車 ÷ 実在延日車 × 100"],
        ["積載率（輸送効率）", "輸送能力に対する実際の輸送活動の割合", "積載重量 ÷ 最大積載量 × 100"],
      ],
    },
    explanationExtra: "",
  },
  {
    id: 8,
    title: "問題8 トレーサビリティ",
    question: "トレーサビリティに関する記述として、最も不適切なものはどれか。",
    choices: [
      "トレーサビリティを導入しても、商品の安全管理を直接的に行うことはできない。",
      "トレーサビリティを構築するためには、商品にシリアルナンバーなどの管理番号を付与する必要がある。",
      "トレーサビリティを行うことで、問題発生時に迅速に流通経路を特定することができるが、原材料まで特定するのは難しい。",
      "トレーサビリティを導入することによって、情報の信頼性を向上することができる。",
    ],
    answer: 2,
    explanation: `【解答：ウ（選択肢3）】

トレーサビリティは流通経路だけでなく、使用している「原材料まで特定することが可能」です。原材料まで追跡できるからこそ、問題発生時に迅速な回収が実現できます。

▼トレーサビリティの導入目的と効果
【安全確保への寄与】
・問題発生時にプロセスを遡り原因を探索できる
・事故・不適合が生じた食品を絞り込み行き先を特定できる
・原材料の特定や回収を迅速に実施できる
・事業者の責任を明確にできる

【情報の信頼性の向上】
・経路の透明性を確保できる
・記録の照合関係を確保し表示の正しさを検証できる

【業務の効率性の向上】
・在庫管理や品質管理を効率的に行える

※トレーサビリティは「間接的に」安全性を向上させるが、直接的な活動（安全管理）を行うわけではない（選択肢アは正しい）`,
    explanationTable: null,
    explanationExtra: "",
  },
  {
    id: 9,
    title: "問題9 モーダルシフト",
    question: "モーダルシフトに関する記述として、最も不適切なものはどれか。",
    choices: [
      "モーダルシフトにより、長距離区間の一括大量輸送が可能になり、コスト削減につながる。",
      "モーダルシフトのデメリットとして、貨物の積み直しや遠回りの輸配送になることに伴うリードタイムの長期化が挙げられる。",
      "モーダルシフトとは、一般的には鉄道や船舶による輸送から、トラック等による輸送に転換することを指す。",
      "モーダルシフトにより、二酸化炭素の排出抑制や騒音低減など、環境面への配慮に寄与する。",
    ],
    answer: 2,
    explanation: `【解答：ウ（選択肢3）】

モーダルシフトは「トラック等 → 鉄道や船舶」への転換です。選択肢ウは逆（鉄道・船舶 → トラック）になっています。

▼モーダルシフトのポイント
【定義】
貨物輸送方法の転換。一般的には「トラック等 → 鉄道・船舶」への転換を指す（国土交通省が推進）。

【メリット】
・長距離区間の一括大量輸送が可能 → コスト削減
・CO₂排出量の抑制
・道路交通混雑・騒音の低減
・エネルギー節約

【デメリット】
・貨物の積み直しが発生する
・鉄道路線の制約で遠回りになる場合がある
・リードタイムが長期化する
・港湾設備やコンテナ船などの整備が必要`,
    explanationTable: null,
    explanationExtra: "",
  },
  {
    id: 10,
    title: "問題10 物品の輸送手段",
    question: "物品の輸送手段等に関する記述として、最も不適切なものはどれか。",
    choices: [
      "RORO船とは、貨物を積載したトラックを車体ごと船内に収納して、輸送する船舶のことである。",
      "RORO船は、港から港までトラックのまま輸送できるため、荷役時間を大幅に短縮できる。",
      "ユニットロードとは、コンテナやパレットなどを使用し、複数の貨物をひとまとめにしたものである。",
      "3PL事業者とは、自社で倉庫や車両などの物流資産を保有せず、物流戦略の企画やシステム構築などを受託する事業者のことであり、自ら物流資産を保有する事業者は3PLと呼ばない。",
    ],
    answer: 3,
    explanation: `【解答：エ（選択肢4）】

3PL事業者には「アセット型（自社で物流資産を保有）」と「ノンアセット型（物流資産を保有しない）」の2種類があります。物流資産を持つ事業者も3PLと呼びます。

▼用語整理
・RORO船：車両搭載型船舶。貨物を積んだトラックやトレーラーごと船内に収納 → 積み替え不要で荷役時間を大幅短縮
・ユニットロード：コンテナ・パレット等で複数貨物を1つにまとめること → 輸送・荷役の効率化
・3PL（Third Party Logistics）：物流機能を包括的に受託する形態
  - アセット型：自社倉庫・車両等の物流資産を保有
  - ノンアセット型：物流資産を保有しない`,
    explanationTable: null,
    explanationExtra: "",
  },
  {
    id: 11,
    title: "問題11 パレット",
    question: "パレットに関する記述として、最も不適切なものはどれか。",
    choices: [
      "パレチゼーションとは、荷物をパレットに載せて、そのまま荷役や輸送、保管などの物流を行うことである。",
      "荷物を出発地から到着地まで輸送手段に適したパレットに載せ替えながら、輸送・保管することを一貫パレチゼーションという。",
      "ワンウェイパレットとは、一回限りの使い捨てのパレットのことである。",
      "ロールボックスパレットは、かご形状のキャスター付きパレットで、荷物を積み重ねて大量運搬することができる。",
    ],
    answer: 1,
    explanation: `【解答：イ（選択肢2）】

一貫パレチゼーションとは、出発地から到着地まで「同一のパレットに乗せたまま」輸送・保管することです。途中でパレットを「載せ替えない」ことがポイントです。

▼パレット関連用語`,
    explanationTable: {
      headers: ["用語", "内容"],
      rows: [
        ["パレット", "荷物をまとめて載せて運ぶ荷役台。ユニットロードシステムの一つ。"],
        ["平パレット", "代表的なパレット"],
        ["ワンウェイパレット", "一回限りの使い捨てパレット"],
        ["ロールボックスパレット", "かご形状のキャスター付きパレット。荷物を積み重ねて大量運搬可能。"],
        ["パレチゼーション", "荷物をパレットに載せたまま荷役・輸送・保管を行うこと"],
        ["一貫パレチゼーション", "出発地から到着地まで同一パレットに載せたまま輸送・保管すること（パレット載せ替えなし）"],
      ],
    },
    explanationExtra: "",
  },
  {
    id: 12,
    title: "問題12 POSシステム1",
    question: "POSシステムの導入効果に関する記述として、最も適切なものはどれか。",
    choices: [
      "POSシステムを導入するだけで、受発注業務の効率化が期待できる。",
      "POSレジスタを導入することで、従業員による不正防止がしやすくなる。",
      "POSレジスタは、商品のバーコードに含まれる価格情報を読み取ることで精算を行う。",
      "POSシステムを導入することで、個人情報の保護が可能となる。",
    ],
    answer: 1,
    explanation: `【解答：イ（選択肢2）】

POSレジスタはレジ操作者や取引内容（受取金額・お釣り）を記録するため、不正防止に役立ちます。

▼各選択肢の解説
・ア×：POSシステム単独では受発注業務の効率化はできない。発注システムや在庫管理システムとの連動が必要。
・ウ×：JANコードには価格情報が含まれていない。バーコードスキャン時にストアコントローラーから価格情報を取得する（PLU：Price Look Up）。
・エ×：個人情報の保護はPOSシステムでは実現しない。会員カードなどで収集した個人情報は個人情報保護法に基づく管理が必要。

▼POSシステム（Point of Sales）のメリット（ハード面）
・レジ作業の効率化
・入力ミスの排除
・従業員の不正防止
・伝票処理業務の軽減

▼PLU（Price Look Up）
JANコードには価格情報がないため、POSレジでスキャンした際にストアコントローラーから価格情報を取得する仕組み。`,
    explanationTable: null,
    explanationExtra: "",
  },
  {
    id: 13,
    title: "問題13 POSシステム2",
    question: "POSデータの分析と活用に関する記述として、最も不適切なものはどれか。",
    choices: [
      "POSデータのバスケット分析を行うことで、関連購買比率や、セット販売の有効性を把握し、効果的な陳列や販売促進が可能となる。",
      "商品の陳列位置やフェイス数を変えた際に、POSデータの分析を行うことで、効果的なプラノグラムを実現できる。",
      "商品別の売上や粗利益を基準に、POSデータのABC分析を行うことで、「売れ筋商品」や「死に筋商品」を明確にすることができる。",
      "POSデータを分析して、どのような顧客がどのような商品を購入しているか、把握することで、ストアコンセプトを設定しやすくなる。",
    ],
    answer: 3,
    explanation: `【解答：エ（選択肢4）】

POSデータだけでは「誰に（顧客属性）」の情報は分かりません。顧客属性情報を活用するには、会員カードなどで収集した個人情報データベースとPOSデータを組み合わせる必要があります。

▼POS分析手法`,
    explanationTable: {
      headers: ["分析手法", "内容", "活用例"],
      rows: [
        ["売れ筋・死に筋分析（ABC分析）", "商品別の売上・粗利益でABC分析", "Aランク（売れ筋）：重点陳列・促進\nCランク（死に筋）：定番カット"],
        ["バスケット分析", "買い物カゴの中に一緒に入っている商品を分析", "関連陳列・セット販売 → 客単価向上"],
        ["プラノグラム", "販売データに基づいて棚割を決定するシステム", "最適な商品配置を実現"],
        ["顧客分析", "顧客属性情報＋POSデータの組み合わせ", "ストアコンセプト設定・CRM・FSP"],
      ],
    },
    explanationExtra: `
※顧客分析はPOSデータ単独ではできない。会員カード等の個人情報データベースとの組み合わせが必要。

▼市場POSデータと自店POSデータの比較`,
    explanationTable2: {
      headers: ["市場POSデータ", "自店POSデータ", "対応"],
      rows: [
        ["A品目（売れ筋）", "C品目（死に筋）", "商品自体の魅力は高いので、自店で売れない理由（陳列、価格設定など）を考える"],
        ["A品目（売れ筋）", "A品目（売れ筋）", "商品の取り扱いを継続する"],
        ["A品目（売れ筋）", "取り扱いなし", "商品の新規取り扱いを検討する"],
        ["C品目（死に筋）", "A品目（売れ筋）", "取り扱いを継続するが、廃番商品になることも意識して対応"],
        ["C品目（死に筋）", "C品目（死に筋）", "商品の取り扱いを中止する"],
      ],
    },
  },
  {
    id: 14,
    title: "問題14 個人情報保護法",
    question: "個人情報保護法に定める「個人情報」の組み合わせとして、最も適切なものを下記の解答群から選べ。\n\nａ 生存している、地震被災者個人の氏名などの情報\nｂ 従業員の住所録を家族構成ごと市区町村ごとに集計し、家族構成と市区町村だけを記載した集計情報\nｃ 従業員の人事考課情報\nｄ 取引先企業の一覧情報",
    choices: [
      "ａとｂ",
      "ａとｃ",
      "ｂとｄ",
      "ｂとｃ",
      "ｃとｄ",
    ],
    answer: 1,
    explanation: `【解答：イ（選択肢2）】ａとｃ

個人情報保護法の「個人情報」＝生存する個人に関する情報で、特定の個人を識別できるもの。

▼各情報の判定`,
    explanationTable: {
      headers: ["情報", "判定", "理由"],
      rows: [
        ["ａ：生存している被災者個人の氏名など", "○個人情報", "生存する個人の情報で、氏名により特定の個人を識別できる"],
        ["ｂ：家族構成・市区町村だけの集計情報", "×非該当", "特定の個人を識別できない統計情報"],
        ["ｃ：従業員の人事考課情報", "○個人情報", "業績等の評価情報に該当"],
        ["ｄ：取引先企業の一覧情報", "×非該当", "法人の情報（個人情報ではない）"],
      ],
    },
    explanationExtra: `
▼個人情報取扱事業者の義務
・利用目的の特定・公表
・取得に際しての利用目的の通知
・第三者への提供の制限`,
  },
  {
    id: 15,
    title: "問題15 JANコード",
    question: "JANコードに関する記述として、最も適切なものはどれか。",
    choices: [
      "メーカーで印刷するJANコードには通常、価格情報は含まれていない。",
      "小売業が独自に商品に印刷するJANコードを、ソースマーキングと呼ぶ。",
      "メーカーで用いるJANコードの先頭2桁は、その製品の原産国を表している。",
      "インストアマーキングには、価格情報を含まないNonPLUタイプと、価格情報を含むPLUタイプがある。",
    ],
    answer: 0,
    explanation: `【解答：ア（選択肢1）】

ソースマーキング（メーカーがつけるJANコード）には原則として価格情報が含まれていません。価格を入れると小売店が独自に販売価格を設定できないためです。

▼JANコードの体系`,
    explanationTable: {
      headers: ["種類", "付与者", "桁数", "先頭2桁", "備考"],
      rows: [
        ["ソースマーキング（標準）", "メーカー", "13桁", "49または45（国番号）", "国際規格（EAN）と互換性あり"],
        ["ソースマーキング（短縮）", "メーカー", "8桁", "49または45（国番号）", "日本独自規格"],
        ["インストアマーキング（標準）", "小売業", "13桁", "02または20〜29", "PLU（価格情報なし）またはNonPLU（価格情報あり）"],
        ["インストアマーキング（短縮）", "小売業", "8桁", "02または20〜29", "PLU（価格情報なし）またはNonPLU（価格情報あり）"],
      ],
    },
    explanationExtra: `
▼各選択肢の誤り
・イ×：小売業が独自につけるのは「インストアマーキング」。ソースマーキングはメーカーがつけるコード。
・ウ×：先頭2桁は「原産国」ではなく「国番号（商品の供給責任者の国）」を表す。日本業者が輸入販売すれば原産国が海外でも49または45。
・エ×：インストアマーキングのPLUは価格情報を「持たない」、NonPLUは価格情報を「持つ」（逆）。

▼PLUとNonPLU
・PLU（Price Look Up）：バーコードに価格情報なし → ストアコントローラーから価格情報を取得
・NonPLU（Non Price Look Up）：バーコードに価格情報あり → ストアコントローラーから取得不要`,
  },
  {
    id: 16,
    title: "問題16 バーコード",
    question: "次に示すコードの名称と内容について、最も適切なものの組み合せを下記の解答群から選べ。\n\nａ GS1-128 ― 企業間取引で使用する国際標準の事業所コード\nｂ GTIN ― 企業間取引で使用する標準的な商品コード\nｃ GLN ― 企業間で商品マスター情報を標準化し、共有する仕組み\nｄ GDS ― JANコードやITFで表示できなかった多様な表示をできるコード\nｅ ITF ― 物流梱包外装などに表示されるコード",
    choices: [
      "ａとｂ",
      "ａとｄ",
      "ｂとｅ",
      "ｃとｄ",
      "ｅとｃ",
    ],
    answer: 2,
    explanation: `【解答：ウ（選択肢3）】ｂとｅ

▼GS1コード体系`,
    explanationTable: {
      headers: ["コード", "正しい内容"],
      rows: [
        ["GTIN（Global Trade Item Number）", "国際間の企業間取引で使用する標準的な「商品コード」"],
        ["GLN（Global Location Number）", "国際間の企業間取引で使用する国際標準の「事業所コード」"],
        ["GDS（Global Data Synchronization）", "企業間で商品マスター情報を標準化し「共有する仕組み」"],
        ["GS1-128", "JANコードやITFで表示できなかった多様なデータ（製造日・ロット番号等）を表示できるコード"],
        ["ITF（Interleaved Two of Five）", "物流梱包の段ボールなど「外装に表示されるバーコード」。箱を開けずに中身確認可能。"],
        ["EPC（Electronic Product Code）", "RFID用の商品識別コード"],
      ],
    },
    explanationExtra: `
覚え方：Gの後ろにつづく英単語をキーに
・(Global)Trade Item → 取引商品コード
・(Global)Location Number → 事業所コード
・(Global)Data Synchronization → データ同期（情報共有）`,
  },
  {
    id: 17,
    title: "問題17 GTIN",
    question: "GTINに関する記述として、最も不適切なものはどれか。",
    choices: [
      "GTINとは、商品・サービスに対して設定するGS1標準の商品識別コードである。",
      "GTINには、JANコードやITFコードが含まれる。",
      "GTINは全部で5種類ある。",
      "GTINは、EDIなどのシステム上での商品識別コードとしても広く利用されている。",
    ],
    answer: 2,
    explanation: `【解答：ウ（選択肢3）】

GTINは全部で「4種類」です（5種類ではありません）。

▼GTINの4種類`,
    explanationTable: {
      headers: ["商品識別コード", "コード数", "別名"],
      rows: [
        ["GTIN-13", "13桁", "JANコード標準タイプ"],
        ["GTIN-8", "8桁", "JANコード短縮タイプ"],
        ["GTIN-12", "12桁", "北米地域で利用されるU.P.C."],
        ["GTIN-14", "14桁", "集合包装用商品コード（ITFコード）"],
      ],
    },
    explanationExtra: `
GTINは、バーコード表示（JAN・ITF等）だけでなく、EDIなどのシステム上での商品識別コードとしても広く利用されます。さらに、GS1-128シンボル、GS1データバー、GS1 QRコード等の属性情報を表示するバーコードや電子タグにも使われています。`,
  },
  {
    id: 18,
    title: "問題18 EDI",
    question: "EDIに関する記述として、最も適切なものはどれか。",
    choices: [
      "VMIとは、POSデータや基準在庫量に基づいて、商品が少なくなったら自動的に発注する、商品補充の仕組みである。",
      "Web-EDIでは、受発注に必要なテキストデータのみしか取り扱うことができない。",
      "XML-EDIは、インターネットの接続環境とWebサーバーを構築すればよいので、比較的安価に導入できる。",
      "Web-EDIでは、社内システムと連携する際に手作業が発生する場合が多く、全体の効率化に結びつかないことがある。",
    ],
    answer: 3,
    explanation: `【解答：エ（選択肢4）】

Web-EDIは取引先ごとに操作画面やフォーマットが異なるため、社内システムとの連携に手作業が発生しやすく、全体の効率化に結びつかないことがあります。

▼インターネットEDIの比較`,
    explanationTable: {
      headers: ["", "Web-EDI", "XML-EDI"],
      rows: [
        ["概要", "インターネットブラウザを使用したEDI", "XMLを利用したEDI。個々のデータに特定の意味を持たせた属性を定義できる"],
        ["メリット", "・回線コストを抑えられる\n・画像データなども送受信しやすい", "・社内システムとの連動や取引の自動化が実現しやすい\n・メッセージの標準化により異なる取引先間でのデータ交換が効率的"],
        ["デメリット", "・取引先ごとに操作画面・フォーマットが異なる\n・社内システムとの連携に手作業が発生しやすく全体効率化に結びつかないことがある", "・ソフト開発が必要なため、Web-EDIより導入コストが高くなる"],
      ],
    },
    explanationExtra: `
▼EDIを利用した商品補充の仕組み（選択肢ア・イの補足）`,
    explanationTable2: {
      headers: ["名称", "概要", "適用"],
      rows: [
        ["CRP（Continuous Replenishment Program）", "自動補充プログラム。POSデータや基準在庫量に基づいて商品が少なくなったら自動的に発注する仕組み（人間が1つ発注する代わり）", "需要の変動が少ない定番品の発注"],
        ["VMI（Vendor Managed Inventory）", "小売側が発注する代わりに、納入業者であるベンダー側が商品を送り込む仕組み。小売店のPOSデータや在庫量をベンダー側にEDIで共有し、ベンダー側が必要量を補充。", "メーカーが小売業者や卸売業者に対して行う例が多い"],
      ],
    },
  },
];

// ============================================================
// Firestore ヘルパー
// ============================================================
async function loadUserData(userId) {
  console.log("[loadUserData] userId:", userId);
  try {
    const ref = doc(db, APP_ID, userId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      console.log("[loadUserData] data found:", snap.data());
      return snap.data();
    } else {
      console.log("[loadUserData] no data, returning empty");
      return { results: {}, flags: {} };
    }
  } catch (e) {
    console.error("[loadUserData] error:", e);
    return { results: {}, flags: {} };
  }
}

async function saveUserData(userId, data) {
  console.log("[saveUserData] userId:", userId, "data:", data);
  try {
    const ref = doc(db, APP_ID, userId);
    await setDoc(ref, data, { merge: true });
    console.log("[saveUserData] saved successfully");
  } catch (e) {
    console.error("[saveUserData] error:", e);
  }
}

// ============================================================
// App
// ============================================================
export default function App() {
  const [screen, setScreen] = useState("login"); // login | start | quiz | result | history
  const [userId, setUserId] = useState("");
  const [userIdInput, setUserIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({}); // { [questionId]: boolean }
  const [flags, setFlags] = useState({});     // { [questionId]: boolean }
  const [mode, setMode] = useState("all");    // all | incorrect | flagged
  const [queue, setQueue] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleLogin = async () => {
    const trimmed = userIdInput.trim();
    if (!trimmed) return;
    setLoading(true);
    console.log("[handleLogin] attempting login with:", trimmed);
    const data = await loadUserData(trimmed);
    setUserId(trimmed);
    setResults(data.results || {});
    setFlags(data.flags || {});
    setLoading(false);
    setScreen("start");
    console.log("[handleLogin] loaded results:", data.results, "flags:", data.flags);
  };

  const startQuiz = (selectedMode) => {
    console.log("[startQuiz] mode:", selectedMode);
    setMode(selectedMode);
    let filtered = [...QUESTIONS];
    if (selectedMode === "incorrect") {
      filtered = QUESTIONS.filter(q => results[q.id] === false);
    } else if (selectedMode === "flagged") {
      filtered = QUESTIONS.filter(q => flags[q.id] === true);
    }
    if (filtered.length === 0) {
      alert("該当する問題がありません。");
      return;
    }
    setQueue(filtered);
    setCurrentIdx(0);
    setSelected(null);
    setShowExplanation(false);
    setScreen("quiz");
  };

  const handleSelect = async (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    const q = queue[currentIdx];
    const isCorrect = idx === q.answer;
    const newResults = { ...results, [q.id]: isCorrect };
    setResults(newResults);
    console.log("[handleSelect] q:", q.id, "selected:", idx, "correct:", isCorrect);
    await saveUserData(userId, { results: newResults, flags });
  };

  const handleFlag = async () => {
    const q = queue[currentIdx];
    const newFlags = { ...flags, [q.id]: !flags[q.id] };
    setFlags(newFlags);
    console.log("[handleFlag] q:", q.id, "flagged:", newFlags[q.id]);
    await saveUserData(userId, { results, flags: newFlags });
  };

  const nextQuestion = () => {
    if (currentIdx + 1 >= queue.length) {
      setScreen("result");
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  const correctCount = queue.filter(q => results[q.id] === true).length;
  const answeredInSession = queue.filter(q => results[q.id] !== undefined).length;

  // ── Login ──
  if (screen === "login") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-slate-700">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">スマート問題集</h1>
            <p className="text-slate-400 text-sm mt-1">3-9 物流と流通情報システム</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                <User className="inline w-4 h-4 mr-1" />
                合言葉（ユーザーID）
              </label>
              <input
                type="text"
                value={userIdInput}
                onChange={e => setUserIdInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="例：my-study-2024"
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500"
              />
              <p className="text-slate-500 text-xs mt-2">
                同じ合言葉をPCとスマホで入力すると学習履歴が同期されます
              </p>
            </div>
            <button
              onClick={handleLogin}
              disabled={loading || !userIdInput.trim()}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  はじめる
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Start ──
  if (screen === "start") {
    const incorrectCount = QUESTIONS.filter(q => results[q.id] === false).length;
    const flaggedCount = QUESTIONS.filter(q => flags[q.id] === true).length;
    const answeredCount = Object.keys(results).length;
    const totalCorrect = Object.values(results).filter(Boolean).length;

    return (
      <div className="min-h-screen bg-slate-900 p-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">3-9 物流と流通情報システム</h1>
            <p className="text-slate-400 text-sm mt-1">ユーザー：{userId}</p>
          </div>

          {answeredCount > 0 && (
            <div className="bg-slate-800 rounded-2xl p-5 mb-6 border border-slate-700">
              <p className="text-slate-300 text-sm font-medium mb-3">学習状況</p>
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-2xl font-bold text-white">{answeredCount}</p>
                  <p className="text-xs text-slate-400">解答済</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{totalCorrect}</p>
                  <p className="text-xs text-slate-400">正解</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-400">{incorrectCount}</p>
                  <p className="text-xs text-slate-400">不正解</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-400">{flaggedCount}</p>
                  <p className="text-xs text-slate-400">要復習</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <button
              onClick={() => startQuiz("all")}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-between px-5"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                すべての問題
              </span>
              <span className="text-blue-200 text-sm">{QUESTIONS.length}問</span>
            </button>
            <button
              onClick={() => startQuiz("incorrect")}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-between px-5 border border-slate-600"
            >
              <span className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                前回不正解の問題のみ
              </span>
              <span className="text-slate-400 text-sm">{QUESTIONS.filter(q => results[q.id] === false).length}問</span>
            </button>
            <button
              onClick={() => startQuiz("flagged")}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-between px-5 border border-slate-600"
            >
              <span className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-yellow-400" />
                要復習の問題のみ
              </span>
              <span className="text-slate-400 text-sm">{QUESTIONS.filter(q => flags[q.id] === true).length}問</span>
            </button>
          </div>

          <button
            onClick={() => setScreen("history")}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-700"
          >
            <List className="w-5 h-5" />
            履歴・復習フラグ一覧
          </button>
        </div>
      </div>
    );
  }

  // ── Quiz ──
  if (screen === "quiz") {
    const q = queue[currentIdx];
    const isCorrect = selected !== null && selected === q.answer;
    const isFlagged = flags[q.id] === true;

    return (
      <div className="min-h-screen bg-slate-900 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setScreen("start")} className="text-slate-400 hover:text-white transition-colors">
              <Home className="w-6 h-6" />
            </button>
            <span className="text-slate-400 text-sm font-medium">
              {currentIdx + 1} / {queue.length}
            </span>
            <button
              onClick={handleFlag}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${isFlagged ? "text-yellow-400" : "text-slate-500 hover:text-yellow-400"}`}
            >
              <Flag className="w-4 h-4" />
              要復習
            </button>
          </div>

          {/* Progress */}
          <div className="w-full bg-slate-700 rounded-full h-1.5 mb-6">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all"
              style={{ width: `${((currentIdx + 1) / queue.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="bg-slate-800 rounded-2xl p-6 mb-4 border border-slate-700">
            <p className="text-blue-400 text-xs font-medium mb-2">{q.title}</p>
            <p className="text-white text-base leading-relaxed whitespace-pre-line">{q.question}</p>
          </div>

          {/* Choices */}
          <div className="space-y-3 mb-4">
            {q.choices.map((choice, idx) => {
              let style = "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700";
              if (selected !== null) {
                if (idx === q.answer) {
                  style = "bg-green-900 border-green-600 text-green-100";
                } else if (idx === selected && idx !== q.answer) {
                  style = "bg-red-900 border-red-600 text-red-100";
                } else {
                  style = "bg-slate-800 border-slate-700 text-slate-500";
                }
              }
              const labels = ["ア", "イ", "ウ", "エ", "オ"];
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={`w-full text-left p-4 rounded-xl border transition-colors ${style} flex items-start gap-3`}
                >
                  <span className="font-bold text-sm shrink-0 w-5">{labels[idx] || (idx + 1) + "."}</span>
                  <span className="text-sm leading-relaxed">{choice}</span>
                  {selected !== null && idx === q.answer && (
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0 ml-auto" />
                  )}
                  {selected !== null && idx === selected && idx !== q.answer && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-auto" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Result badge */}
          {selected !== null && (
            <div className={`rounded-xl p-4 mb-4 border ${isCorrect ? "bg-green-900 border-green-700" : "bg-red-900 border-red-700"}`}>
              <p className={`font-bold text-sm ${isCorrect ? "text-green-300" : "text-red-300"}`}>
                {isCorrect ? "✓ 正解！" : "✗ 不正解"}
              </p>
            </div>
          )}

          {/* Explanation */}
          {showExplanation && (
            <div className="bg-slate-800 rounded-2xl p-6 mb-4 border border-slate-700 space-y-4">
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">{q.explanation}</p>

              {q.explanationTable && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-700">
                        {q.explanationTable.headers.map((h, i) => (
                          <th key={i} className="border border-slate-600 px-3 py-2 text-slate-200 text-left font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {q.explanationTable.rows.map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? "bg-slate-800" : "bg-slate-750"}>
                          {row.map((cell, ci) => (
                            <td key={ci} className="border border-slate-600 px-3 py-2 text-slate-300 whitespace-pre-line">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {q.explanationExtra && (
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{q.explanationExtra}</p>
              )}

              {q.explanationTable2 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-700">
                        {q.explanationTable2.headers.map((h, i) => (
                          <th key={i} className="border border-slate-600 px-3 py-2 text-slate-200 text-left font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {q.explanationTable2.rows.map((row, ri) => (
                        <tr key={ri} className={ri % 2 === 0 ? "bg-slate-800" : "bg-slate-750"}>
                          {row.map((cell, ci) => (
                            <td key={ci} className="border border-slate-600 px-3 py-2 text-slate-300 whitespace-pre-line">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Flag checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={handleFlag}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isFlagged ? "bg-yellow-500 border-yellow-500" : "border-slate-500 group-hover:border-yellow-400"}`}
                >
                  {isFlagged && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <span className="text-slate-300 text-sm">要復習としてマーク</span>
              </label>
            </div>
          )}

          {/* Next */}
          {selected !== null && (
            <button
              onClick={nextQuestion}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {currentIdx + 1 >= queue.length ? "結果を見る" : "次の問題"}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Result ──
  if (screen === "result") {
    const total = queue.length;
    const correct = queue.filter(q => results[q.id] === true).length;
    const pct = Math.round((correct / total) * 100);

    return (
      <div className="min-h-screen bg-slate-900 p-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center py-10">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${pct >= 80 ? "bg-green-600" : pct >= 60 ? "bg-yellow-600" : "bg-red-600"}`}>
              <span className="text-3xl font-bold text-white">{pct}%</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">結果</h2>
            <p className="text-slate-400">{total}問中 {correct}問正解</p>
          </div>

          <div className="space-y-3 mb-8">
            {queue.map(q => {
              const isCorrect = results[q.id] === true;
              const isFlagged = flags[q.id] === true;
              return (
                <div key={q.id} className={`flex items-center gap-3 p-4 rounded-xl border ${isCorrect ? "bg-green-900 border-green-800" : "bg-red-900 border-red-800"}`}>
                  {isCorrect
                    ? <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    : <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  }
                  <span className="text-white text-sm flex-1">{q.title}</span>
                  {isFlagged && <Flag className="w-4 h-4 text-yellow-400 shrink-0" />}
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => startQuiz(mode)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              もう一度
            </button>
            <button
              onClick={() => setScreen("start")}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-600"
            >
              <Home className="w-5 h-5" />
              トップに戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── History ──
  if (screen === "history") {
    return (
      <div className="min-h-screen bg-slate-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setScreen("start")} className="text-slate-400 hover:text-white transition-colors">
              <Home className="w-6 h-6" />
            </button>
            <h2 className="text-white font-bold text-lg">履歴・復習フラグ一覧</h2>
          </div>

          <div className="space-y-2">
            {QUESTIONS.map(q => {
              const r = results[q.id];
              const f = flags[q.id];
              return (
                <div key={q.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center gap-3">
                  <div className="shrink-0">
                    {r === true && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {r === false && <XCircle className="w-5 h-5 text-red-400" />}
                    {r === undefined && <AlertCircle className="w-5 h-5 text-slate-500" />}
                  </div>
                  <span className="text-white text-sm flex-1">{q.title}</span>
                  {f && <Flag className="w-4 h-4 text-yellow-400 shrink-0" />}
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${r === true ? "bg-green-800 text-green-300" : r === false ? "bg-red-800 text-red-300" : "bg-slate-700 text-slate-400"}`}>
                    {r === true ? "正解" : r === false ? "不正解" : "未解答"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}