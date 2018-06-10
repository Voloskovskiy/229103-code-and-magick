'use strict';

// Создание облака с тенью и информации по игрокам
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_TEXT_X = 140;
var CLOUD_TEXT_Y = 40;
var CLOUD_TEXT_GAP = 15;

var TEXT_COLOR = '#000';
var TEXT_FONT = '16px PT Mono';
var GAMER_X = 140;
var GAMER_NAME_Y = 270;

var GAMER_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var TITLE_GAMER_BAR = 'Вы';
var COLOR_MAIN_BAR = 'rgba(255, 0, 0, 1)';

var barY = CLOUD_TEXT_Y + CLOUD_TEXT_GAP * 2;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};


// нахождение максимального элемента
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatisticsCloud = function (ctx) {
  // отрисовка облака
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  // отрисовка заголовка
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.fillText('Ура вы победили!', CLOUD_TEXT_X, CLOUD_TEXT_Y);
  ctx.fillText('Список результатов:', CLOUD_TEXT_X, CLOUD_TEXT_Y + CLOUD_TEXT_GAP);
};

window.renderStatistics = function (ctx, players, times) {
  // отрисовка облака с заголовком
  renderCloud = window.renderStatisticsCloud(ctx);

  // отрисовка гистограммы
  var maxTime = getMaxElement(times);


  for (var i = 0; i < players.length; i++) {
  //   MAX_BAR_HEIGHT    BAR[I]
  // ---------------- = --------
  //  BAR_HEIGHT           X
  // X = (BAR[I] * BAR_HEIGHT) / MAX_BAR_HEIGHT

    var barHeight = (BAR_HEIGHT * times[i] / maxTime);
    var gamerX = GAMER_X + (BAR_WIDTH + GAMER_GAP) * i;
    var colorBar = players[i] === TITLE_GAMER_BAR ? COLOR_MAIN_BAR : 'rgba(0,0,255,' + Math.random() + ')';

    ctx.fillStyle = colorBar;

    ctx.fillRect(gamerX, barY + (BAR_HEIGHT - barHeight) + CLOUD_TEXT_GAP + CLOUD_TEXT_GAP, BAR_WIDTH, barHeight);
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(players[i], gamerX, GAMER_NAME_Y);
    ctx.fillText(Math.round(times[i]), gamerX, barY + (BAR_HEIGHT - barHeight) + CLOUD_TEXT_GAP);
  }

};

