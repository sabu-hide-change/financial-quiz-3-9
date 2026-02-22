// npm install lucide-react recharts
import React, { useState, useEffect } from 'react';
import { Home, Check, X, ChevronRight, List, BookOpen, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const quizData = [
  {
    id: 1,
    title: "問題1 物流",
    question: "物流に関する記述として、最も不適切なものはどれか。",
    options: [
      "1. 物流の主な機能には、輸送、保管、荷役、包装、流通加工の5つがある。",
      "2. 荷役とは、流通の過程で製品の付加価値を高める作業のことである。",
      "3. 物流の種類には大きく分けて、調達物流、社内物流、販売物流、回収物流がある。",
      "4. 検品を正確かつ高速に行うために、EDIを介してメーカーから事前に送付される出荷明細をASNと呼ぶ。"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: イ (2)</strong></p>
        <p>本問では物流の機能や種類などについて問われています。</p>
        <h4 className="font-bold text-blue-600 border-b pb-1">●物流の機能</h4>
        <p>物流の主な機能には、輸送、保管、荷役、包装、流通加工があり、「物流の5大機能」と呼ばれています。</p>
        <table className="w-full border-collapse border border-gray-300 text-xs mt-2">
          <thead><tr className="bg-gray-100"><th className="border p-1">機能</th><th className="border p-1">内容</th></tr></thead>
          <tbody>
            <tr><td className="border p-1 font-semibold">輸送</td><td className="border p-1">荷物を運ぶこと</td></tr>
            <tr><td className="border p-1 font-semibold">保管</td><td className="border p-1">荷物を一定期間保管すること</td></tr>
            <tr><td className="border p-1 font-semibold">荷役</td><td className="border p-1">輸送機器への積み込み、積み降ろしや、倉庫の入出庫などの作業のこと</td></tr>
            <tr><td className="border p-1 font-semibold">包装</td><td className="border p-1">輸送や保管をするために、荷物を保護すること</td></tr>
            <tr><td className="border p-1 font-semibold">流通加工</td><td className="border p-1">流通の過程で製品の付加価値を高めるような加工をすること（例：値札貼り、小分け、検品など）</td></tr>
          </tbody>
        </table>
        <p className="mt-2"><strong>ア:</strong> 適切。物流の5大機能についての正しい記述です。</p>
        <p><strong>イ (正解):</strong> 不適切。流通の過程で製品の付加価値を高めるような加工を「流通加工」と言います。荷役は積み込み・積み降ろし等の作業です。</p>
        <p><strong>ウ:</strong> 適切。物流の種類（調達・社内・販売・回収）の正しい記述です。</p>
        <p><strong>エ:</strong> 適切。事前出荷明細はASN(Advanced Shipping Notice)と呼ばれます。</p>
      </div>
    )
  },
  {
    id: 2,
    title: "問題2 ロケーション管理",
    question: "物流センター内のロケーション管理に関する記述として、最も不適切なものはどれか。",
    options: [
      "1. 固定ロケーションは、出庫する際に商品を探す時間が短縮できる。",
      "2. 固定ロケーションは、品種が多い場合にスペース効率が悪くなる。",
      "3. フリーロケーションは、商品の収納作業が効率的である。",
      "4. フリーロケーションは、固定ロケーションよりも品種と在庫量が把握しやすい。"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: エ (4)</strong></p>
        <p>ロケーション管理の方法には、固定ロケーションとフリーロケーションがあります。</p>
        <table className="w-full border-collapse border border-gray-300 text-xs mt-2">
          <thead><tr className="bg-gray-100"><th className="border p-1"></th><th className="border p-1">固定ロケーション</th><th className="border p-1">フリーロケーション</th></tr></thead>
          <tbody>
            <tr><td className="border p-1 font-semibold bg-gray-50">方式</td><td className="border p-1">商品の保管場所を固定する</td><td className="border p-1">商品の保管場所を固定しない</td></tr>
            <tr><td className="border p-1 font-semibold bg-gray-50">メリット</td><td className="border p-1">・商品を探す時間が短縮できる<br/>・在庫量が把握しやすい</td><td className="border p-1">・空いている場所に保管でき収納が効率的<br/>・スペースを有効活用できる</td></tr>
            <tr><td className="border p-1 font-semibold bg-gray-50">デメリット</td><td className="border p-1">・スペースを有効活用できない<br/>・取扱商品が変わると保管場所の設定作業が増える</td><td className="border p-1">・システムがないと探すムダが増える<br/>・システムがないと在庫量の把握が難しい</td></tr>
          </tbody>
        </table>
        <p className="mt-2"><strong>ア, イ, ウ:</strong> 適切。それぞれのロケーションの特徴を表しています。</p>
        <p><strong>エ (正解):</strong> 不適切。フリーロケーションは保管場所が固定されていないため、同じ品種が分散して保管されることもあり、固定ロケーションに比べて品種と在庫量が把握しにくくなります。</p>
      </div>
    )
  },
  {
    id: 3,
    title: "問題3 ピッキング作業",
    question: "物流センター内で行われるピッキング作業に関する記述として、最も適切なものはどれか。",
    options: [
      "1. バッチピッキングは、多品種少量の品目を、多くの小売店に出荷する場合に適している。",
      "2. トータルピッキングは、いくつかの小売店に、特定の少量品目を大量に出荷する場合に適している。",
      "3. シングルピッキングは、ピッキング後の仕分け作業が必要になるため、出荷品目が多い場合には適さない。",
      "4. 種まき方式は、オーダー毎にピッキングするため、移動距離が長くなる傾向にある。",
      "5. 品種別ピッキングは、複数の作業者が作業範囲を分担し、コンテナを中継しながらピッキング作業を完結する方式である。"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: イ (2)</strong></p>
        <p>ピッキングには「種まき方式」と「摘み取り方式」の2種類があります。</p>
        <table className="w-full border-collapse border border-gray-300 text-xs mt-2">
          <thead><tr className="bg-gray-100"><th className="border p-1"></th><th className="border p-1">種まき方式</th><th className="border p-1">摘み取り方式</th></tr></thead>
          <tbody>
            <tr><td className="border p-1 font-semibold bg-gray-50">別名</td><td className="border p-1">トータルピッキング / バッチピッキング</td><td className="border p-1">シングルピッキング / オーダーピッキング</td></tr>
            <tr><td className="border p-1 font-semibold bg-gray-50">適した商品</td><td className="border p-1">品種が少なく、1品あたりの出荷量が多い商品</td><td className="border p-1">品種が多く、1品あたりの出荷量が少ない商品</td></tr>
          </tbody>
        </table>
        <p className="mt-2"><strong>ア:</strong> 不適切。「多品種少量の品目を多くの小売店別に仕分け」する場合は、摘み取り方式の方が適しています。</p>
        <p><strong>イ (正解):</strong> 適切。トータルピッキングは1度のピッキングで複数オーダーに対応します。品目が少量であれば仕分けも簡単に行えるため、トータル移動量を少なくした方が効率的です。</p>
        <p><strong>ウ:</strong> 不適切。シングルピッキングはオーダー単位で行うため、ピッキング後の仕分け作業は必要ありません。</p>
        <p><strong>エ:</strong> 不適切。オーダー毎にピッキングするのは「摘み取り方式」です。</p>
        <p><strong>オ:</strong> 不適切。記述の内容は「リレー式ピッキング」に関するものです。</p>
      </div>
    )
  },
  {
    id: 4,
    title: "問題4 一括物流",
    question: "一括物流に関する記述として、最も不適切なものはどれか。",
    options: [
      "1. 一括物流により、小売店舗におけるカテゴリーマネジメントが実現しやすくなる。",
      "2. 一括物流により、小売店舗側での検品の負荷を減らすことができる。",
      "3. 一括物流センターには、在庫を持つTC型と、在庫をもたないDC型の2種類がある。",
      "4. 通過型センターには、ベンダー仕分型とセンター仕分け型の2種類がある。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: ウ (3)</strong></p>
        <p>複数のメーカーの商品を一括して小売店に配送することを一括物流と呼びます。</p>
        <ul className="list-disc pl-5">
          <li><strong>在庫型センター (DC型)</strong>: センター内に在庫を持ち、要求に応じてピッキングや仕分けを行う。</li>
          <li><strong>通過型センター (TC型)</strong>: センター内で在庫を持たず、ベンダーから納入された商品に必要最低限の作業のみ行いすぐ配送する。</li>
        </ul>
        <p className="mt-2"><strong>ア, イ, エ:</strong> 適切。一括物流のメリットおよび通過型センターの分類に関する正しい記述です。</p>
        <p><strong>ウ (正解):</strong> 不適切。在庫を持つのは「DC型」、在庫を持たないのが「TC型」です。説明が逆になっています。</p>
      </div>
    )
  },
  {
    id: 5,
    title: "問題5 一括物流センター",
    question: "一括物流センターの特徴に関する記述として、最も適切なものはどれか。",
    options: [
      "1. 在庫型センターは、納品された商品をいったん保管し、発注があるとピッキングや仕分けを行って店舗へ出荷する。",
      "2. 在庫型センターは、通過型センターに比べて、商品を発注してから店舗に納品されるまでのリードタイムが長くなる。",
      "3. 通過型センターには、センター内で店別に仕分けを行うベンダー仕分型と、事前に店別に仕分けされるセンター仕分型がある。",
      "4. 通過型センターは、在庫を持たないため、カテゴリー納品に対応しやすい。"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: ア (1)</strong></p>
        <p><strong>ア (正解):</strong> 適切。在庫型センター(DC型)の特徴を正しく説明しています。</p>
        <p><strong>イ:</strong> 不適切。在庫型センターは在庫がある商品はすぐに出庫できるため、通過型(TC型)に比べてリードタイムは短くなります。</p>
        <p><strong>ウ:</strong> 不適切。説明が逆です。納品するベンダーが事前に仕分けするのが「ベンダー仕分型」、センター内で仕分けするのが「センター仕分型」です。</p>
        <p><strong>エ:</strong> 不適切。通過型センターでは、カテゴリー納品に対応しにくいというデメリットがあります。特にベンダー仕分型では仕分けし直す手間がかかります。</p>
      </div>
    )
  },
  {
    id: 6,
    title: "問題6 共同物流",
    question: "共同物流に関する記述として、最も適切なものはどれか。",
    options: [
      "1. 共同物流の推進により、物流事業者は減少する傾向にある。",
      "2. 共同物流では、物流サービスのレベルは低下する傾向にある。",
      "3. 共同物流では、小売店からの急な納品依頼にも柔軟に対応しやすい。",
      "4. 共同物流の推進により、荷主側の物流コストは増える傾向にある。"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: ア (1)</strong></p>
        <p>共同物流は、物流を効率化するために複数の事業者が共同で物流を行うことです。</p>
        <p><strong>ア (正解):</strong> 適切。共同物流を推進した場合、対応できる事業者が選択され依頼が集約されるため、物流事業者は減少する傾向となります。</p>
        <p><strong>イ:</strong> 不適切。小売店側の受入作業の回数を減らすことができるため、物流のサービスレベルは高くなる傾向となります。</p>
        <p><strong>ウ:</strong> 不適切。複数の事業者の荷物をまとめて配達するため、個別・急な納品依頼に対応するのは難しくなります。</p>
        <p><strong>エ:</strong> 不適切。運送コストを事業者間で分担できるため、物流コストは減る傾向になります。</p>
      </div>
    )
  },
  {
    id: 7,
    title: "問題7 トラック運送の生産性指標",
    question: "トラック運送の生産性指標に関する説明として、最も不適切なものはどれか。",
    options: [
      "1. トラックが走行した距離のうち、貨物を輸送した距離の割合を表したものが、実車率 (距離あたり)である。",
      "2. トラックが稼働していた時間のうち、貨物を運んで走行していた時間の割合を表したものが、実車率(時間あたり)である。",
      "3. 運行可能なトラックの総車両数のうち、貨物を運んで走行していた車両数の割合を表したものが、実働率である。",
      "4. トラックの輸送能力に対する実際の輸送活動の割合を表したものが、積載率である。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: ウ (3)</strong></p>
        <p><strong>ア, イ, エ:</strong> 適切。それぞれの指標の正しい説明です。</p>
        <p><strong>ウ (正解):</strong> 不適切。実働率とは、調査期間中にあった車両数のうち、何両が輸送のために走行したかを「延日数」による割合で表した指標です。総車両数に対する割合ではありません。</p>
      </div>
    )
  },
  {
    id: 8,
    title: "問題8 トレーサビリティ",
    question: "トレーサビリティに関する記述として、最も不適切なものはどれか。",
    options: [
      "1. トレーサビリティを導入しても、商品の安全管理を直接的に行うことはできない。",
      "2. トレーサビリティを構築するためには、商品にシリアルナンバーなどの管理番号を付与する必要がある。",
      "3. トレーサビリティを行うことで、問題発生時に迅速に流通経路を特定することができるが、原材料まで特定するのは難しい。",
      "4. トレーサビリティを導入することによって、情報の信頼性を向上することができる。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: ウ (3)</strong></p>
        <p><strong>ア, イ, エ:</strong> 適切。トレーサビリティの性質と導入目的（情報の信頼性向上など）を正しく説明しています。</p>
        <p><strong>ウ (正解):</strong> 不適切。トレーサビリティを行うことで、流通経路の特定の他、使用している「原材料を特定することも可能」です。</p>
      </div>
    )
  },
  {
    id: 9,
    title: "問題9 モーダルシフト",
    question: "モーダルシフトに関する記述として、最も不適切なものはどれか。",
    options: [
      "1. モーダルシフトにより、長距離区間の一括大量輸送が可能になり、コスト削減につながる。",
      "2. モーダルシフトのデメリットとして、貨物の積み直しや遠回りの輸配送になることに伴うリードタイムの長期化が挙げられる。",
      "3. モーダルシフトとは、一般的には鉄道や船舶による輸送から、トラック等による輸送に転換することを指す。",
      "4. モーダルシフトにより、二酸化炭素の排出抑制や騒音低減など、環境面への配慮に寄与する。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: ウ (3)</strong></p>
        <p><strong>ア, イ, エ:</strong> 適切。モーダルシフトのメリット（コスト削減、環境配慮）とデメリット（積み替えによるリードタイムの長期化）の正しい説明です。</p>
        <p><strong>ウ (正解):</strong> 不適切。モーダルシフトとは、一般的には「トラック等による輸送から、鉄道や船舶による輸送に転換すること」を指します。逆になっています。</p>
      </div>
    )
  },
  {
    id: 10,
    title: "問題10 物品の輸送手段",
    question: "物品の輸送手段等に関する記述として、最も不適切なものはどれか。",
    options: [
      "1. RORO船とは、貨物を積載したトラックを車体ごと船内に収納して、輸送する船舶のことである。",
      "2. RORO船は、港から港までトラックのまま輸送できるため、荷役時間を大幅に短縮できる。",
      "3. ユニットロードとは、コンテナやパレットなどを使用し、複数の貨物をひとまとめにしたものである。",
      "4. 3PL 事業者とは、自社で倉庫や車両などの物流資産を保有せず、物流戦略の企画等を受託する事業者であり、資産保有者は3PLと呼ばない。"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: エ (4)</strong></p>
        <p><strong>ア, イ, ウ:</strong> 適切。RORO船、ユニットロードに関する正しい記述です。</p>
        <p><strong>エ (正解):</strong> 不適切。3PL事業者には、自社で物流資産を持つ「アセット型」と、資産を持たない「ノンアセット型」の両方が存在します。</p>
      </div>
    )
  },
  {
    id: 11,
    title: "問題11 パレット",
    question: "パレットに関する記述として、最も不適切なものはどれか。",
    options: [
      "1. パレチゼーションとは、荷物をパレットに載せて、そのまま荷役や輸送、保管などの物流を行うことである。",
      "2. 荷物を出発地から到着地まで輸送手段に適したパレットに載せ替えながら、輸送・保管することを一貫パレチゼーションという。",
      "3. ワンウェイパレットとは、一回限りの使い捨てのパレットのことである。",
      "4. ロールボックスパレットは、かご形状のキャスター付きパレットで、荷物を積み重ねて大量運搬することができる。"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: イ (2)</strong></p>
        <p><strong>ア, ウ, エ:</strong> 適切。パレチゼーション、ワンウェイパレット、ロールボックスパレットの正しい記述です。</p>
        <p><strong>イ (正解):</strong> 不適切。一貫パレチゼーションとは、出発地から到着地まで「同一のパレットに乗せたまま（載せ替えずに）」輸送・保管することをいいます。</p>
      </div>
    )
  },
  {
    id: 12,
    title: "問題12 POSシステム 1",
    question: "POSシステムの導入効果に関する記述として、最も適切なものはどれか。",
    options: [
      "1. POSシステムを導入するだけで、受発注業務の効率化が期待できる。",
      "2. POSレジスタを導入することで、従業員による不正防止がしやすくなる。",
      "3. POSレジスタは、商品のバーコードに含まれる価格情報を読み取ることで精算を行う。",
      "4. POSシステムを導入することで、個人情報の保護が可能となる。"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: イ (2)</strong></p>
        <p><strong>ア:</strong> 不適切。導入するだけでは受発注業務の効率化はできません。発注・在庫管理システムと連動させる必要があります。</p>
        <p><strong>イ (正解):</strong> 適切。操作者や取引内容が記録されるため、不正が防止しやすくなります。</p>
        <p><strong>ウ:</strong> 不適切。一般的なバーコード(JANコード)には価格情報は含まれておらず、ストアコントローラーから取得するPLU(Price Look Up)を行います。</p>
        <p><strong>エ:</strong> 不適切。POSシステム自体で個人情報保護が可能となるわけではありません。</p>
      </div>
    )
  },
  {
    id: 13,
    title: "問題13 POSシステム 2",
    question: "POS データの分析と活用に関する記述として、最も不適切なものはどれか。",
    options: [
      "1. POS データのバスケット分析を行うことで、関連購買比率や、セット販売の有効性を把握し、効果的な陳列や販売促進が可能となる。",
      "2. 商品の陳列位置やフェイス数を変えた際に、POSデータの分析を行うことで、効果的なプラノグラムを実現できる。",
      "3. 商品別の売上や粗利益を基準に、POSデータのABC分析を行うことで、「売れ筋商品」や「死に筋商品」を明確にすることができる。",
      "4. POS データを分析して、どのような顧客がどのような商品を購入しているか把握することで、ストアコンセプトを設定しやすくなる。"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: エ (4)</strong></p>
        <p><strong>ア, イ, ウ:</strong> 適切。バスケット分析、プラノグラム、ABC分析の正しい説明です。</p>
        <p><strong>エ (正解):</strong> 不適切。POSシステムだけでは「誰に」という個人情報(顧客の属性情報)までは分かりません。会員カード等で取得した顧客データと組み合わせることで可能となります。</p>
      </div>
    )
  },
  {
    id: 14,
    title: "問題14 個人情報保護法",
    question: "個人情報保護法に定める「個人情報」の組み合わせとして、最も適切なものを下記の解答群から選べ。\na. 生存している、地震被災者個人の氏名などの情報\nb. 従業員の住所録を家族構成ごと市区町村ごとに集計し、家族構成と市区町村だけを記載した集計情報\nc. 従業員の人事考課情報\nd. 取引先企業の一覧情報",
    options: [
      "1. aとb",
      "2. aとc",
      "3. bとd",
      "4. bとc",
      "5. cとd"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: イ (2)</strong></p>
        <p><strong>a:</strong> 該当する。生存する個人に関する情報であり、特定の個人を特定できます。</p>
        <p><strong>b:</strong> 該当しない。特定の個人を識別できない「統計情報」に該当します。</p>
        <p><strong>c:</strong> 該当する。業績等の評価情報は個人情報に該当します。</p>
        <p><strong>d:</strong> 該当しない。法人の情報は個人情報ではありません。</p>
        <p>よって、aとcの組み合わせが適切です。</p>
      </div>
    )
  },
  {
    id: 15,
    title: "問題15 JANコード",
    question: "JANコードに関する記述として、最も適切なものはどれか。",
    options: [
      "1. メーカーで印刷する JANコードには通常、価格情報は含まれていない。",
      "2. 小売業が独自に商品に印刷する JANコードを、ソースマーキングと呼ぶ。",
      "3. メーカーで用いるJANコードの先頭2桁は、その製品の原産国を表している。",
      "4. インストアマーキングには、価格情報を含まない NonPLUタイプと、価格情報を含むPLUタイプがある。"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: ア (1)</strong></p>
        <p><strong>ア (正解):</strong> 適切。メーカーで行うソースマーキングには原則価格情報は含まれていません(小売店が独自に価格設定を行うため)。</p>
        <p><strong>イ:</strong> 不適切。小売業が独自に付けるコードは「インストアマーキング」と呼ばれます。</p>
        <p><strong>ウ:</strong> 不適切。先頭2桁は原産国ではなく、商品の供給責任者の「国番号」を表します。</p>
        <p><strong>エ:</strong> 不適切。価格情報を持たないのがPLUタイプ、価格情報を持つのがNonPLUタイプです。説明が逆です。</p>
      </div>
    )
  },
  {
    id: 16,
    title: "問題16 バーコード",
    question: "次に示すコードの名称と内容について、最も適切なものの組み合せを下記の解答群から選べ。\na. GS1-128: 企業間取引で使用する国際標準の事業所コード\nb. GTIN: 企業間取引で使用する標準的な商品コード\nc. GLN: 企業間で商品マスター情報を標準化し、共有する仕組み\nd. GDS: JANコードやITF で表示できなかった多様な表示をできるコード\ne. ITF: 物流梱包外装などに表示されるコード",
    options: [
      "1. aとb",
      "2. aとd",
      "3. bとe",
      "4. cとd",
      "5. eとc"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: ウ (3)</strong></p>
        <p><strong>a:</strong> 不適切。記述は「GLN」に関する内容です。</p>
        <p><strong>b:</strong> 適切。GTINは国際間の標準的な商品コードです。</p>
        <p><strong>c:</strong> 不適切。記述は「GDS」に関する内容です。</p>
        <p><strong>d:</strong> 不適切。記述は「GS1-128」に関する内容です。</p>
        <p><strong>e:</strong> 適切。ITFは物流梱包の段ボールなどの外装に表示されるバーコードです。</p>
        <p>よって、bとeの組み合わせが正解です。</p>
      </div>
    )
  },
  {
    id: 17,
    title: "問題17 GTIN",
    question: "GTIN に関する記述として、最も不適切なものはどれか。",
    options: [
      "1. GTINとは、商品・サービスに対して設定する GS1 標準の商品識別コードである。",
      "2. GTINには、JANコードやITF コードが含まれる。",
      "3. GTIN は全部で5種類ある。",
      "4. GTINは、EDIなどのシステム上での商品識別コードとしても広く利用されている。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: ウ (3)</strong></p>
        <p><strong>ア, イ, エ:</strong> 適切。GTINの定義、含まれるコード、利用範囲についての正しい説明です。</p>
        <p><strong>ウ (正解):</strong> 不適切。GTINは全部で「4種類」です。(GTIN-13, GTIN-8, GTIN-12, GTIN-14)。</p>
      </div>
    )
  },
  {
    id: 18,
    title: "問題18 EDI",
    question: "EDIに関する記述として、最も適切なものはどれか。",
    options: [
      "1. VMIとは、POSデータや基準在庫量に基づいて、商品が少なくなったら自動的に発注する、商品補充の仕組みである。",
      "2. Web-EDIでは、受発注に必要なテキストデータのみしか取り扱うことができない。",
      "3. XML-EDIは、インターネットの接続環境と Web サーバーを構築すればよいので、比較的安価に導入できる。",
      "4. Web-EDIでは、社内システムと連携する際に手作業が発生する場合が多く、全体の効率化に結びつかないことがある。"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-3 text-sm">
        <p><strong>解答: エ (4)</strong></p>
        <p><strong>ア:</strong> 不適切。記述は「CRP(Continuous Replenishment Program)」に関する内容です。VMIはベンダー主導の在庫管理です。</p>
        <p><strong>イ:</strong> 不適切。Web-EDIではテキストデータだけでなく画像データなども取り扱うことができます。</p>
        <p><strong>ウ:</strong> 不適切。XML-EDIはソフトウェア開発が必要なため、Web-EDIに比べて導入コストが高くなります。</p>
        <p><strong>エ (正解):</strong> 適切。取引先ごとに独自のWeb-EDIを導入していることが多く、フォーマットが異なるため手作業が発生しやすいデメリットがあります。</p>
      </div>
    )
  }
];

export default function App() {
  const [appState, setAppState] = useState('home'); // 'home', 'quiz', 'history'
  const [quizMode, setQuizMode] = useState('all'); // 'all', 'incorrect', 'review'
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [history, setHistory] = useState([]);
  const [reviewFlags, setReviewFlags] = useState({});

  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('quiz_history_3_9')) || [];
      const savedReview = JSON.parse(localStorage.getItem('quiz_review_3_9')) || {};
      setHistory(Array.isArray(savedHistory) ? savedHistory : []);
      setReviewFlags(typeof savedReview === 'object' ? savedReview : {});
    } catch (e) {
      console.error('Failed to load local data', e);
      setHistory([]);
      setReviewFlags({});
    }
  }, []);

  const saveHistory = (newHistory) => {
    try {
      localStorage.setItem('quiz_history_3_9', JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (e) {
      console.error('Failed to save history', e);
    }
  };

  const toggleReviewFlag = (id) => {
    const newFlags = { ...reviewFlags, [id]: !reviewFlags?.[id] };
    try {
      localStorage.setItem('quiz_review_3_9', JSON.stringify(newFlags));
      setReviewFlags(newFlags);
    } catch (e) {
      console.error('Failed to save review flag', e);
    }
  };

  const startQuiz = (mode) => {
    let filtered = quizData;
    if (mode === 'incorrect') {
      filtered = quizData.filter(q => {
        const lastRecord = history?.find(h => h.questionId === q.id);
        return lastRecord && !lastRecord.isCorrect;
      });
    } else if (mode === 'review') {
      filtered = quizData.filter(q => reviewFlags?.[q.id]);
    }

    if (filtered.length === 0) {
      alert('該当する問題がありません！');
      return;
    }

    setQuizMode(mode);
    setCurrentQuestions(filtered);
    setCurrentIndex(0);
    setShowExplanation(false);
    setSelectedOption(null);
    setAppState('quiz');
  };

  const handleAnswer = (index) => {
    if (showExplanation) return;
    
    setSelectedOption(index);
    setShowExplanation(true);
    
    const currentQ = currentQuestions?.[currentIndex];
    const isCorrect = index === currentQ.correctIndex;
    
    const existingIndex = history?.findIndex(h => h.questionId === currentQ.id);
    let newHistory = [...(history || [])];
    
    if (existingIndex >= 0) {
      newHistory[existingIndex] = { questionId: currentQ.id, isCorrect, timestamp: Date.now() };
    } else {
      newHistory.push({ questionId: currentQ.id, isCorrect, timestamp: Date.now() });
    }
    
    saveHistory(newHistory);
  };

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
      setSelectedOption(null);
    } else {
      setAppState('history');
    }
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">スマート問題集</h1>
        <p className="text-gray-500">3-9 物流と流通情報システム (全{quizData.length}問)</p>
      </div>

      <div className="flex flex-col w-full max-w-md space-y-4">
        <button 
          onClick={() => startQuiz('all')}
          className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-xl shadow hover:bg-blue-700 transition"
        >
          <div className="flex items-center space-x-3">
            <BookOpen size={24} />
            <span className="font-semibold text-lg">すべての問題に挑戦</span>
          </div>
          <ChevronRight />
        </button>

        <button 
          onClick={() => startQuiz('incorrect')}
          className="flex items-center justify-between bg-orange-500 text-white p-4 rounded-xl shadow hover:bg-orange-600 transition"
        >
          <div className="flex items-center space-x-3">
            <X size={24} />
            <span className="font-semibold text-lg">前回不正解の問題のみ</span>
          </div>
          <ChevronRight />
        </button>

        <button 
          onClick={() => startQuiz('review')}
          className="flex items-center justify-between bg-purple-600 text-white p-4 rounded-xl shadow hover:bg-purple-700 transition"
        >
          <div className="flex items-center space-x-3">
            <AlertCircle size={24} />
            <span className="font-semibold text-lg">要復習の問題のみ</span>
          </div>
          <ChevronRight />
        </button>

        <button 
          onClick={() => setAppState('history')}
          className="flex items-center justify-between bg-gray-100 text-gray-700 border-2 border-gray-300 p-4 rounded-xl hover:bg-gray-200 transition"
        >
          <div className="flex items-center space-x-3">
            <List size={24} />
            <span className="font-semibold text-lg">学習履歴を確認</span>
          </div>
          <ChevronRight />
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const currentQ = currentQuestions?.[currentIndex];
    if (!currentQ) return null;

    return (
      <div className="max-w-3xl mx-auto p-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            {currentIndex + 1} / {currentQuestions.length}問
          </span>
          <button onClick={() => setAppState('home')} className="text-gray-500 hover:text-gray-700">
            <Home size={24} />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">{currentQ.title}</h2>
          <p className="text-gray-800 text-lg whitespace-pre-wrap leading-relaxed">{currentQ.question}</p>
        </div>

        <div className="space-y-3 mb-8">
          {currentQ.options?.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOption = idx === currentQ.correctIndex;
            
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all flex items-start space-x-3 ";
            
            if (!showExplanation) {
              btnClass += "border-gray-200 hover:border-blue-400 hover:bg-blue-50 bg-white";
            } else {
              if (isCorrectOption) {
                btnClass += "border-green-500 bg-green-50";
              } else if (isSelected && !isCorrectOption) {
                btnClass += "border-red-500 bg-red-50";
              } else {
                btnClass += "border-gray-200 bg-gray-50 opacity-50";
              }
            }

            return (
              <button 
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showExplanation}
                className={btnClass}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {showExplanation && isCorrectOption && <Check className="text-green-500" size={20} />}
                  {showExplanation && isSelected && !isCorrectOption && <X className="text-red-500" size={20} />}
                  {(!showExplanation || (!isCorrectOption && !isSelected)) && <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
                </div>
                <span className="text-gray-700 leading-snug">{option}</span>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-4 rounded-t-xl text-white font-bold flex items-center space-x-2 ${selectedOption === currentQ.correctIndex ? 'bg-green-500' : 'bg-red-500'}`}>
              {selectedOption === currentQ.correctIndex ? <Check size={24}/> : <X size={24}/>}
              <span className="text-xl">{selectedOption === currentQ.correctIndex ? '正解！' : '不正解...'}</span>
            </div>
            <div className="bg-white border-x border-b border-gray-200 rounded-b-xl p-6 shadow-sm">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-lg font-bold text-gray-800">解説</h3>
                <label className="flex items-center space-x-2 cursor-pointer bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200 hover:bg-purple-100 transition">
                  <input 
                    type="checkbox" 
                    checked={!!reviewFlags?.[currentQ.id]} 
                    onChange={() => toggleReviewFlag(currentQ.id)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-purple-800 font-semibold text-sm">要復習リストに追加</span>
                </label>
              </div>
              <div className="text-gray-700 leading-relaxed">
                {currentQ.explanation}
              </div>
            </div>
            
            <button 
              onClick={handleNext}
              className="mt-6 w-full bg-blue-600 text-white font-bold text-lg p-4 rounded-xl shadow-md hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <span>{currentIndex < currentQuestions.length - 1 ? '次の問題へ' : '結果を見る'}</span>
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderHistory = () => {
    const totalQuestions = quizData.length;
    const answeredCount = history?.length || 0;
    const correctCount = history?.filter(h => h.isCorrect).length || 0;
    const incorrectCount = answeredCount - correctCount;

    const chartData = [
      { name: '正解', value: correctCount, color: '#22c55e' },
      { name: '不正解', value: incorrectCount, color: '#ef4444' },
      { name: '未解答', value: totalQuestions - answeredCount, color: '#e5e7eb' },
    ];

    return (
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <List className="text-blue-600" />
            <span>学習履歴</span>
          </h2>
          <button onClick={() => setAppState('home')} className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
            <Home size={20} />
            <span className="font-semibold">ホームに戻る</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">全体正答率</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center font-bold text-3xl text-gray-800">
              {answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0}%
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-center space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-gray-500 font-semibold">解答済みの問題</span>
              <span className="text-2xl font-bold">{answeredCount} <span className="text-sm text-gray-400">/ {totalQuestions}</span></span>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-green-500 font-semibold flex items-center space-x-1"><Check size={18}/> <span>正解数</span></span>
              <span className="text-2xl font-bold text-green-600">{correctCount}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-red-500 font-semibold flex items-center space-x-1"><X size={18}/> <span>不正解数</span></span>
              <span className="text-2xl font-bold text-red-600">{incorrectCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-500 font-semibold flex items-center space-x-1"><AlertCircle size={18}/> <span>要復習リスト</span></span>
              <span className="text-2xl font-bold text-purple-600">{Object.values(reviewFlags || {}).filter(Boolean).length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 font-semibold text-gray-600 w-16 text-center">No.</th>
                <th className="p-4 font-semibold text-gray-600">問題名</th>
                <th className="p-4 font-semibold text-gray-600 text-center w-24">状態</th>
                <th className="p-4 font-semibold text-gray-600 text-center w-24">要復習</th>
              </tr>
            </thead>
            <tbody>
              {quizData.map((q, idx) => {
                const record = history?.find(h => h.questionId === q.id);
                const isReview = !!reviewFlags?.[q.id];
                return (
                  <tr key={q.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                    <td className="p-4 text-center text-gray-500">{idx + 1}</td>
                    <td className="p-4 font-medium text-gray-800">{q.title}</td>
                    <td className="p-4 text-center">
                      {!record ? (
                        <span className="text-gray-300">-</span>
                      ) : record.isCorrect ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600"><Check size={18} /></span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600"><X size={18} /></span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => toggleReviewFlag(q.id)}
                        className={`p-2 rounded-lg transition ${isReview ? 'bg-purple-100 text-purple-600' : 'text-gray-300 hover:bg-gray-100 hover:text-gray-500'}`}
                      >
                        <AlertCircle size={20} className={isReview ? "fill-current" : ""} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-blue-200">
      {appState === 'home' && renderHome()}
      {appState === 'quiz' && renderQuiz()}
      {appState === 'history' && renderHistory()}
    </div>
  );
}