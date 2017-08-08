function drawStocksChart(names) {
  var seriesOptions = [];
  var seriesCounter = 0;

  function createChart() {
    Highcharts.stockChart('container', {
      rangeSelector: {
        selected: 4
      },

      yAxis: {
        labels: {
          formatter: function () {
            return (this.value > 0 ? ' + ' : '') + this.value + '%';
          }
        },
        plotLines: [{
          value: 0,
          width: 2,
          color: 'silver'
        }]
      },

      plotOptions: {
        series: {
          compare: 'percent',
          showInNavigator: true
        }
      },

      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2,
        split: true
      },

      series: seriesOptions
    });
  }

  $.each(names, function (i, name) {
    var url = 'https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?';

    $.getJSON(url, function (data) {
      seriesOptions[i] = {
        name: name,
        data: data
      };
      seriesCounter += 1;
      if (seriesCounter === names.length) {
        createChart();
      }
    });
  });
}
