var dashboardTutorial = (function () {

    var sectorMap;
    var cusipMap;

    var parseDate = function (d) {
    };

    var cleanData = function (data) {
		sectorMap = d3.nest().key(function(d) { return d['MSCI/S&P Sector']}).map(data);
		cusipMap = d3.nest().key(function(d) { return d['Cusip']}).map(data);
		securityMap = d3.nest().key(function(d) { return d['Security Name']}).map(data);

		return securityMap;
    };



    return {
        useDC: function () {

//			var thead = d3.select('#dynamic-section').select('thead'),
//				tbody = d3.select('#dynamic-section').select('tbody')
//
//			// table head
//			var trHead = thead.append('tr');
//			trHead.selectAll('th')
//				.data(['Top 5 Relative Contrib.', 'Top 5 Relative Dtractors', 'Legend/Selection'])
//				.enter()
//		  		.append('th')
//				.html(function(d) {return d;});
//
//			var tr = tbody.selectAll('tr')
//				.data(['a', 'b'])
// 				.enter()
//				.append('tr');



            d3.csv('../data/top.csv', function (data) {

                //var cusipList = cleanData(data);
                var securityList = cleanData(data);

                var cf = crossfilter(data);

				var bySector = cf.dimension(function(d) { return d['MSCI/S&P Sector']; });
////				bySector.filter('INFORMATION TECHNOLOGY');

				//// from  var byContrib = cf.dimension(function(d,i) { return +d['Total Relative Contribution - Actual']; });
				//var byContrib = cf.dimension(function(d,i) { return d['Cusip']; });
				var byContrib = cf.dimension(function(d,i) { return d['Security Name']; });



				////var byContrib = cf.dimension(function(d,i) { return d['Cusip']; });
				/////var contribGroup = byContrib.group(); -- bad
				var contribGroup = byContrib.group().reduceSum(function(d) { return +d['Total Relative Contribution - Actual'];});
				/////var contribGroup = byContrib.group(function(d) { return +d['Total Relative Contribution - Actual'];});
				
console.log("we are here...");
				// select menu
				//
				// d3.select('#myDropDown').on('change', function() { chartDim.filter(this.value); dc.renrawAll(); })
				//
				//
				// var sfield = selectMenu.filter() or filters() ???
//				dc.selectMenu('#selectmenu')
//				  .dimension(bySector)
//				  .group(bySector.group());


                dc.rowChart('#top5ContribChart')
                    .data(function(group) { return group.top(5);})
                    .width(400) // .width(300)
                    .dimension(byContrib)
                    .group(contribGroup)
				  	.elasticX(true)
					//.title(function(d) {
					.title(function(d, i) {
					  console.log("title:: " + d); })
					//.label(function(d) {
					//  console.log("title:: " + d);
					//}


					
                dc.rowChart('#top5DetractorChart') //dc.rowChart('#top5ContribChart')
                    .data(function(group) { return group.top(Infinity).splice(-5).reverse();})
                    .width(400) //.width(300)
                    .dimension(byContrib)
                    .group(contribGroup)
				  	.elasticX(true);

				//var sectorByGroup = bySector.group().reduceCount();

				// sector pie
                ////dc.pieChart('#sectorPie', "Sectors") //dc.rowChart('#top5ContribChart')
                dc.pieChart('#sectorPie') //dc.rowChart('#top5ContribChart')
                    /////.data(function(group) { return group.top(Infinity).splice(-5).reverse();})
////                    .data(function(group) { return group.top(Infinity);})
                    ////.width(400) //.width(300)
                    .width(600) //.width(300)
                    ////.height(400) //.width(300)
					////.radius(120)
					.innerRadius(30)
                    .dimension(bySector)
                    .group(bySector.group())
					.legend(dc.legend());
                    ////.group(bySector.group().reduceCount());
				  	//.elasticX(true);


				var byWeight = cf.dimension(function(d,i) { return d['Security Name']; });
				var weightGroup = byWeight.group().reduceSum(function(d) { return +d['Actual Relative Average Weight'];});

                dc.rowChart('#top5OverWeightChart')
                    .data(function(group) { return group.top(5);})
                    .width(400) //.width(300)
                    .dimension(byWeight)
                    .group(weightGroup)
				  	.elasticX(true);
                    ////.title(function(d) { return "Top 5 OverWeights"; });

                dc.rowChart('#top5UnderWeightChart')
                    //.data(function(group) { return group.bottom(5);})
                    .data(function(group) { return group.top(Infinity).splice(-5).reverse();})
                    .width(400) //.width(300)
                    .dimension(byWeight)
                    .group(weightGroup)
				  	.elasticX(true);
					//.label(function(d) { return "myBar"; });


                // Now let's add some other charts

                dc.renderAll();


				var tip = d3.tip()
					.attr('class', 'd3-tip')
					.offset([-10, 0])
					//.html(function (d) { 
					.html(function (d, i) { 
					  //return "<span style='color: #f0027f'>" +  d.key + "</span> : "  + numberFormat(d.value); });
					  //return "<span style='color: #f0027f'>" +  d.key + "</span> : " + d.value }) ;
					  //return "<span>" +  d.key + "</span> : " + d.value }) ;
					  console.log('d=' + d);
					  console.log('d.key=' + securityList[d.key]);
					  var e = securityList[d.key];
					  var f = securityList[d.key][0];
					  var x = 1;
					  console.log("cusip: " + f['Cusip'] + " Ticker: " + f['Ticker'] + " Bet Size Ind: " + f['Bet Size Ind']);
					  var y = 1;
					  return "<span>" +  f['Cusip'] + ", " + f['Ticker'] +  "</span>, " + f['Bet Size Ind'] + ", " + f['Active Bet In/Out Indicator'] });
					  ////return "<span>" +  securityList[d.key][0]['Cusip'] + "</span> : " + securityList[d][0]['Ticker'] }) ;

				// tip not working...
				//d3.selectAll("#top5ContribChart")
				d3.selectAll("div#top5ContribChart.dc-chart svg")
				  .call(tip);
				//d3.selectAll("#top5ContribChart")
				d3.selectAll("g.row")
				  .on('mouseover', tip.show) 
				  .on('mouseout', tip.hide);

            });
        } // var dashboardTutorial = (function () {
    }

})();
