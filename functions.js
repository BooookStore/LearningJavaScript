// 関数の生成
{
  // 生成方法　その１
  function getTriangle(base, height) {
    return base * height / 2;
  }

  console.log(getTriangle(3, 6));

  // 生成方法　その２
  let getTriangle2 = new Function('base', 'height', 'return base * height / 2;');
  console.log(getTriangle2(3, 6));

  // 生成方法　その３
  // 関数リテラルを使って関数を生成。無名関数を生成したあと変数に代入している。
  let getTriangle3 = function(base, height) {
    return base * height / 2;
  };
  console.log(getTriangle3(3, 6));

  //　生成方法　その４
  //　アロー関数ではthisが肯定される。
  let getTriangle4 = (base, height) => base * height / 2;
  console.log(getTriangle4(3, 6));
}

// 関数の注意点
{
  // function命令による関数定義はコードが解析される段階で登録される。
  console.log(getTriangle(3, 6));

  function getTriangle(base, height) {
    return base * height / 2;
  }
}

// スコープ
{
  // 変数の巻き上げ
  // 変数は必ず先頭で宣言しなければならない

  var scope = 'GLOBAL';

  function getValue() {
    console.log(scope);
    var scope = 'LOCAL';
    return scope;
  }

  console.log(getValue());
}

// 引数(非ES2015)
{
  // 引数の数はチェックされない。
  function showMessage(value) {
    console.log(value);
  }

  showMessage();
  showMessage('Hello');
  showMessage('Hello', 'World');

  function showMessage2(value) {
    if (arguments.length !== 1) {
      throw new Error('引数の個数が異なります。')
    }

    console.log(value);
  }

  try {
    showMessage2('a', 'b');
  } catch (e) {
    console.log(e.message);
  }

  // 可変引数
  function sum() {
    let result = 0;

    for (let i = 0, len = arguments.length; i < len; i++) {
      let temp = arguments[i];
      if (typeof temp !== 'number') {
        throw new Error('引数が数値ではありません。');
      }
      result += temp;
    }

    return result;
  }

  try {
    console.log(sum(1, 2, 3, 4));
  } catch (e) {
    console.log(e.message);
  }

  // 明示的に宣言された引数と、可変長引数を混同
  function printf(format) {

    for (let i = 0, len = arguments.length; i < len; i++) {
      console.log(arguments[i]);
    }

    for (let i = 0, len = arguments.length; i < len; i++) {
      let pattern = new RegExp('\\{' + (i - 1) + '\\}', 'g');
      format = format.replace(pattern, arguments[i]);
    }
    console.log(format);
  }

  printf('Hello, {0}. I am {1}.', 'A', 'B');

  // 名前付き引数（わかりにくい気がする）
  function getTriangle(args) {

    if (args.base === undefined) {
      args.base = 1;
    }

    if (args.height === undefined) {
      args.height = 1;
    }

    return args.base * args.height / 2;
  }

  console.log(getTriangle({
    base: 10,
    height: 20
  }));

}

// 引数(ES2015)
{
  // デフォルト引数
  function getTriangle(base = 1, height = 1) {
    return base * height / 2;
  }

  console.log(getTriangle(5));

  // 可変長引数
  // nums は　Arrayオブジェクト
  function sum(...nums) {
    let result = 0;
    for (let num of nums) {
      if (typeof num !== 'number') {
        throw new Error('指定値が数値ではありません');
      }
      result += num;
    }
    return result;
  }

  try {
    console.log(sum(1, 2, 3, 4));
  } catch (e) {
    console.log(e.message);
  }

  // 可変長引数の展開
  console.log(Math.max(15, -3, 4));
  console.log(Math.max(...[15, -3, 4]));

  // 名前付き引数（分割代入を使用）
  function getTriangle2({
    base = 1, height = 2
  }) {
    return base * height / 2;
  }

  console.log(getTriangle2({
    base: 5,
    height: 5
  }));

}

// 関数呼び出しと戻り値
{
  function getMaxMin(...nums) {
    return [Math.max(...nums), Math.min(...nums)];
  }

  let [max, min] = getMaxMin(1, 2, 3, 4, 5);
  let [, min2] = getMaxMin(1, 2, 3, 4, 5); // minだけ必要な場合
  let [, min3, foo3] = getMaxMin(1, 2, 3, 4, 5);
  console.log(foo3); // undefinedになる

  // 高階関数
  function arrayWalk(data, f) {
    for (let key in data) {
      f(key, data[key]);
    }
  }

  arrayWalk([1, 2, 3, 4], (k, v) => console.log(k + ':' + v));
}

// その他高度なテーマ
{

  // テンプレート文字列
  function escapeHtml(str) {
    if (!str) {
      return '';
    }

    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');

    return str;
  }

  function e(templates, ...values) {
    let result = '';
    for (let i = 0, len = templates.length; i < len; i++) {
      result += templates[i] + escapeHtml(value[i]);
    }
    return result;
  }

  let name = '<"Mario" & \'Luigi\'>';
  console.log(e `Hello!!,${name}`);

  // スコープチェーン
  var x = 'Global';

  function outerFunc() {
    var y = 'Local Outer';

    function innerFunc() {
      var z = 'Local Inner';
      console.log(x);
      console.log(y);
      console.log(z);
    }

    innerFunc();
  }
  outerFunc();

  // クロージャ
  function closure(init) {
    var counter = init; // 戻り地の匿名関数で参照されるので、残り続ける。

    return function() {
      return ++counter;
    }
  }

  // ・匿名関数を表すCallオブジェクト
  // ・closure関数のCallオブジェクト
  // ・グローバルオブジェクト
  var myClosure = closure(1);
  console.log(myClosure());
  console.log(myClosure());
  console.log(myClosure());
}
