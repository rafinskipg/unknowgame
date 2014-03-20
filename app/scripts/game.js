var game = {};
var taps = 0;
var moneyPerTap = 1.00;
var money = 0.00;
var bonuses = [];
var hu = require('hu');
//Actions
game.tap = function tap(){
  var calculatedMoneyPerTap;
  taps++;
  bonusValue = processMoneyBonuses(bonuses);
  calculatedMoneyPerTap = bonusValue > 0.0 ? bonusValue * moneyPerTap : moneyPerTap;

  money = parseFloat(money) + parseFloat(calculatedMoneyPerTap);
  bonuses = clearBonuses(bonuses);
};

game.getTaps = function getTaps(){
  return taps;
};
//Money
game.getMoneyPerTap = function getMoneyPerTap(){
  return float2(moneyPerTap);
};
game.setMoneyPerTap = function setMoneyPerTap(value){
  moneyPerTap = float2(value);
};
game.getMoney = function getMoney(){
  return float2(money);
};

//Bonuses
game.newBonus = function newBonus(bonus){
  bonuses.push(bonus);
};
game.getBonuses = function getBonuses(){
  return bonuses;
};

game.newMoneyTapBonus = function newMoneyTapBonus(inc, duration){
  var bonus = {
    type: 'money',
    increment: inc
  };
  if(duration){
    bonus.duration = duration;
  }
  game.newBonus(bonus);
};

function processMoneyBonuses(bonuses){
  var bonusValue = 0.0;
  bonuses.map(function(bonus){
    if(bonus.type == 'money'){
      bonusValue += parseFloat(bonus.increment);
    }
  });
  return parseFloat(bonusValue);
}

function clearBonuses(bonuses){
  bonuses = bonuses.map(function(bonus){
    if(typeof(bonus.duration) != 'undefined'){
      bonus.duration--;
      if(!bonus.duration <= 0){
        return bonus;
      }
    }else {
      return bonus;
    }
  });
  return hu.compact(bonuses);
}

//Game state
game.restart = function restart(){
  taps = 0;
  moneyPerTap = 1.00;
  money = 0.00;
  bonuses = [];
};


//Utils
function float2(value){
  return parseFloat(value).toFixed(2);
}
module.exports = game;