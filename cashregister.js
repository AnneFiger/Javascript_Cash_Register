function checkCashRegister(price, cash, cid) {
  var currency = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100],
  ];
  var totalCid = cid
    .map((elem) => elem[1])
    .reduce((a, b) => a + b)
    .toFixed(2);
  var cashtoGive = [];
  var tempcashtoGive = 0;
  var index = 0;
  var changeDue = cash - price;

  if (changeDue > totalCid) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (changeDue.toFixed(2) === totalCid) {
    return { status: "CLOSED", change: cid };
  } else {
    var i = currency.length;
    while (i > 0) {
      i--;
      if (changeDue >= currency[i][1] && cid[i][1] > 0) {
        var tempCurrency = currency[i][1];
        var tempAmount = cid[i][1];
        cashtoGive.push(currency[i]);
        while (tempAmount > 0 && changeDue >= tempCurrency) {
          changeDue -= tempCurrency;
          changeDue = changeDue.toFixed(2);
          tempAmount -= tempCurrency;
          tempcashtoGive += tempCurrency;
        }
        cashtoGive[index][1] = tempcashtoGive;
        tempcashtoGive = 0;
        index++;
      }
    }
    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else {
      return { status: "OPEN", change: cashtoGive };
    }
  }
}

console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
