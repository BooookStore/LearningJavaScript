// Stringリテラル型
let name = 'Bob';

// テンプレート文字列
// ${ ... } で変数を埋め込むことができる
let msgWether = `Hello,${name}\ntoday is Hot.`;

// 定数の宣言
const TAX = 1.08;

// 配列リテラル
let data = ['JavaScript', ['JQuery', 'prototype.js'], 'ASP.NET'];

console.log(data);
console.log(data[0]);
console.log(data[1][0]);

// オブジェクトリテラル
// 連想配列などとも呼ばれるが、オブジェクトと連想配列は同一のもの。
let obj = {
  x: 1,
  y: 2,
  z: 3
};
console.log(obj.x);
console.log(obj['x']);

{
  // 分割代入
  // 配列の個々の要素を一度に変数へ取り出すことができる
  let [x0, [x1, x2], x3, x4 = 'なし'] = data;
  console.log(x1);
  console.log(x4);

  // 分割代入はオブジェクトでもできる
  let book = {
    title: 'Java',
    publish: 'Oracle',
    price: '2800'
  };
  let {
    price,
    title,
    memo = 'なし'
  } = book;
  console.log(price);
  console.log(memo);

  // オブジェクトの分割代入で別名を指定
  let {
    title: name,
    publish: company
  } = book;
  console.log(name);
  console.log(company);
}

// 制御構文
{
  let data = {
    apple: 150,
    orange: 100,
    banana: 120
  };

  // for ... in 文
  // var は値のインデックス値。
  // オブジェクトのプロパティに対して順にアクセスしたい時に使用する。
  // 順序は保証されない。
  // 配列に対して行うと、拡張された機能に対しても列挙することになり可読性が低下する恐れあり。
  for (var key in data) {
    console.log(`${key} is ${data[key]}.`);
  }

  let data2 = [
    'apple',
    'orange',
    'banana'
  ]

  // for ... of 文
  // var は値そのもの。
  // for ... in と異なり、拡張された機能を列挙しない仕組み。
  // 配列だけでなく、Arrayライクなオブジェクトを処理可能。
  Array.prototype.hoge = function() {}

  for (var value of data2) {
    console.log(value);
  }
}

// 基本データ型
// 基本データを扱うためのオブジェクト
{
  // String
  let str = 'Hello,World!';
  console.log(str.includes('Hello'));
  console.log(str.substr(0, 5));
  console.log(str.substring(1, 6));

  // Stringにおけるサロゲート文字の扱い方
  let msg = '叱る';
  let num = msg.split(/[¥uD800-¥uDBFF][¥uDC00-¥uDFFF]/g).length - 1;
  console.log(msg.length - num);

  // Number
  let n = '123xx4xx'
  console.log(Number(n));
  console.log(Number.parseInt(n)); // 前から順に見ていき、数値化できる部分のみを数値化

  // Symbol
  let sym1 = Symbol('sym'); // new は使用しない
  let sym2 = Symbol('sym');
  console.log(typeof sym1);
  console.log(sym1.toString());
  console.log(sym1 === sym2);

  // Symbolは列挙隊のように利用可能
  let MONDAY = Symbol();
  let TUESDAY = Symbol();
  console.log(MONDAY === MONDAY);
  console.log(MONDAY === TUESDAY);

  // Arrayオブジェクト
  let ary = new Array(1, 2, 3, 4);
  let ary3 = new Array(10); // 配列のサイズを指定
  let ary2 = [1, 2, 3, 4]; // こっちを使うべき！！！

  ary2.push(5);
  console.log(ary2);
  ary2.pop();
  console.log(ary2);

  ary2.shift();
  console.log(ary2);
  ary2.push(5);
  console.log(ary2);

  // spliceは元の配列に影響を与える。
  // sliceは元の配列に影響を与えない。
  let sliced = ary2.slice(1, 3);
  console.log(sliced);
  let sliced2 = ary2.splice(1, 0, 90);
  console.log(ary2);

  // sort関数。無名関数利用可能。
  console.log(ary2.sort(function(x,y) { return x - y; }));
  console.log(ary2.sort((x,y) => x - y));
}
