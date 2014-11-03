var quoteresult = [];
var symbol = '';
stockquoteapp.controller('stockquoteController', function ($scope, StockQuoteService, $filter) {

    StockQuoteService.stockSymbol = "GHL";
    StockQuoteService.GetStockPrice(function (results) {
        console.log(results);
        $scope.quoteresult = results.query.results.quote;
        console.log($scope.quoteresult);
        
    });

   
    $scope.stockQuoteClass = function (scores) {
        if (scores != null) {
            var stockChange = scores.split(" - ")[0];
            var stockChangeDirection = stockChange.charAt(0);
            return stockChangeDirection == '+' ? 'companyStockUp' : 'companyStockDown';
        }
        
    }

    StockQuoteService.GetDateFormat(function (results) {
        console.log(results);
        $scope.dateFormat = results.d.results[0].DateFormat;
    });

    $scope.convertStringToDate = function (datevalue) {
        if (datevalue != null) {

            return new Date(datevalue);
        }
    }

});