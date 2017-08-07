'use strict';

function SocketHandler(io) {
  this.handle = function(socket) {
    var names = ['MSFT', 'AAPL', 'GOOG'];
    io.emit('stock change', names);

    socket.on('disconnect', function () {
      console.log('A user is disconnected');
    });

    socket.on('stock change', function(stocks) {
      io.emit('stock change', stocks);
    });
  }
}

module.exports = SocketHandler;
