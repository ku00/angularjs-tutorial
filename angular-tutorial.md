## Why Angular?

動的なサイトを作るのに Javascript を使う場合には Angular はいい選択である。

- Javascript のコードの整理に役立つ
- レスポンシブなサイトの作成に役立つ
- jQuery と相性がよい
- テストが簡単

## A "responsive" website using Angular

1. URLリクエストをサーバに送る(Web Browser)
2. ウェブページと Assets を返す(Web Server)
3. ユーザがリンクをクリックすると、新しいリクエストを送る(Web Browser)
4. JSONデータを返す(Web Server)

## What's Angular JS?

HTMLに双方向性を持たせるための、クライアントサイド Javascript フレームワークである。

Javascript のコードを実行したいとき、 HTML にそれをどう伝えるか

## Directives

ディレクティブ( Directive ) は HTML タグの目印である。 Angular に Javascript のコードの実行や参照することを伝える。

js ファイルに呼ぶための関数名を定義して、 ng-controller で呼び出す。

**index.html**

```html
<body ng-controller="StoreController">
...
</body>
```

**app.js**

```javascript
function StoreController(){
  alert('Welcome, Gregg!');
}
```

## Modules

モジュール( Module )は、

- Angular アプリの部品を書く
- 我々のコードをメンテナンスしやすく、テストをしやすく、読みやすくする
- アプリのための依存を定義する

モジュールを作るには、こうする。

**app.js**

```javascript
var app = angular.module('store', []);
```

`store` がアプリケーション名であり、その後の `[]` に依存を書く。

作ったモジュールを読み込むには ng-app を使う。

**index.html**

```html
<html ng-app="store">
...
</html>
```

## Expression

HTML 内に動的な値を埋め込むことができる。

```html
<p>I am {{4 + 6}}</p>
<p>{{"hello" + "you"}}</p>

// evaluates to
<p>I am 10</p>
<p>hello you</p>
```

## Controllers

コントローラー( Controller )は、関数と値の定義によってアプリの振る舞いを定義する。

**app.js**

```javascript
(function(){
  var app = angular.module('store',[]);

  app.controller('StoreController', function(){

  });
})();
```

コントローラー内にデータを保存しておくには次のように書くとよい。

**app.js**

```javascript
(function(){
  var app = angular.module('store',[]);

  app.controller('StoreController', function(){
    this.product = gem;
  });

  var gem = {
    name: 'neko',
    price: 301.95,
    description: '. . .',
  }
})();
```

保存したデータを使うには ng-controller で呼び出すコントローラーを指定する必要がある。

コントローラーの範囲は ng-controller を追加したタグの内側のみ。

`as store` の部分はコントローラー名のエイリアスである。

**index.html**

```html
<div ng-controller="StoreController as store">
  <h1> {{store.product.name}} </h1>
  <h2> ${{store.product.price}} </h2>
  <p> {{store.product.description}} </p>
</div>
```

## some Directives

### ng-show / ng-hide

ng-show は与えられた値が true のときに要素を表示する。

```html
<button ng-show="store.product.canPurchase"> Add to Cart </button>
```

一方、 ng-hide は与えられた値が true のときに要素を非表示にする。

```html
<div ng-hide="store.prodcut.soldOut">
  <h1> {{store.product.name}} </h1>
  ...
</div>
```

### ng-repeat

先ほどの gem を複数個扱うためには配列を使えばよい。

**app.js**

```javascript
app.controller('StoreController', function(){
  this.products = gems;
});

var gems = [
  {
    name: 'neko-01',
    price: 301.95,
    description: '. . .',
  },
  {
    name: 'neko-02',
    price: 202.01,
    description: '. . .',
  },
  ...
];
```

配列に入ったデータをうまく利用するには ng-repeat を使うとよい。

**index.html**

```html
<div ng-repeat="product in store.products">
  <h1> {{product.name}} </h1>
  <h2> ${{product.price}} </h2>
  <p> {{product.description}} </p>
  <button ng-show="product.canPurchase"> Add to Cart </button>
</div>
```

### ng-src

img タグを使うときに src 属性に Angular の語句を使うことはできない。語句を評価する前に画像を読み込み始めてしまうためである。

```html
<!-- NG -->
<img src="{{product.images[0].full}}" />

<!-- OK -->
<img ng-src="{{product.images[0].full}}" />
```

### Other Directives

- ng-click
- ng-init
- ng-class

## Filter

フィルターを使うことでフォーマットを揃えることができる。

```html
<!-- date -->
{{'1388123412323' | date:'MM/dd/yyyy @ h:mma'}}   <!-- => 12/27/2013 @ 12:50AM -->


<!-- limitTo -->
{{ 'My description' | limitTo:8 }}   <!-- => My descr -->
```

date, limitTo 以外にもいろいろある。

## ng-model

ng-model はフォームの要素の値を、属性に束縛する。

```html
<form name="reviewForm">
  <select ng-model="review.stars">
    <option value="1">1 star</option>
    <option value="2">2 star</option>
  </select>
  <textarea ng-model="review.author"></textarea>
</form>
```

上のコードの select なら、 review.stars の値は 1 か 2 になる。

textarea なら、 入力された文字がそのまま review.author の値になる。

## Validations

Angular は、ディレクティブを使うことで、いくつかのすごいクライアントサイドのバリデーションを作り出す。

```html
<form ... ng-submit="reviewCtrl.addReview(product)" novalidate>
  <select ng-model="reviewCtrl.review.stars" required>
    <option value="1">1 star</option>
    ...
  </select>
  <input ng-model="reviewCtrl.review.author" type="email" required />

  <div> reviewForm is {{reviewForm.$valid}} </div>
</form>
```

novalidate を指定すると、デフォルトで有効になっているHTMLのバリデーションを無効にする。

required をつけると、そのフィールド値が必須になる。

.$valid でバリデーションの結果を出力できる。

### The Input Classes

```html
<input ng-model="reviewCtrl.review.author" type="email" required />
```

上記のような required が付いている ipnut タグがあるとき、バリデーションの結果によってさまざまな class が付与される。

```html
<!-- before typing email -->
<input class="ng-pristine ng-invalid">

<!-- after typing, with invalid -->
<input class="ng-dirty ng-invalid">

<!-- after typing, with valid -->
<input class="ng-dirty ng-valid">

```

email 以外にも HTML5 の type を基にしたバリデーションが、 Angular には用意されている。

- url
- number

etc...
