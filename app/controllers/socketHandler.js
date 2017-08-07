'use strict';

const Stock = require('../models/stocks');

function SocketHandler(io) {
  this.handle = function(socket) {
    Stock
      .find({})
      .exec((err, result) => {
        var stocks = result[0] ? result[0].stocks : [];
        io.emit('stock change', stocks);
      })

    socket.on('disconnect', function () {
      console.log('A user is disconnected');
    });

    socket.on('stock change', function(stocks) {
      Stock
        .remove({})
        .exec(addNewStocks);

      function addNewStocks() {
        var newsStocks = new Stock({stocks: stocks});
        newsStocks
          .save((err, result) => {
            io.emit('stock change', stocks);
          })
      }
    });
  }
}

module.exports = SocketHandler;
