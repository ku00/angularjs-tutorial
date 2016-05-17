(function(){
  var gems = [
    {
      name: 'Dodecahedron',
      price: 2.95,
      description: 'I am cat! I am cat! I am cat! I am cat! I am cat! I am cat! I am cat!',
      canPurchase: true,
    },
    {
      name: 'Pentagonal Gem',
      price: 5.95,
      description: 'We are sorry, but something went wrong...',
      canPurchase: false,
    },
  ];

  var app = angular.module('store', []);

  app.controller('StoreController', function(){
    this.products = gems;
  });
})();
