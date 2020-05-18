function stalkMarket() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rangeData = sheet.getDataRange();
  var lastColumn = rangeData.getLastColumn();
  var lastRow = 9;
  var searchRange = sheet.getRange("B3:N11").getValues();
  var bestPrice = 1000;
  var bestSale = -1;
  var bestProfit = 0;
  var sellDay = 0;
  var sellIsland = -1;
  var buyIsland = -1;
  var results = "";
  var timeOfDay = "";
  
  for(i = 0; i < lastRow; i++){             //loop rows
    for(j = 0; j < lastColumn; j++){        //loop columns
      
       //loop pulled turnip prices
      if(j == 12){
        //check if price is lower than the current lowest price
        if(searchRange[i][j] < bestPrice & searchRange[i][j] > 0){
          bestPrice = searchRange[i][j];
          buyIsland = i;
        }
      }else if(searchRange[i][j] > bestSale){   //find highest selling price
        bestSale = searchRange[i][j];
        sellDay = j;
        sellIsland = i;
      }
    }
  }
  
  //construct output and diplay results
  switch (sellDay) {
    case 0:
      timeOfDay = "Monday morning";
      break;
    case 1:
      timeOfDay = "Monday afternoon";
      break;
    case 2:
      timeOfDay = "Tuesday morning";
      break;
    case 3:
      timeOfDay = "Tuesday afternoon";
      break;
    case 4:
      timeOfDay = "Wednesday morning";
      break;
    case 5:
      timeOfDay = "Wednesday afternoon";
      break;
    case 6:
      timeOfDay = "Thursday morning";
      break;
    case 7:
      timeOfDay = "Thursday afternoon";
      break;
    case 8:
      timeOfDay = "Friday morning";
      break;
    case 9:
      timeOfDay = "Friday afternoon";
      break;
    case 10:
      timeOfDay = "Saturday morning";
      break;
    case 11:
      timeOfDay = "Saturday afternoon";
      break;
  }
     
  if(bestPrice == 1000 || bestPrice == 0) {
    sheet.getRange('P3').setValue( "There is no best buying price yet" );
  } else {
    sheet.getRange('P3').setValue( sheet.getRange("A" + (buyIsland+3)).getValue() + "'s island had the best buying price of " + bestPrice + " Bells" );
  }
  
  if(bestSale == 0) {
    sheet.getRange('P4').setValue( "There is no best selling price yet" );
  } else {
    sheet.getRange('P4').setValue( sheet.getRange("A" + (sellIsland+3)).getValue() + "'s island had the best selling price of " + bestSale + " Bells on " + timeOfDay );
  }
  
  bestProfit = bestSale - bestPrice;
  
  if(bestProfit > -1000 && bestSale > 0) {
    bestProfit = bestSale - bestPrice;  
    results = "The largest profit that could be made per turnip was " + bestProfit + " Bells";
  } else {
    results = "There is no largest profit possible yet";
  }
  
  sheet.getRange('P5').setValue(results);
}
