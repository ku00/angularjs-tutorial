## なぜ Angular なのか

動的なサイトを作るのに Javascript を使う場合には Angular はいい選択である。

- Javascript のコードの整理に役立つ
- レスポンシブなサイトの作成に役立つ
- jQuery と相性がよい
- テストが簡単

## Angular を使ったレスポンシブなサイト

1. URLリクエストをサーバに送る(Web Browser)
2. ウェブページと Assets を返す(Web Server)
3. ユーザがリンクをクリックすると、新しいリクエストを送る(Web Browser)
4. JSONデータを返す(Web Server)

## Angular JS とは何か

HTMLに双方向性を持たせるための、クライアントサイド Javascript フレームワークである。

Javascript のコードを実行したいとき、 HTML にそれをどう伝えるか

## Directives

ディレクティブ( Directive ) は HTML タグの目印である。 Angular に Javascript のコードの実行や参照することを伝える。

js ファイルに呼ぶための関数名を定義して、 `ng-controller` で呼び出す。

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

作ったモジュールを読み込むには `ng-app` を使う。

**index.html**

```html
<html ng-app="store">
...
</html>
```

## Expressions

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

保存したデータを使うには `ng-controller` で呼び出すコントローラーを指定する必要がある。

コントローラーの範囲は `ng-controller` を追加したタグの内側のみ。

`as store` の部分はコントローラー名のエイリアスである。

**index.html**

```html
<div ng-controller="StoreController as store">
  <h1> {{store.product.name}} </h1>
  <h2> {{store.product.price}} </h2>
  <p> {{store.product.description}} </p>
</div>
```
