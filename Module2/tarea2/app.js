(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var tobuy = this;
  tobuy.tobuylist = ShoppingListCheckOffService.tobuy;
  console.log(tobuy.tobuylist);
  tobuy.buy = function (index) {
    ShoppingListCheckOffService.buy(index);
    console.log('ToBuyController clicked ' + tobuy.tobuylist.length );
    if( tobuy.tobuylist.length <= 0 )
    {
      tobuy.emptyMessage = "Everything is bought!";
      console.log(tobuy.emptyMessage);
    }
  };
}

function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.boughtlist = ShoppingListCheckOffService.bought;

  bought.isEmpty = function () {
    return bought.boughtlist.length <= 0;
  };
}


function ShoppingListCheckOffService() {
  var service = this;
  service.tobuy = [];
  service.bought = [];

  service.addTobuy = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    service.tobuy.push(item);
    console.log('Added ' + quantity + ' of ' + itemName);
  };

  service.buy = function (itemIndex) {
    var item = service.tobuy[itemIndex];
    service.bought.push(item);
    service.tobuy.splice(itemIndex, 1);
    console.log('Bought: ' + item.name);
  };

  service.addTobuy('cookies', '10 bags');
  service.addTobuy('chocolate', '5 bars');
  service.addTobuy('Pepto bismol', '1 bottle');
  service.addTobuy('carrots', '1 Kg');
  console.log(this);
}


})();
