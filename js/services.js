
var stockQuoteUrl1 = "https://query.yahooapis.com/v1/public/yql?q=select%20Symbol%2CName%2CDaysLow%2CDaysHigh%2CYearLow%2CYearHigh%2CLastTradePriceOnly%2CLastTradeDate%2CLastTradeTime%2CMarketCapitalization%2CChange_PercentChange%20from%20yahoo.finance.quotes%20where%20symbol%20%3D%20%22";
var stockQuoteUrl2 = "%22%09&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env";
var url = window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl + "/";

stockquoteapp.service("StockQuoteService", function ($http) {

    this.stockSymbol;
    this.dateformat;
    this.GetStockPrice = function (callback) {

        var siteUrl = document.URL;
        console.log(url);
        //   var clientContext = new SP.ClientContext(siteUrl);
        //  var url = clientContext.URL;
        var serverRootUrl = url + "_api/web/lists/GetByTitle('Stock Symbol')/items";
        console.log(serverRootUrl);
        var queryValue = "?$select=Id,Title,DateFormat";
        serverRootUrl = serverRootUrl + queryValue;
        $http.get(serverRootUrl, { headers: { 'Accept': 'application/json; odata=verbose' } }).success(function (data, status) {
            console.log(data.d.results[0].Title);

            var finalStockQuoteUrl = stockQuoteUrl1 + data.d.results[0].Title + stockQuoteUrl2;
            console.log(finalStockQuoteUrl);
            $http.get(finalStockQuoteUrl).success(callback)
            {

            };
        })
        {

        };
    };

    this.GetDateFormat = function (callback) {
        var serverRootUrl = url + "_api/web/lists/GetByTitle('Stock Symbol')/items";
        var queryValue = "?$select=DateFormat";
        $http.get(serverRootUrl, { headers: { 'Accept': 'application/json; odata=verbose' } }).success(callback)
        {

        };

    };

});

function getConfigfromListJSOM(siteUrl,listtitle) {

        var clientContext = new SP.ClientContext(siteUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(listtitle);

        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(
            '<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
            '<Value Type=\'Number\'>1</Value></Geq></Where></Query>' +
            '<RowLimit>10</RowLimit></View>'
        );
        this.collListItem = oList.getItems(camlQuery);

      //  oListItem.recycle();

        clientContext.executeQueryAsync(function onQuerySucceeded(sender, args) {
            console.log("success");
            
            var listItemId = 0;
            var stockSymbol = '';
            var datetimeFormat = 'dd-MMM-yyyy';
            var listItemEnumerator = collListItem.getEnumerator();
            while (listItemEnumerator.moveNext()) {
                var oListItem = listItemEnumerator.get_current();
                listItemId = oListItem.get_id();
                stockSymbol = oListItem.get_item('Title') 
                datetimeFormat = oListItem.get_item('DateTimeFormat');
                
                break;
            }
            var o = {
                itemId: listItemId,
                stockSymbol: stockSymbol,
                dateTimeFormat: datetimeFormat
            };
            
            callback(JSON.stringify(o));
        }, function onQueryFailed(sender, args) { });
    
}

