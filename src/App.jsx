// npm install lucide-react recharts

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, 
  List, 
  Check, 
  X, 
  ChevronRight, 
  Play, 
  RefreshCw, 
  AlertCircle,
  Bookmark
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';

// --- データ定義 ---
const quizData = [
  {
    id: 1,
    title: "コンピュータの5大装置",
    text: "コンピュータの5大装置に関する次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\nコンピュータのハードウェアには、5種類の装置がある。それは、入力装置、出力装置、記憶装置、（　Ａ　）、（　Ｂ　）である。\n記憶装置は、データを保存しておくための装置であり、 （　Ｃ　）であるハードディスクなどや、（　Ｄ　）であるメモリがある。\n（　Ａ　）の指示により、記憶装置に格納されているデータが（　Ｂ　）に転送されて処理される。その結果は再び記憶装置に転送された後、出力装置に転送されてディスプレイなどに表示される。",
    options: [
      "Ａ：制御装置　Ｂ：演算装置　Ｃ：主記憶装置　Ｄ：補助記憶装置",
      "Ａ：演算装置　Ｂ：制御装置　Ｃ：主記憶装置　Ｄ：補助記憶装置",
      "Ａ：制御装置　Ｂ：演算装置　Ｃ：補助記憶装置　Ｄ：主記憶装置",
      "Ａ：演算装置　Ｂ：制御装置　Ｃ：補助記憶装置　Ｄ：主記憶装置"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問ではコンピュータの5大装置について問われています。</li>
            <li>コンピュータの5大装置とは、ハードウェアを構成する要素であり、入力装置、出力装置、記憶装置、演算装置、制御装置のことを言います。</li>
            <li>入力装置は、キーボードやマウスなど、コンピュータにデータやプログラムなどを入力する装置です。</li>
            <li>出力装置は、ディスプレイやプリンタなど、コンピュータで処理された結果を表示する装置です。</li>
            <li>記憶装置は、データを保存しておくための装置であり、主記憶装置であるメモリや、補助記憶装置であるハードディスクなどがあります。</li>
            <li>演算装置は、四則演算や比較演算などの演算を行う装置です。</li>
            <li>制御装置は、プログラムに従って他の装置に命令を出す装置です。</li>
            <li>入力装置から入力されたデータは、記憶装置に保存されます。記憶装置に保存されたデータは、演算装置に転送されて処理されます。演算結果は再び記憶装置に格納された後、出力装置に送られて表示されます。これらの命令は制御装置が行っています。</li>
            <li>各装置の概要だけではなく、それぞれの関係も覚えておきましょう。</li>
          </ul>
        </div>
        
        <div className="border p-4 bg-white rounded flex flex-col items-center">
          <h4 className="font-bold mb-4">◆コンピュータの5大装置</h4>
          <div className="border-2 border-gray-300 p-2 text-center w-48 mb-4 shadow-sm bg-gray-50">
            <div className="font-bold">制御装置・演算装置</div>
            <div className="text-blue-600 font-bold">CPU</div>
          </div>
          <div className="text-orange-500 font-bold text-2xl">↕</div>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="border-2 border-gray-300 p-2 text-center w-40 shadow-sm bg-gray-50">
              <div className="font-bold">入力装置</div>
              <div className="text-blue-600 text-sm">キーボード・マウス</div>
            </div>
            <div className="text-orange-500 font-bold text-2xl">→</div>
            <div className="border-2 border-gray-300 p-2 text-center w-40 shadow-sm bg-gray-50">
              <div className="font-bold">記憶装置</div>
              <div className="text-blue-600 text-sm">メモリ（主記憶）</div>
            </div>
            <div className="text-orange-500 font-bold text-2xl">→</div>
            <div className="border-2 border-gray-300 p-2 text-center w-40 shadow-sm bg-gray-50">
              <div className="font-bold">出力装置</div>
              <div className="text-blue-600 text-sm">ディスプレイ</div>
            </div>
          </div>
          <div className="text-orange-500 font-bold text-2xl">↕</div>
          <div className="border-2 border-gray-300 p-2 text-center w-48 shadow-sm bg-gray-50">
            <div className="text-blue-600 text-sm font-bold">ハードディスク</div>
            <div className="text-blue-600 text-sm">（補助記憶）</div>
          </div>
        </div>

        <div>
          <p><strong>Ａ：制御装置、Ｂ：演算装置</strong><br/>制御装置は、プログラムに従って他の装置に命令を出す装置です。演算装置は、その名の通り、四則演算や論理演算などの演算を行う装置です。制御装置からの命令により、記憶装置からデータが取り出されて、演算装置で計算が実行されます。</p>
          <p className="mt-2"><strong>Ｃ：補助記憶装置、Ｄ：主記憶装置</strong><br/>記憶装置には主記憶装置と補助記憶装置に分けられます。主記憶装置はメモリと言われるもので、パソコン上で実行するプログラムやデータを一時的に記憶します。主記憶装置は高速ですが、記憶容量が小さく、電源を切ると記憶した内容が失われてしまうという特徴があります。補助記憶装置はハードディスクやDVDなどであり、プログラムやデータを保存します。主記憶装置に比べると低速ですが、記憶容量が大きく、電源を落としても記録したデータを保持できるという特徴があります。</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "CPU",
    text: "PCの処理能力に関する次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\nCPUはクロック周波数に合わせて動作している。クロック周波数が （　Ａ　）のCPUより（　Ｂ　）のCPUの方が処理速度が速い。\nCPUが演算を行うときに、CPU内部でデータを一時的に格納しておく場所を（　Ｃ　）と呼ぶ。（　Ｃ　）の容量は（　Ｄ　）で表され、一般的に容量が大きくなるほど、CPUの処理速度は高速になる。",
    options: [
      "Ａ：1GHz　Ｂ：500MHz　Ｃ：キャッシュ　Ｄ：bps",
      "Ａ：500MHz　Ｂ：1GHz　Ｃ：レジスタ　Ｄ：bit",
      "Ａ：1GHz　Ｂ：500MHz　Ｃ：レジスタ　Ｄ：bit",
      "Ａ：500MHz　Ｂ：1GHz　Ｃ：キャッシュ　Ｄ：bps"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要です！</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問ではCPUについて問われています。</li>
            <li>CPU（Central Processing Unit：中央演算処理装置）は、コンピュータの頭脳にあたる部分で、記憶装置からプログラムを読み込んで演算処理を行います。</li>
            <li>CPU は、一定のリズムで演算を処理しています。1秒間に実行される演算の数のことを、クロック周波数と呼びます。クロック周波数が大きいほど、CPU は高速に動作します。クロック周波数の単位はヘルツ（Hz）です。</li>
            <li>CPU でデータの演算を行うときには、CPU内部でデータを一時的に置いておく場所が必要です。この場所のことをレジスタと呼びます。レジスタは、CPUの中にある、非常に高速で小さいメモリです。レジスタの容量が大きくなるほど、一度に計算できるデータ量が多くなるため、高速になります。</li>
            <li>なお、コンピュータの記憶装置の階層の中で、レジスタはCPUの内部にある最も高速なメモリです。一方、キャッシュ（キャッシュメモリ）はCPUの外部にあり、CPUと主記憶装置の間の処理を高速にするために存在するメモリです。レジスタとキャッシュの違いは、しっかり覚えておきましょう。</li>
          </ul>
        </div>
        <div>
          <p><strong>Ａ：500MHz、Ｂ：1GHz</strong><br/>クロック周波数はCPUが演算を処理するリズムであり、クロック周波数が大きいほどCPUの処理速度は速くなります。クロック周波数の単位はヘルツ（Hz）のため、この数値が大きいほど、CPUの処理速度は速くなります。1GHzは1000MHzを表しており、クロック周波数が500MHzのCPUと1GHzのCPUを比べると、1GHzの方が大きいため、1GHzのCPUの方が速く動作します。</p>
          <p className="mt-2"><strong>Ｃ：レジスタ</strong><br/>レジスタは、CPUの中にある非常に高速で小さいメモリです。なお、キャッシュ（キャッシュメモリ）はCPUの外部にあるため間違いです。</p>
          <p className="mt-2"><strong>Ｄ：bit</strong><br/>レジスタの容量の単位はビット（bit）で表されます。一般的にレジスタの容量が大きくなるほど、CPUの中で一度に計算できるデータ量が多くなるため、高速になります。なお、bpsとは、bit per secondのことであり、通信回線などのデータ転送速度の単位であるため間違いです。</p>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "画面処理",
    text: "コンピュータのグラフィック出力に関する次の文中の空欄Ａ～Ｃに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\nディスプレイに動画などを表示する場合、CPUはディスプレイへの画面出力のための処理を高速に行う必要がある。そこで、画面出力のための処理を専用で行う（　Ａ　）が開発された。\n（　Ａ　）のグラフィック出力に関する性能は、（　Ｂ　）の処理速度や（　Ｃ　）の容量などによって変わる。（　Ｂ　）は画面処理を担当するプロセッサであり、（　Ｃ　）は画面処理専用のメモリである。",
    options: [
      "Ａ：ビデオカード　Ｂ：CPU Ｃ：DRAM",
      "Ａ：ビデオカード　Ｂ：GPU　Ｃ：VRAM",
      "Ａ：CAD　Ｂ：ハードディスク　Ｃ：ROM",
      "Ａ：マルチタスク　Ｂ：LAN　Ｃ：SRAM"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問ではビデオカードについて問われています。</li>
            <li>ビデオカードは、グラフィックカードやグラフィックボードとも呼ばれます。ビデオカードは、ディスプレイに動画などを表示する場合、CPUが画面処理で手一杯にならないように、画面処理を専用で行う装置のことです。</li>
            <li>ビデオカードには、GPU（Graphics Processing Unit）という画面処理を担当するプロセッサと、VRAM（Video RAM）という画面処理専用のメモリが搭載されています。GPUの処理速度が高速であるほど、VRAMの容量が大きいほど、ビデオカードの性能は高性能であり、グラフィック出力が高速に行われます。</li>
            <li>近年、コンピュータで動画やゲームなどが扱われる機会が増えていますので、ビデオカードの概要についても押さえておきましょう。</li>
          </ul>
        </div>
        <div>
          <p><strong>Ａ：ビデオカード</strong><br/>ビデオカードは、グラフィック出力に関する処理を専門に行い、CPUをこの処理から解放します。なお、CADは、Computer Aided Designの略で、コンピュータ支援設計のことです。CADの描画を高速に行うために、ビデオカードが使われることがあります。また、マルチタスクは、コンピュータにおいて複数のタスクを切り替えて実行することです。</p>
          <p className="mt-2"><strong>Ｂ：GPU</strong><br/>ビデオカードにおいて、画面処理を担当するプロセッサをGPUと呼びます。CPUもプロセッサですが、汎用的に制御機能や演算機能を担います。なお、ハードディスクは、コンピュータの補助記憶装置にあたります。LANは、ローカル・エリア・ネットワークのことで、同じ建物内程度の規模で用いられるコンピュータネットワークのことです。</p>
          <p className="mt-2"><strong>Ｃ：VRAM</strong><br/>ビデオカードに搭載されている画面処理専用のメモリをVRAMと呼びます。VRAMは、Video RAMのことで、RAM（Random Access Memory）とは、データを自由に読み書きできるが、電源を消すと内容が消えるタイプのメモリのことです。DRAMは、Dynamic RAMのことで、コンピュータの主記憶装置として用いられます。SRAMは、Static RAMのことで、コンピュータ内部のキャッシュメモリとして用いられます。なお、ROMとは、Read Only Memoryのことで、電源を消しても内容が消えないタイプのメモリです。ROMは、家電の中でプログラムを格納する用途などに使われています。</p>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "記憶装置の種類と階層",
    text: "コンピュータの記憶装置には次の図のような階層構造がある。次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。（※階層は上から順にA、B、C、D、補助記憶装置となっており、上に行くほど高速・高価である）",
    options: [
      "Ａ：キャッシュメモリ　Ｂ：レジスタ　Ｃ：ディスクキャッシュ　Ｄ：メモリ",
      "Ａ：メモリ　Ｂ：ディスクキャッシュ　Ｃ：キャッシュメモリ　Ｄ：レジスタ",
      "Ａ：ディスクキャッシュ　Ｂ：メモリ　Ｃ：レジスタ　Ｄ：キャッシュメモリ",
      "Ａ：レジスタ　Ｂ：キャッシュメモリ　Ｃ：メモリ　Ｄ：ディスクキャッシュ"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問では記憶装置の階層について問われています。</li>
            <li>記憶装置の階層構造は、上からレジスタ、キャッシュメモリ、主記憶装置、ディスクキャッシュ、補助記憶装置の順となっています。上の方が高速ですが高価という特徴があります。</li>
            <li>レジスタは、CPU内で、演算のためにデータを格納しておく場所のことです。</li>
            <li>キャッシュメモリは、CPUとメモリ（主記憶装置）の間に位置します。メモリ（主記憶装置）よりも高速であるため、良く使うデータをキャッシュメモリに一時的に置いておくことで、処理を高速化することができます。</li>
            <li>メモリは主記憶装置とも呼ばれ、プログラムで使われる主要なデータを格納しておく領域です。</li>
            <li>ディスクキャッシュは、メモリとハードディスクなどの補助記憶装置の間に位置します。ディスクキャッシュは、ハードディスクよりも高速にアクセスできます。よく使うデータをディスクキャッシュに一時的に置くことにより、ハードディスクにアクセスすることなく処理することができます。</li>
            <li>一番下の階層は、ハードディスクなどの補助記憶装置です。ハードディスクの速度は一般的に数十ミリ秒です。</li>
            <li>メモリの階層の上に高速化するためのキャッシュメモリがあり、ハードディスクの上にはディスクキャッシュがあるという位置づけを覚えておきましょう。</li>
          </ul>
        </div>
        
        <div className="flex justify-center my-4">
          <div className="relative w-64 h-48 border-l-2 border-b-2 border-r-2 border-t-[3rem] border-t-transparent border-l-transparent border-r-transparent border-b-gray-300">
             <div className="absolute inset-0 flex flex-col justify-end items-center pb-2">
                <div className="w-[30%] bg-white border border-gray-400 text-center text-xs py-1 mb-1 font-bold">A: レジスタ</div>
                <div className="w-[45%] bg-white border border-gray-400 text-center text-xs py-1 mb-1 font-bold">B: キャッシュメモリ</div>
                <div className="w-[60%] bg-white border border-gray-400 text-center text-xs py-1 mb-1 font-bold">C: メモリ</div>
                <div className="w-[75%] bg-white border border-gray-400 text-center text-xs py-1 mb-1 font-bold">D: ディスクキャッシュ</div>
                <div className="w-[90%] bg-white border border-gray-400 text-center text-xs py-1 font-bold">補助記憶装置</div>
             </div>
             <div className="absolute -left-12 top-0 bottom-0 flex flex-col justify-between items-center">
                <span className="text-xs">高速・高価</span>
                <div className="h-full w-0.5 bg-black my-2 relative">
                   <div className="absolute -top-2 left-[-3px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-black"></div>
                </div>
             </div>
          </div>
        </div>

        <div>
          <p><strong>Ａ：レジスタ</strong><br/>レジスタは記憶装置の中で最も高速であり、その速度は数百ピコ秒から数ナノ秒です。ピコは1兆分の1、ナノは10億分の1の単位です。</p>
          <p className="mt-2"><strong>Ｂ：キャッシュメモリ</strong><br/>メモリより高速なキャッシュメモリを置くことにより、メモリへのアクセスを減らして処理を高速化します。キャッシュメモリの速度は数ナノ秒です。</p>
          <p className="mt-2"><strong>Ｃ：メモリ</strong><br/>主記憶装置のことです。メモリの速度は数十ナノ秒です。</p>
          <p className="mt-2"><strong>Ｄ：ディスクキャッシュ</strong><br/>ハードディスクより高速なディスクキャッシュを置くことにより、ハードディスクへのアクセスを減らして処理を高速化します。ディスクキャッシュの速度は数ミリ秒です。</p>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "キャッシュメモリ",
    text: "主記憶装置のアクセス時間60ナノ秒、キャッシュメモリのアクセス時間10ナノ秒のコンピュータがある。CPUからデータにアクセスするときにかかる平均アクセス時間が15ナノ秒であるとき、キャッシュメモリのヒット率として、最も適切なものはどれか。",
    options: ["60%", "70%", "80%", "90%"],
    correctIndex: 3,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問ではキャッシュメモリのヒット率について問われています。</li>
            <li>CPUは、データが必要なとき、キャッシュメモリにデータがある場合はこれを使用し、データが無い場合にはメインメモリ（主記憶装置）にデータを取りにいきます。データがキャッシュメモリで見つかった確率を、キャッシュメモリのヒット率と呼びます。</li>
            <li>ここで、キャッシュメモリのヒット率を用いると、CPUがデータにアクセスする平均アクセス時間は、次の式で求められます。<br/><strong>キャッシュメモリのアクセス時間 × ヒット率 ＋ 主記憶装置のアクセス時間 × （1 － ヒット率）</strong></li>
            <li>この計算式はしっかりと押さえておきましょう。本問では、上記の式を用いて、キャッシュメモリのヒット率を計算します。</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p>キャッシュメモリのヒット率をＨとすると、平均アクセス時間を求める式は次のように表されます。</p>
          <p className="font-mono bg-white p-2 border mt-1">平均アクセス時間 ＝ キャッシュメモリのアクセス時間 × H ＋ 主記憶装置のアクセス時間×（1 － H）</p>
          <p className="mt-2">平均アクセス時間が15ナノ秒、キャッシュメモリのアクセス時間が10ナノ秒、主記憶装置のアクセス時間が60ナノ秒ですので、これらの数値を用いて計算します。</p>
          <ul className="font-mono mt-2 space-y-1 bg-white p-2 border">
            <li>15ナノ秒 ＝ 10ナノ秒 × H ＋ 60ナノ秒 × （1 － H）</li>
            <li>15 ＝ 60 － 50 × Ｈ</li>
            <li>50 × Ｈ ＝ 45</li>
            <li>Ｈ ＝ 45 ÷ 50 ＝ 0.9</li>
          </ul>
          <p className="mt-2 font-bold">よって、キャッシュメモリのヒット率は0.9つまり90%となります。</p>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "主記憶装置1",
    text: "RAMおよびROMに関する記述として、最も不適切なものはどれか。",
    options: [
      "メモリには、大きくRAMとROMという種類があり、コンピュータの主記憶装置は通常はRAMである。",
      "電源を落としたときにメモリの内容が消えてしまうことを揮発性があると言う。",
      "RAMには、DRAMとSRAMの2種類があり、主記憶装置として使われるのはSRAMである。",
      "近年、ROMの1種として、フラッシュメモリが普及してきた。フラッシュメモリは、書き換えが可能なROMであり、電源を落としてもデータは消えない。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問ではRAMおよびROMについて問われています。</li>
            <li>メモリには、大きくRAMとROMという種類があります。</li>
            <li>RAMは、Random Access Memoryのことであり、データを自由に読み書きできますが、電源を消すと内容が消えるタイプのメモリです。電源を消すと内容が消えることを揮発性があると言います。RAMは、コンピュータの主記憶装置で使われています。</li>
            <li>RAMには、DRAMとSRAMの2種類があります。SRAMの方がDRAMより高速ですが高価です。そのため、SRAMはキャッシュメモリとして使われ、DRAMは主記憶装置として使われます。</li>
            <li>ROMは、Read Only Memoryのことであり、電源を消しても内容が消えないタイプのメモリです。近年では、フラッシュメモリという書き換えが可能なROMが出てきています。フラッシュメモリは書き換え可能でありながら、電源を落としてもデータは消えません。</li>
            <li>RAMとROMの違い、DRAMとSRAMの違いを押さえておきましょう。</li>
          </ul>
        </div>
        <ul className="space-y-2">
          <li><strong>ア　○：</strong>RAMは読み書き可能なメモリであり、ROMは読み込み専用のメモリです。主記憶装置は、入力装置や出力装置、制御・演算装置であるCPUとデータのやりとりを行うため、読み書き可能であることが必要です。そのため、主記憶装置としてはRAMが用いられます。</li>
          <li><strong>イ　○：</strong>メモリの揮発性とは、電源を供給しないと記憶している情報を保持できないということです。一方で、メモリの不揮発性とは、電源を供給しなくても情報を失わないということです。</li>
          <li><strong>ウ　×：</strong>RAMには、DRAMとSRAMの2種類がありますが、主記憶装置として使用されているのはDRAMです。SRAMは高速ですが高価であるため、キャッシュメモリとして使用されています。よって、記述は不適切です。</li>
          <li><strong>エ　○：</strong>ROMはもともと読み込み専用のメモリですが、最近では書き込みができるタイプのフラッシュメモリが出てきています。</li>
        </ul>
      </div>
    )
  },
  {
    id: 7,
    title: "主記憶装置2",
    text: "フラッシュメモリの説明として、最も適切なものはどれか。",
    options: [
      "電気的に書換え可能な、不揮発性のメモリである。",
      "紫外線で全データを一括消去できる。",
      "周期的にデータの再書込みが必要である。",
      "データ読出し速度が速いメモリで、CPUと主記憶の性能差を埋めるキャッシュメモリによく使われる。"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問ではフラッシュメモリについて問われています。</li>
            <li>フラッシュメモリはPROM（Programmable Read Only Memory）の一種で、書き込み可能なROMになります。電気的にデータを書き換える、不揮発性（電源を落としてもデータが消えない）メモリです。</li>
            <li>フラッシュメモリは、現在では、デジタルカメラに差し込んで使うメモリカードや、パソコンのデータを手軽に交換できるUSBメモリなど、幅広く使われています。フラッシュメモリにはNAND型とNOR型の2種類があり、NAND型は高い集積度を実現しやすく、容量あたりの単価が比較的低いため、フラッシュメモリの主流のタイプとなっています。</li>
            <li>なお、EPROMは、Erasable PROMのことであり、紫外線でデータを消去し、書き込みを何度でも行えるROMのことです。</li>
          </ul>
        </div>

        <div className="border p-4 bg-white rounded text-xs space-y-2">
           <div className="flex">
              <div className="w-32 p-2 bg-orange-100 border border-orange-300 text-center font-bold h-fit">
                 RAM<br/><span className="text-[10px] font-normal">電源が消えると内容が消える</span>
              </div>
              <div className="flex flex-col ml-4 space-y-2 relative border-l border-gray-400 pl-4 py-2">
                 <div className="flex items-center">
                    <div className="w-32 p-2 bg-orange-100 border border-orange-300 text-center font-bold">DRAM</div>
                    <span className="ml-2">主記憶として使用</span>
                 </div>
                 <div className="flex items-center">
                    <div className="w-32 p-2 bg-orange-100 border border-orange-300 text-center font-bold">SRAM</div>
                    <span className="ml-2">高速、キャッシュメモリとして使用</span>
                 </div>
              </div>
           </div>
           
           <div className="flex mt-4">
              <div className="w-32 p-2 bg-green-200 border border-green-400 text-center font-bold h-fit">
                 ROM<br/><span className="text-[10px] font-normal">電源を消しても内容が消えない</span>
              </div>
              <div className="flex flex-col ml-4 space-y-2 relative border-l border-gray-400 pl-4 py-2">
                 <div className="flex items-center">
                    <div className="w-32 p-2 bg-green-200 border border-green-400 text-center font-bold">マスクROM</div>
                    <span className="ml-2">読み込み専用</span>
                 </div>
                 <div className="flex flex-col">
                    <div className="flex items-center">
                       <div className="w-32 p-2 bg-green-200 border border-green-400 text-center font-bold">PROM</div>
                       <span className="ml-2">書き込み可能</span>
                    </div>
                    <div className="flex flex-col ml-8 border-l border-gray-400 pl-4 py-2 mt-1 space-y-2">
                       <div className="flex items-center">
                          <div className="w-32 p-2 bg-green-200 border border-green-400 text-center font-bold">EPROM</div>
                          <span className="ml-2">紫外線でデータを消去</span>
                       </div>
                       <div className="flex items-center">
                          <div className="w-32 p-2 bg-green-200 border border-green-400 text-center font-bold">フラッシュメモリ</div>
                          <span className="ml-2">電気的にデータを書き換え</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <ul className="space-y-2">
          <li><strong>ア　○：</strong>フラッシュメモリは、電気的に書換え可能な、不揮発性のメモリです。</li>
          <li><strong>イ　×：</strong>紫外線で全データを一括消去できるのは、紫外線消去型EPROMの特徴です。</li>
          <li><strong>ウ　×：</strong>フラッシュメモリは不揮発性のメモリです。周期的なデータの再書込みが不要です。</li>
          <li><strong>エ　×：</strong>キャッシュメモリによく使われるのは、SRAMです。フラッシュメモリはキャッシュメモリとして使用できるほど高速ではありません。</li>
        </ul>
      </div>
    )
  },
  {
    id: 8,
    title: "補助記憶装置",
    text: "仮想記憶装置、スワッピングに関する記述として、最も適切なものはどれか。",
    options: [
      "仮想記憶装置は、補助記憶装置の容量不足を補うための仕組みである。",
      "仮想記憶領域は、キャッシュメモリ上に設けられる。",
      "光磁気ディスクを用いることによって、スワッピングは減少する。",
      "物理メモリを追加することによって、スワッピングは減少する。"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問では仮想記憶装置とスワッピングについて問われています。</li>
            <li>仮想記憶装置は、補助記憶装置（ハードディスクなど）を使って、仮想的に主記憶装置（メモリ）を拡張する方法です。仮想メモリとも呼ばれます。CPUが処理を実行するために必要なプログラムやデータのサイズに対して、メモリのサイズが小さい場合、メモリに乗り切らないデータをハードディスクなどに書き込むことで処理を実行できるようにします。</li>
            <li>仮想記憶領域は、ハードディスクなどの中に設けられますので、メモリにデータが乗り切らずに仮想記憶装置を用いるとき、メモリとハードディスクなどの間でのデータのやり取りが発生します。これをスワッピングと言います。</li>
            <li>ハードディスクはメモリに比べて速度が遅いため、スワッピングが頻繁に発生すると、ハードディスクへのアクセスが増えるため、コンピュータの処理速度は遅くなります。</li>
            <li>仮想記憶装置とスワッピングの関係を押さえておきましょう。</li>
          </ul>
        </div>
        <ul className="space-y-2">
          <li><strong>ア　×：</strong>仮想記憶装置は、主記憶装置（メモリ）の容量不足を補うための仕組みです。補助記憶装置を利用することで、仮想的にメモリを拡張します。</li>
          <li><strong>イ　×：</strong>仮想記憶領域は、補助記憶装置（ハードディスクなど）の中に設けられます。キャッシュメモリは、CPUとメモリの間に位置し、良く使うデータをキャッシュメモリに一時的に置いておくことで、処理を高速化させるものです。</li>
          <li><strong>ウ　×：</strong>光磁気ディスクとは、補助記憶装置の１つであり、MOディスクとも呼ばれます。磁気とレーザー光を用いて読み書きを行います。メモリの容量不足を補うためにスワッピングは行われますので、光磁気ディスクを用いてもスワッピングは減少しません。</li>
          <li><strong>エ　○：</strong>物理メモリを追加することによって、メモリ内で保持できるデータやプログラムのサイズが大きくなります。そのため、メモリに乗り切らないデータなどを仮想記憶領域へ移す頻度が減り、スワッピングは減少します。</li>
        </ul>
      </div>
    )
  },
  {
    id: 9,
    title: "入出力装置の種類",
    text: "入出力装置に関する記述として、最も不適切なものはどれか。",
    options: [
      "ア　デジタイザは、ペン型の装置と板状の装置の組み合わせで、図形などの入力を行う装置である。",
      "イ　フラットベッドスキャナは、機器を手で持ちながら原稿を読み込むタイプのスキャナである。",
      "ウ　レーザープリンタの印字精度はdpiで表され、この数値が大きいほど解像度が高くなる。",
      "エ　イメージスキャナの読み取り精度はdpiで表され、この数値が大きいほど解像度が高くなる。"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問では入出力装置について問われています。</li>
            <li>デジタイザは、ペン型の装置と板状の装置の組み合わせにより、図形などの入力を行う装置です。小型のものはタブレットと呼ばれます。</li>
            <li>フラットベッドスキャナは、原稿をガラス台に固定し、下から光を当てて読取装置を動かして読み取るタイプのスキャナです。</li>
            <li>レーザープリンタは、レーザー光を使って印刷を行うプリンタです。レーザー光を利用して、ドラムと呼ばれる感光体にトナーを付着させて、そのドラムを紙に押し付けて印刷を行います。</li>
            <li>イメージスキャナは、画像や文書などをデジタル画像として、データ化するための機器です。</li>
          </ul>
        </div>
        <ul className="space-y-2">
          <li><strong>ア　○：</strong>デジタイザの説明として正しい記述です。デジタイザは、CADによる図面入力などに利用されます。</li>
          <li><strong>イ　×：</strong>機器を手で持ちながら原稿を読み込むタイプのスキャナはハンディスキャナと言います。</li>
          <li><strong>ウ　○：</strong>dpiは、dots per inchのことで、1インチの幅の中にどれだけのドットを表現できるかを表します。プリンタの印字精度はdpiで表されます。dpiの数値が大きいほど、プリンタの解像度が高くなります。</li>
          <li><strong>エ　○：</strong>スキャナの読み取り精度もdpiで表されます。dpiの数値が大きいほど、スキャナの解像度が高くなります。</li>
        </ul>
      </div>
    )
  },
  {
    id: 10,
    title: "インタフェースの種類1",
    text: "周辺機器接続に関する以下のa～dの記述と、その記述に適合するインタフェース名称の組み合わせとして、最も適切なものを下記の解答群から選べ。\na　デジタルビデオカメラなどを接続するためのインタフェースであり、最大で63台の機器を接続することができる。\nb　無線通信の規格であり、機器の間に障害物があっても、距離が10m程度までであれば通信できる。\nc　パソコンに内蔵されているハードディスクやDVD装置などを接続するためのインタフェースである。\nd　液晶ディスプレイなどの表示装置を接続するためのインタフェースであり、デジタル伝送によって信号を伝える。",
    options: [
      "a：IEEE1394　b：Bluetooth　c：ATA　d：DVI",
      "a：ATA 　b：Bluetooth　c：IEEE1394 d：DVI",
      "a：DVI　b：Bluetooth　c：ATA　d：IEEE1394",
      "a：Bluetooth　b：ATA　c：DVI　d：IEEE1394"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問では周辺機器とコンピュータをつなぐインタフェースの種類について問われています。</li>
            <li>IEEE1394は、マルチメディア機器などを接続するための、高速なインタフェースであり、デジタルビデオカメラを接続する際の標準的な規格となっています。</li>
            <li>Bluetoothは、無線通信の規格であり、電波を使って通信します。</li>
            <li>ATAは、パソコン本体とハードディスクなどを接続するためのインタフェースの１つであり、アメリカ規格協会(ANSI)によって標準化されました。</li>
            <li>DVIは、Digital Visual Interfaceのことであり、映像出力のインタフェースの１つです。パソコン本体と液晶ディスプレイなどを接続するために使われます。</li>
          </ul>
        </div>
        <ul className="space-y-2">
          <li><strong>a：IEEE1394</strong><br/>デジタルビデオカメラなどのマルチメディア機器を接続するためのインタフェースであり、最大で63台の機器を接続することができます。</li>
          <li><strong>b：Bluetooth</strong><br/>無線通信の規格であり、パソコンと周辺機器などをケーブルを使わずに接続し、音声やデータをやりとりすることができます。電波を使って通信するため、障害物があっても、距離が10m程度までであれば通信できます。</li>
          <li><strong>c：ATA</strong><br/>パソコンに内蔵されているハードディスクやDVD装置などを接続するためのインタフェース規格の１つです。</li>
          <li><strong>d：DVI</strong><br/>液晶ディスプレイなどを接続するためのインタフェースであり、コンピュータから直接デジタル信号を送ることができます。従来の一般的なインタフェースであるVGAでは、アナログ信号に変換してディスプレイに送出していたため、変換による信号の劣化がありました。DVIを用いると信号の劣化がなくなり、画質が向上します。</li>
        </ul>
      </div>
    )
  },
  {
    id: 11,
    title: "インタフェースの種類2",
    text: "インタフェースの機能に関する記述として、最も不適切なものはどれか。",
    options: [
      "インタフェースを大きく分けると、シリアル伝送とパラレル伝送があり、パラレル伝送のインタフェースには、USB、IEEE1394、IrDA、Bluetoothなどがある。",
      "パソコンにUSBメモリを接続する際に、パソコンの電源を落とさなくても接続できる機能はホットプラグと呼ばれる。",
      "プリンタを使用する際に、パソコンとプリンタを接続すると、OSがプリンタを自動的に検知して必要な設定が行われる機能はプラグアンドプレイと呼ばれる。",
      "プリンタで印刷を行う場合、一時的にハードディスクに印刷データを置き、プリンタの印刷の進行状況に応じて、少しずつ処理を行うことをスプーリングと言う。"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問ではインタフェースの機能について問われています。</li>
            <li>インタフェースを大きく分けると、シリアル伝送とパラレル伝送があります。シリアル伝送は、1本の信号線でつなぎ、データを順番に転送します。パラレル伝送は複数の信号線でつなぎ、データを並列に転送します。</li>
            <li>ホットプラグは、パソコンを再起動しなくても機器の抜き差しができるようになる機能のことです。</li>
            <li>プラグアンドプレイは、周辺機器を接続した際に、OSがデバイスを自動的に検知して最適な設定を行う機能のことです。</li>
            <li>スプーリングは、スプール処理とも呼ばれ、磁気ディスクなどの補助記憶装置を仮想的な入出力装置とみなして、CPUから入出力制御を解放して処理効率を高める方法のことです。CPUを効率よく使用できるため、システム全体が処理できる仕事量を向上させることができます。</li>
          </ul>
        </div>
        <ul className="space-y-2">
          <li><strong>ア　×：</strong>インタフェースを大きく分けると、シリアル伝送とパラレル伝送があり、シリアル伝送はデータを順番に転送するのに対して、パラレル伝送は並列に転送します。USB、IEEE1394、IrDA、Bluetoothは、シリアル伝送のインタフェースです。</li>
          <li><strong>イ　○：</strong>パソコンの電源を落として再起動しなくても、周辺機器であるUSBメモリを接続して使用できるような機能をホットプラグと言います。</li>
          <li><strong>ウ　○：</strong>周辺機器であるプリンタをパソコンに接続した際、ユーザが手動で設定を行わなくても、OSが自動的に検知して必要な最適な設定を行ってくれる機能をプラグアンドプレイと言います。プラグとはつなぐということであり、プレイは実行するという意味ですから、つないだらすぐに使えるということを表しています。</li>
          <li><strong>エ　○：</strong>プリンタで印刷を行う場合、印刷速度はCPUの処理速度よりも遅いため、印字開始から終了までCPUが占有されてしまうと、CPUの待ち時間が多く、他の処理が実行されない状態になります。そのため、ハードディスクなどに一時的に印刷データを置き、プリンタの印刷の進行状況に応じて、少しずつ処理を行います。これにより、CPUが印刷処理の待ち状態から解放されて、他の処理を実行することができます。このような処理方法をスプーリングと言います。</li>
        </ul>
      </div>
    )
  },
  {
    id: 12,
    title: "インタフェースの種類3",
    text: "コンピュータに接続するインタフェースに関する記述として、最も適切なものはどれか。",
    options: [
      "NASとは、映像機器の入出力端子であるD端子の一種である。",
      "PCIとは、コンピュータ内部でグラフィックスカードなどを接続するためのシステムバスのインタフェースである。",
      "e-SATAは、PC本体の電源を切らずに外付けHDDの接続が可能なパラレルインタフェースである。",
      "シリアルATAは、外付けHDD、モデムやマウスの接続が可能なインタフェースである。"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問では、周辺機器とコンピュータをつなぐインタフェースの機能について問われています。</li>
            <li>NASは、Network Attached Storageのことであり、LANに直接接続して利用するファイルサーバです。</li>
            <li>PCIは、Peripheral Component Interconnectのことであり、コンピュータ内部でグラフィックスカードやネットワークカードなどを接続するための代表的なインタフェースです。</li>
            <li>e-SATAは、external Serial ATAのことであり、内部接続用のシリアルATAを外付け機器向けに拡張した規格です。</li>
            <li>シリアルATAは、パソコンに内蔵されているハードディスクをパソコン本体と接続するための代表的な規格です。</li>
          </ul>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-black text-sm">
             <thead className="bg-orange-100">
                <tr>
                   <th className="border border-black p-2">規格</th>
                   <th className="border border-black p-2">伝送方式</th>
                   <th className="border border-black p-2">特徴</th>
                </tr>
             </thead>
             <tbody className="bg-white">
                <tr>
                   <td className="border border-black p-2 text-center font-bold">SCSI</td>
                   <td className="border border-black p-2 text-center font-bold">パラレル</td>
                   <td className="border border-black p-2 font-bold">外付けのハードディスクとの接続などに用いられる。</td>
                </tr>
                <tr>
                   <td className="border border-black p-2 text-center font-bold">ATA</td>
                   <td className="border border-black p-2 text-center font-bold">シリアル/<br/>パラレル</td>
                   <td className="border border-black p-2 font-bold">内蔵ハードディスクの接続に用いられる。IDEを標準化した規格。</td>
                </tr>
                <tr>
                   <td className="border border-black p-2 text-center font-bold">eSATA</td>
                   <td className="border border-black p-2 text-center font-bold">シリアル</td>
                   <td className="border border-black p-2 font-bold">内部接続用のシリアルATAを外付け機器向けに拡張した規格。</td>
                </tr>
                <tr>
                   <td className="border border-black p-2 text-center font-bold">USB</td>
                   <td className="border border-black p-2 text-center font-bold">シリアル</td>
                   <td className="border border-black p-2 font-bold">ハードディスク以外に、マウス、キーボードなど様々な機器との接続で使われる。</td>
                </tr>
             </tbody>
          </table>
        </div>

        <ul className="space-y-2">
          <li><strong>ア　×：</strong>NASは、映像機器の入出力端子であるD端子の一種ではありません。NASは、LANに接続して利用するファイルサーバであり、ネットワークインタフェース、OS、ハードディスクなどが一体化されたものです。</li>
          <li><strong>イ　〇：</strong>PCIは、コンピュータ内部でグラフィックスカードやネットワークカードなどを接続するためのシステムバスのインタフェースです。なお、システムバスとは、コンピュータ内部で各回路がデータをやり取りするための伝送路のことです。</li>
          <li><strong>ウ　×：</strong>e-SATAについて、PC本体の電源を切らずに外付けHDDの接続が可能、という記述は正しいです。しかし、選択肢にあるようなパラレルインタフェースではありません。e-SATAはシリアルインタフェースになります。</li>
          <li><strong>エ　×：</strong>シリアルATAは、外付けハードディスクではなく、内蔵ハードディスクをパソコン本体と接続するための規格です。また、モデムやマウスの接続には使われません。</li>
        </ul>
      </div>
    )
  },
  {
    id: 13,
    title: "ソフトウェアの種類",
    text: "次のソフトウェアに関する記述のうち、最も適切なものはどれか。",
    options: [
      "キーボードやプリンタなどの周辺装置を制御し、OSとの間で情報をやり取りするには、ミドルウェアを使用する。",
      "BIOSは、ハードディスクが破損すると、読み込むことはできない。",
      "アプリケーションプログラムはOSの上で動作するが、必要に応じてミドルウェアにアクセスする。",
      "オープンソースソフトウェアは、企業内での使用には適さない。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問は、ソフトウェアの種類についての設問です。</li>
            <li>ソフトウェアは、大きく分けて OS、ミドルウェア、アプリケーションソフトウェアに分類されます。</li>
            <li><strong>・OS</strong><br/>OS（Operating System）は、ハードウェアを制御し、基本的な機能を提供するためのソフトウェアです。パソコンでは、WindowsやMac OS、サーバーでは、UNIXやLINUXなどが代表的なOSです。</li>
            <li><strong>・ミドルウェア</strong><br/>ミドルウェアは、OS とアプリケーションソフトウェアの間に位置するソフトウェアです。ミドルウェアは、様々なアプリケーションソフトウェアで必要になる共通的なサービスを提供します。データベース管理システムなどがミドルウェアの例です。</li>
            <li><strong>・アプリケーションソフトウェア</strong><br/>アプリケーションソフトウェアは、ユーザーが直接利用するソフトウェアで、ある特定の目的のために用いられるソフトウェアです。表計算ソフト、給与計算ソフトなどがアプリケーションソフトウェアの例です。</li>
          </ul>
        </div>
        <ul className="space-y-2">
          <li><strong>ア　×：</strong>キーボードやプリンタなどの周辺装置を制御し、OS との間で情報をやり取りするのは、デバイスドライバという特別なプログラムです。ミドルウェアは、様々なアプリケーションソフトウェアで必要になる共通的なサービスを提供します。よって、記述は不適切です。</li>
          <li><strong>イ　×：</strong>BIOS は、最低限の基本的な入出力を行うためのプログラムです。一般的なパソコンでは、BIOS はマザーボード等の ROM に組み込まれて出荷されており、ハードディスクが壊れても起動するようになっています。よって、記述は不適切です。</li>
          <li><strong>ウ　○：</strong>アプリケーションプログラムは、表計算ソフトなどのユーザが直接利用するソフトウェアのことです。必要に応じてデータベース管理システムなどのミドルウェアにアクセスします。よって、記述は適切です。なお、アプリケーションプログラムは、アプリケーションソフトウェアとも言われます。</li>
          <li><strong>エ　×：</strong>オープンソースソフトウェア（OSS）は、プログラムのソースコードが公開されているソフトウェアのことです。近年、OSSは利用が拡大してきており、企業・自治体での採用も進んでいます。よって、記述は不適切です。</li>
        </ul>
      </div>
    )
  },
  {
    id: 14,
    title: "ミドルウェア",
    text: "ミドルウェアに関する記述として、最も適切なものはどれか。",
    options: [
      "ユーザが直接利用するソフトウェアであり、インターネットブラウザなど目的に応じて様々なものがある。",
      "プログラムのソースコードを一文ずつ機械語に翻訳しながら実行する。",
      "データベース管理システムなど、オペレーティングシステムとアプリケーションソフトウェアの間で機能して、共通的なサービスを提供する。",
      "プリンタなど周辺機器を制御するためのソフトウェアで、利用する周辺機器に応じて必要なものをオペレーティングシステムに組み込んで利用する。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問ではソフトウェアの分類とそれぞれの機能について問われています。</li>
            <li>ソフトウェアは、大きく分けてオペレーティングシステム、ミドルウェア、アプリケーションソフトウェアなどに分類されます。</li>
            <li>オペレーティングシステムは、ハードウェアを制御し、基本的な機能を提供するためのソフトウェアです。</li>
            <li>ミドルウェアは、オペレーティングシステムとアプリケーションソフトウェアの間に位置するソフトウェアです。ミドルウェアは、様々なアプリケーションソフトウェアで必要になる、共通的なサービスを提供します。</li>
            <li>アプリケーションソフトウェアは、ユーザが直接利用するソフトウェアであり、目的に応じて様々なものがあります。</li>
            <li>その他のソフトウェアとして、デバイスドライバ、インタプリタ、コンパイラなどがあります。</li>
            <li>デバイスドライバは、オペレーティングシステムと周辺装置との間で情報をやり取りするために必要なソフトウェアです。</li>
            <li>インタプリタやコンパイラは、プログラムのソースコードを、コンピュータが実行できる形式に変換しながら実行するソフトウェアです。インタプリタは、プログラムの実行時に変換を行い、コンパイラは、開発時にまとめて変換を行います。</li>
          </ul>
        </div>
        <ul className="space-y-2">
          <li><strong>ア　×：</strong>ユーザが直接利用するソフトウェアということですから、アプリケーションソフトウェアに関する説明です。インターネットブラウザや表計算ソフト、文書作成ソフトなどが該当します。</li>
          <li><strong>イ　×：</strong>プログラムのソースコードを一文ずつ機械語というコンピュータが実行できる言語に変換するソフトウェアということですから、インタプリタに関する説明です。</li>
          <li><strong>ウ　○：</strong>ミドルウェアに関する説明です。データベース管理システムやアプリケーションサーバなどが該当します。</li>
          <li><strong>エ　×：</strong>周辺機器を制御するためのソフトウェアということですから、デバイスドライバに関する説明です。</li>
        </ul>
      </div>
    )
  },
  {
    id: 15,
    title: "OS",
    text: "オペレーティングシステム（OS）に関する記述として、最も不適切なものはどれか。",
    options: [
      "メモリ、ファイルの管理を行い、これらをアプリケーションソフトで利用できるようにする。",
      "キーボードからの入力、プリンタへの印字出力、外部記憶装置に対する読み書きなど、入出力デバイスの管理を行う。",
      "複数のユーザアカウントを作成して、ファイルシステムに存在する各種ファイルの参照や実行、作成や削除の権限をユーザごとに設定できる。",
      "家電やパソコンの周辺機器などに組み込まれて使用されるOSは、パソコンなどの汎用OSを利用したものは無く、その機器ごとに最適なOSが設計され組み込まれている。"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問ではオペレーティングシステムについて問われています。</li>
            <li>オペレーティングシステム（OS）は、ハードウェアを制御し、基本的な機能を提供するためのソフトウェアです。</li>
            <li>OSは、ソフトウェアのジョブやタスクを管理する機能、キーボードやプリンタといった周辺装置とのインタフェースの管理機能などを有しています。</li>
            <li>オペレーティングシステムの機能について押さえておきましょう。</li>
          </ul>
        </div>
        <ul className="space-y-2">
          <li><strong>ア　○：</strong>OSの機能の１つとして、コンピュータリソースの管理が挙げられます。コンピュータリソースとは、CPUやメモリ、ファイルなどを指します。複数のアプリケーションソフトを同時に実行する場合には、互いに独立して動作できるようにリソースを管理します。</li>
          <li><strong>イ　○：</strong>OSでは、キーボードやプリンタ、外部記憶装置などの入出力デバイスの管理を行います。なお、これらの入出力デバイスとOSの間で情報をやり取りするには、デバイスドライバという入出力を制御するためのソフトウェアを使用します。</li>
          <li><strong>ウ　○：</strong>OSでは、ファイルごとに作成や参照、削除といったアクセスに対する許可情報を設定できます。このとき、ユーザもしくはグループごとに異なる許可情報を設定することも可能です。なお、この許可情報のことをファイルパーミッションと呼びます。</li>
          <li><strong>エ　×：</strong>家電や周辺機器などに内蔵されるOSは、以前はパソコン用のOSとは異なる組込みOSが使用されることが多かったが、最近では LinuxやWindowsなどパソコン用OSをベースにしたOSを採用されるケースも増えています。</li>
        </ul>
      </div>
    )
  },
  {
    id: 16,
    title: "オープンソースOS",
    text: "オープンソースのオペレーティングシステムに関する記述として、最も適切なものはどれか。",
    options: [
      "オペレーティングシステムは、基本的な機能を提供するソフトウェアであるため、オープンソースソフトウェアは提供されていない。",
      "オープンソースのオペレーティングシステムは、ソースコードが公開されており、自由に改変することができる。",
      "オープンソースのオペレーティングシステムは、企業では利用されていない。",
      "オープンソースのオペレーティングシステムは、無料で利用できるオペレーティングシステムのことを指している。"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm">
        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
          <p className="font-bold">ここが重要</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>本問ではオープンソースのオペレーティングシステムについて問われています。</li>
            <li>オープンソースソフトウェアとは、プログラム自体が公開されているソフトウェアのことです。</li>
            <li>オープンソースソフトウェアにはさまざまなものがありますが、オペレーティングシステムのオープンソースソフトウェアもあります。代表的なものはLinuxであり、企業でも利用されています。</li>
            <li>オープンソースソフトウェアの定義と用途について押さえておきましょう。</li>
          </ul>
        </div>
        <ul className="space-y-2">
          <li><strong>ア　×：</strong>オペレーティングシステムは、基本的な機能を提供するソフトウェアであることは正しい記述ですが、Linuxなどオープンソースのオペレーティングシステムが提供されています。</li>
          <li><strong>イ　○：</strong>オープンソースソフトウェアは、ソースコードが公開されているソフトウェアのことを指します。そのため、ユーザーが自由に改変することができます。改変による影響は原則として自己責任となります。</li>
          <li><strong>ウ　×：</strong>Linuxなどオープンソースのオペレーティングシステムは企業でも利用されています。</li>
          <li><strong>エ　×：</strong>オープンソースソフトウェアとは、ソースコードが公開されているソフトウェアのことであり、無料で利用できるソフトウェアという意味ではありません。有料で販売されているオープンソースソフトウェアもあります。</li>
        </ul>
      </div>
    )
  }
];

// --- メインコンポーネント ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home', 'quiz', 'history'
  const [historyData, setHistoryData] = useState({});
  const [activeQuizQuestions, setActiveQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // 初回ロード時に localStorage から履歴を取得
  useEffect(() => {
    try {
      const stored = localStorage.getItem('smart_quiz_history');
      if (stored) {
        setHistoryData(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
      setHistoryData({});
    }
  }, []);

  // 履歴が更新されたら localStorage に保存
  const saveHistory = (newData) => {
    try {
      localStorage.setItem('smart_quiz_history', JSON.stringify(newData));
      setHistoryData(newData);
      console.log("History saved", newData);
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  };

  // 統計情報の計算
  const stats = useMemo(() => {
    let correct = 0, wrong = 0, review = 0;
    Object.values(historyData || {}).forEach(item => {
      if (item?.correct === true) correct++;
      if (item?.correct === false) wrong++;
      if (item?.review === true) review++;
    });
    return { correct, wrong, review, total: quizData.length, answered: correct + wrong };
  }, [historyData]);

  // クイズ開始
  const startQuiz = (mode) => {
    let questions = [];
    if (mode === 'all') {
      questions = [...quizData];
    } else if (mode === 'wrong') {
      questions = quizData.filter(q => historyData[q.id]?.correct === false);
    } else if (mode === 'review') {
      questions = quizData.filter(q => historyData[q.id]?.review === true);
    }

    if (questions.length === 0) {
      alert("該当する問題がありません。");
      return;
    }

    console.log(`Starting quiz with mode: ${mode}, questions: ${questions.length}`);
    setActiveQuizQuestions(questions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentScreen('quiz');
  };

  // 回答処理
  const handleAnswer = (index) => {
    if (isAnswered) return;
    
    setSelectedAnswer(index);
    setIsAnswered(true);

    const question = activeQuizQuestions[currentIndex];
    const isCorrect = index === question.correctIndex;

    const newHistory = { ...historyData };
    const prevReview = newHistory[question.id]?.review || false;

    newHistory[question.id] = {
      correct: isCorrect,
      review: prevReview,
      lastAnswered: new Date().toISOString()
    };
    
    saveHistory(newHistory);
  };

  // 要復習トグル
  const toggleReview = (id) => {
    const newHistory = { ...historyData };
    const currentStatus = newHistory[id] || {};
    newHistory[id] = {
      ...currentStatus,
      review: !currentStatus.review
    };
    saveHistory(newHistory);
  };

  // 次の問題へ
  const handleNext = () => {
    if (currentIndex < activeQuizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      window.scrollTo(0, 0);
    } else {
      setCurrentScreen('home');
    }
  };

  // 画面レンダリング: ホーム
  const renderHome = () => {
    const chartData = [
      { name: '正解', value: stats.correct, color: '#10B981' },
      { name: '不正解', value: stats.wrong, color: '#EF4444' },
      { name: '未回答', value: stats.total - stats.answered, color: '#E5E7EB' }
    ];

    return (
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">スマート問題集：コンピュータの基礎</h1>
          <p className="text-gray-500 mb-6">全 {stats.total} 問収録</p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
             <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600 font-bold">正解</div>
                <div className="text-2xl font-bold text-green-700">{stats.correct}</div>
             </div>
             <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm text-red-600 font-bold">不正解</div>
                <div className="text-2xl font-bold text-red-700">{stats.wrong}</div>
             </div>
             <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-sm text-yellow-600 font-bold">要復習</div>
                <div className="text-2xl font-bold text-yellow-700">{stats.review}</div>
             </div>
          </div>

          <div className="h-48 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={50} outerRadius={80} dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => startQuiz('all')}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center justify-center transition"
            >
              <Play className="mr-2" size={20} /> すべての問題を解く
            </button>
            <div className="flex space-x-3">
               <button 
                 onClick={() => startQuiz('wrong')}
                 className="flex-1 py-3 px-4 bg-white border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-lg font-bold flex items-center justify-center transition"
               >
                 <AlertCircle className="mr-2" size={20} /> 不正解のみ
               </button>
               <button 
                 onClick={() => startQuiz('review')}
                 className="flex-1 py-3 px-4 bg-white border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 rounded-lg font-bold flex items-center justify-center transition"
               >
                 <Bookmark className="mr-2" size={20} /> 要復習のみ
               </button>
            </div>
            <button 
              onClick={() => setCurrentScreen('history')}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold flex items-center justify-center transition mt-4"
            >
              <List className="mr-2" size={20} /> 履歴と問題一覧
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 画面レンダリング: クイズ
  const renderQuiz = () => {
    const question = activeQuizQuestions[currentIndex];
    const isCorrect = isAnswered && selectedAnswer === question.correctIndex;

    return (
      <div className="max-w-2xl mx-auto p-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentScreen('home')} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <Home size={20} />
          </button>
          <div className="text-gray-500 font-bold">
            問題 {currentIndex + 1} / {activeQuizQuestions.length}
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${((currentIndex + 1) / activeQuizQuestions.length) * 100}%` }}></div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <div className="flex justify-between items-start mb-4">
             <h2 className="text-lg font-bold text-gray-800">問題 {question.id}: {question.title}</h2>
             <button 
               onClick={() => toggleReview(question.id)}
               className={`p-2 rounded flex items-center text-sm font-bold border ${historyData[question.id]?.review ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
             >
               <Bookmark size={16} className="mr-1" fill={historyData[question.id]?.review ? "currentColor" : "none"} /> 
               要復習
             </button>
          </div>
          <div className="text-gray-700 mb-6 whitespace-pre-wrap leading-relaxed">
            {question.text}
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              let btnClass = "w-full text-left p-4 rounded-lg border-2 transition ";
              if (!isAnswered) {
                btnClass += "border-gray-200 hover:border-blue-400 hover:bg-blue-50";
              } else {
                if (index === question.correctIndex) {
                  btnClass += "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer) {
                  btnClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  btnClass += "border-gray-200 opacity-50";
                }
              }

              return (
                <button
                  key={index}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(index)}
                  className={btnClass}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 font-bold text-sm ${isAnswered && index === question.correctIndex ? 'bg-green-500 text-white' : isAnswered && index === selectedAnswer ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
                       {isAnswered && index === question.correctIndex && <Check size={16} />}
                       {isAnswered && index === selectedAnswer && index !== question.correctIndex && <X size={16} />}
                       {!isAnswered && (index + 1)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {isAnswered && (
          <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-t-blue-500 animate-fade-in mb-24">
            <div className={`text-xl font-bold mb-4 flex items-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? <><Check className="mr-2" /> 正解！</> : <><X className="mr-2" /> 不正解...</>}
            </div>
            <div className="prose max-w-none text-gray-700">
              {question.explanation}
            </div>
          </div>
        )}

        {isAnswered && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg flex justify-center">
             <div className="max-w-2xl w-full flex justify-end">
               <button 
                 onClick={handleNext}
                 className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold flex items-center"
               >
                 {currentIndex < activeQuizQuestions.length - 1 ? '次の問題へ' : '結果に戻る'} <ChevronRight className="ml-2" />
               </button>
             </div>
          </div>
        )}
      </div>
    );
  };

  // 画面レンダリング: 履歴・一覧
  const renderHistory = () => {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <button onClick={() => setCurrentScreen('home')} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 mr-4">
            <Home size={20} />
          </button>
          <h1 className="text-xl font-bold">問題一覧と履歴</h1>
        </div>

        <div className="space-y-3">
          {quizData.map((q) => {
            const status = historyData[q.id];
            return (
              <div key={q.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex-1 pr-4">
                   <h3 className="font-bold text-gray-800">問題 {q.id}: {q.title}</h3>
                   <div className="text-sm text-gray-500 mt-1 flex items-center">
                     状態: 
                     {status?.correct === true && <span className="text-green-600 font-bold ml-2 flex items-center"><Check size={14} className="mr-1"/> 正解</span>}
                     {status?.correct === false && <span className="text-red-600 font-bold ml-2 flex items-center"><X size={14} className="mr-1"/> 不正解</span>}
                     {status?.correct === undefined && <span className="text-gray-400 ml-2">未回答</span>}
                   </div>
                </div>
                <div>
                   <button 
                     onClick={() => toggleReview(q.id)}
                     className={`p-2 rounded-full border ${status?.review ? 'bg-yellow-100 text-yellow-600 border-yellow-300' : 'bg-gray-50 text-gray-300 border-gray-200'}`}
                   >
                     <Bookmark size={20} fill={status?.review ? "currentColor" : "none"} />
                   </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {currentScreen === 'home' && renderHome()}
      {currentScreen === 'quiz' && renderQuiz()}
      {currentScreen === 'history' && renderHistory()}
    </div>
  );
}