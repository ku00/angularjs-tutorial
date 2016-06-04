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

コントローラ( Controller )は、関数と値の定義によってアプリの振る舞いを定義する。

**app.js**

```javascript
(function(){
  var app = angular.module('store',[]);

  app.controller('StoreController', function(){

  });
})();
```

コントローラ内にデータを保存しておくには次のように書くとよい。

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

保存したデータを使うには ng-controller で呼び出すコントローラを指定する必要がある。

コントローラの範囲は ng-controller を追加したタグの内側のみ。

`as store` の部分はコントローラ名のエイリアスである。

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

## ng-include

HTML コードの一部を切り出したい場合は、 ng-include を使うといい。

まず、切り出したいコードを書く。

**product-title.html**

```html
{{product.name}}
<em class="pull-right">${{product.price}}</em>
```

ng-include に切り出したファイル名を指定する。

**index.html**

```html
<h3 ng-include="'product-title.html'"></h3>
```

## Custom Directive

先ほど ng-include を使って作ったものをディレクティブとして定義してみる。

カスタムディレクティブは、

- 拡張または置換されたタグや属性を定義する
- 必要であれば、コントローラのロジックを含めることもできる

次のように書くことで、ディレクティブを定義するできる。

**index.html**

```html
<product-title></product-title>
```

**app.js**

```javascript
app.directive('productTitle', function(){
  return {
    restrict: 'E',
    templateUrl: 'product-title.html'
  };
});
```

### Attribute vs Element Directives

要素のディレクティブは、 `/>` で閉じることができない。さらにいくつかのブラウザには `/>` に対応していないものがある。

```html
<!-- NG -->
<product-title/>
```

属性のディレクティブなら、振る舞いを組み合わせるために、UI部品と一緒に使うことができる。

```html
<h3 product-title></h3>
```

次のように書くことで、属性のディレクティブを定義することができる。

**index.html**

```html
<h3 product-title></h3>
```

**app.js**

```javascript
app.directive('productTitle', function(){
  return {
    restrict: 'A',
    templateUrl: 'product-title.html'
  };
});
```

このように、ディレクティブはよりよいHTMLを書く手助けをしてくれる。

あなたが動的なWebアプリケーションを考えるときに、HTMLを見ただけでその機能性を理解することができますか。できないですよね。

でも、AngularJS アプリケーションを書いているときには、HTMLからその振る舞いと目的を理解できるべきです。そして表現的なHTMLを書くためにカスタムディレクティブを使うでしょう。

### Moving the Controller Inside

次のようなコントローラとディレクティブがあったとする。

**index.html**

```html
<product-panels ng-controller="PanelController as panels">
  ...
</product-panels>
```

**app.js**

```javascript
app.directive('productPanels', function(){
  return {
    restrict: 'E',
    templateUrl: 'product-panels.html'
  };
});
app.controller('PanelController', function(){
  ...
});
```

このとき、コントローラをディレクティブに含めることができる。

次のように書く。

**index.html**

```html
<product-panels>
  ...
</product-panels>
```

**app.js**

```javascript
app.directive('productPanels', function(){
  return {
    restrict: 'E',
    templateUrl: 'product-panels.html',
    controller: function(){
      ...
    },
    controllerAs: 'panels'
  };
});
```

## Add dependencies

次のコードのようにまとまりそうな複数のディレクティブが存在するとき、これらをリファクタリングするにはモジュールの依存性を利用するとよい。

**app.js**

```javascript
(function(){
  var app = angular.module('store', []);
  app.controller('StoreController', function(){...});

  app.directive('productTitle', function(){...});
  app.directive('productGallery', function(){...});
  app.directive('productPanels', function(){...});

  ...
});
```

まず product.js のような別ファイルを作成して、 app.js とは異なるモジュール store-products を定義する。

そして、そこにディレクティブをまとめて移す。

**product.js**

```javascript
(function(){
  var app = angular.module('store-products', []);

  app.directive('productTitle', function(){...});
  app.directive('productGallery', function(){...});
  app.directive('productPanels', function(){...});
});
```

次に store モジュールの2つ目の引数に、先ほど作成した store-products モジュールを追加する。

**app.js**

```javascript
(function(){
  var app = angular.module('store', ['store-products']);
  app.controller('StoreController', function(){...});
  ...
});
```

最後にhtmlファイルから products.js を読み込むのを忘れないように。

**index.html**

```html
<body ng-controller="StoreController as store">
  ...
  <script src="angular.js"></script>
  <script src="app.js"></script>
  <script src="products.js"></script>  
</body>
```

## Service

次のコードの this.products に格納されるデータを、直書きするのではなく、APIから取得するようにしたい。

```javascript
(function(){
  var app = angular.module('store', ['store-products']);

  app.controller('StoreController', function(){
    this.products = [
      { name: '...', price: 1.99, ...},
      { name: '...', price: 1.99, ...},
      { name: '...', price: 1.99, ...},
      ...
    ];
  });
});
```

こんなときはサービス( Service )を使うとよい。サービスにはコントローラに追加の機能を与える。

例えば、

  - WebサービスからJSONデータを取得する $http
  - Javascriptコンソールにメッセージをロギングする $log
  - 配列をフィルタリングする $filter

などがある。

今回の問題は $http を使えば解決できる。

### $http

オプションのオブジェクトを含んだ関数として使う場合は、次のように書く。

```javascript
$http({ method: 'GET', url: '/products.json'});
```

またはショートカットメソッドを使って次のように書くこともできる。

```javascript
$http.get('products.json', { apiKey: 'myApiKey' });
```

これらは .success() と .error() を含んだ Promise オブジェクトを返す。

$http でJSONを取得した場合は、その結果を自動的に Javascript オブジェクトと配列にデコードする。

### How does a Controller use a Service

サービスを使うには、次のように定義する。

```javascript
app.controller('SomeController', ['$http', '$log', function($http, $log){
  ...
}]);
```

サービスは、コントローラが実行されるときに依存するものとして一緒に読み込まれる。

### Let's use our Service

はじめの問題に戻ってみる。

> 次のコードの this.products に格納されるデータを、直書きするのではなく、APIから取得するようにしたい。

```javascript
(function(){
  var app = angular.module('store', ['store-products']);

  app.controller('StoreController', function(){
    this.products = [
      { name: '...', price: 1.99, ...},
      { name: '...', price: 1.99, ...},
      { name: '...', price: 1.99, ...},
      ...
    ];
  });
});
```

$http を使って次のように書き直せる。

```javascript
(function(){
  var app = angular.module('store', ['store-products']);

  app.controller('StoreController', ['$http', function($http){
    var store = this;
    store.products = [];

    $http.get('/products.json').success(function(data){
      store.products = data;
    });
  }]);
});
```

$http は get() 関数以外にも post(), put(), delete() などがある。

```javascript
$http.post('/path/to/resource.json', { param: 'value' });

$http.delete('/path/to/resource.json');
```
