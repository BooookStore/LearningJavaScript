{
  // シンプルなクラス定義
  // 基礎
  // コンストラクタと呼ぶのが正しい。
  // JavaScriptでは関数(Functionオブジェクト)にクラスとしての役割を与えている。
  //
  // thisが指しているのはCallオブジェクト？
  // 関数とコンストラクタ関数はどう異なる？　-> new で呼び出されればみんなコンストラクタだろう。
  let Member = function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.getName = function() {
      return this.firstName + ' ' + this.lastName;
    }
  };

  // インスタンス化
  let mem = new Member('ABC', 'DEF');
  console.log(mem.getName());

  // 動的に関数を追加
  mem.getLastName = function() {
    return this.lastName;
  }

  console.log(mem.getLastName());
}

// thisキーワード
{
  let data = 'Global data';
  let obj1 = {
    data: 'obj1 data'
  };
  let obj2 = {
    data: 'obj2 data'
  };

  function hoge() {
    console.log(this.data);
  }

  // this キーワードが指すオブジェクトを call の引数によって指定する。
  hoge.call(null);
  hoge.call(obj1);
  hoge.call(obj2);

  // 配列ライクなオブジェクトを配列に変換
  function hoge2() {
    var args = Array.prototype.slice.call(arguments);
    console.log(args.join('/'));
  }

  hoge2('Anguler', 'React', 'Backbone');
}

// コンストラクターの強制的な呼び出し
{
  let Member = function(firstName, lastName) {

    // コンストラクタが普通の関数として呼び出されれば、thisはグローバルオブジェクトを指す。
    // ※Strictモードでは undefined になるため、使えない。
    if (!(this instanceof Member)) {
      return new Member(firstName, lastName);
    }
    this.firstName;
    this.lastName;
  };
}

// prototype
{
  let Member = function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // prototypeに対してメソッドを追加。
  // 以降、Memberを新規に作成すればすべてのインスタンスがこのメソッドを参照可能になる。
  Member.prototype.getName = function() {
    return this.firstName + ' ' + this.lastName;
  }

  var mem = new Member('AAA', 'BBB');
  console.log(mem.getName());

  let Member2 = function() {};
  Member2.prototype.sex = '男';
  let mem1 = new Member2();
  let mem2 = new Member2();

  console.log(mem1.sex + '|' + mem2.sex);
  Member2.prototype.sex = '女';
  console.log(mem1.sex + '|' + mem2.sex);

  // オブジェクトリテラルによるprototypeへのメンバーの追加
  let Member3 = function(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  };

  Member3.prototype = {
    getName: function() {
      return this.lastName + ' ' + this.firstName;
    },
    toString: function() {
      return this.lastName + this.firstName;
    }
  };

  // 静的プロパティ・静的メソッドを定義
  let Area = function() {};
  Area.version = '1.0';
  Area.triangle = function(base, height) {
    return base * height / 2;
  };
  Area.diamond = function(width, height) {
    return width * height / 2;
  };

  console.log('Areaクラスのバージョン:' + Area.version);
  console.log('三角形の面積:' + Area.triangle(5, 3));

  let a = new Area();
  // console.log(a.version()); // 結果：エラー
}

// prototype chane
{
  let Animal = function() {};

  Animal.prototype = {
    walk: function() {
      console.log('walking...');
    }
  };

  let Dog = function() {
    // Animalコンストラクターを現在の this で呼び出す。
    Animal.call(this);
  };

  Dog.prototype = new Animal(); // Dogインスタンスから、Animalで定義されたメンバへアクセス可能。
  Dog.prototype.bark = function() {
    console.log('bau bau ...');
  }

  let d = new Dog();
  d.walk();
  d.bark();
}

// 継承関係の動的な変更
{
  let Animal = function() {};
  Animal.prototype = {
    walk: function() {
      console.log('walking ... ');
    }
  };

  let SuperAnimal = function() {};
  SuperAnimal.prototype = {
    walk: function() {
      console.log('daaaaa ... ');
    }
  };

  let Dog = function() {};
  Dog.prototype = new Animal(); // 注目
  let d1 = new Dog();

  Dog.prototype = new SuperAnimal(); // 注目
  let d2 = new Dog();

  d1.walk();
  d2.walk();
}

// オブジェクトの方判定
{
  let Animal = function() {};
  let Hamster = function() {};
  Hamster.prototype = new Animal();

  let a = new Animal();
  let b = new Hamster();

  // 元となるコンストラクターの取得
  console.log(a.constructor === Animal); // true
  console.log(b.constructor === Animal); // true
  console.log(b.constructor === Hamster); // false

  // 元となるコンストラクターの判定
  console.log(b instanceof Animal); // true
  console.log(b instanceof Hamster); // true

  // 参照しているプロトタイプの確認
  console.log(Hamster.prototype.isPrototypeOf(b)); // true
  console.log(Animal.prototype.isPrototypeOf(b)); // true

  // メンバーの有無の確認
  let obj = {
    hoge: function() {},
    foo: function() {}
  };

  console.log('hoge' in obj); // true
  console.log('piyo' in obj); // false
}

// private なメンバを作成
{
  function Triangle() {

    // プライベートプロパティの定義
    var _base;
    var _height;

    //　プライベートメソッドの定義
    var _checkArgs = function(val) {
      return (typeof val === 'number' && val > 0);
    }

    // パブリックメソッド
    this.setBase = function(base) {
      if (_checkArgs(base)) {
        _base = base;
      }
    }

    this.getBase = function() {
      return _base;
    }

    this.setHeight = function(height) {
      if (_checkArgs(height)) {
        _height = height;
      }
    }

    this.getHeight = function() {
      return _height;
    }

    this.getArea = function() {
      return this.getBase() * this.getHeight() / 2;
    }
  }

  let t = new Triangle();
  t._base = 10;
  t._height = 2;
  console.log(t.getArea()); // 結果： NaN

  t.setBase(10);
  t.setHeight(2);
  console.log(t.getBase());
  console.log(t.getHeight());
  console.log(t.getArea());
}

// getter/setter の便利な定義方法
{
  function Triangle() {
    var _base;
    var _height;

    Object.defineProperty(
      this,
      'base', {
        get: function() {
          return _base;
        },
        set: function(base) {
          if (typeof base === 'number' && base > 0) {
            _base = base;
          }
        }
      }
    );

    Object.defineProperty(
      this,
      'height', {
        get: function() {
          return _height;
        },
        set: function(height) {
          if (typeof height === 'number' && height > 0) {
            _height = height;
          }
        }
      }
    );

    this.getArea = function() {
      return this.base * this.height / 2;
    }
  };

  const t = new Triangle();
  t.base = 10;
  t.height = 2;
  console.log(t.getArea());

}
