	//function rowChart(category) {
	//function rowChart() {
	var rowChart = function () {
		///var rowType = {relWt: {name: 'Relative Weight', klass: 'wtbar'},  relRet: {name: 'Relative Return', klass: 'retbar'}, stockSel: {name: 'Stock Selection', klass: 'ssbar'}};

	  	// chart attributes
	  	var margin = {top: 20, right: 5, bottom: 40, left: 5},
			width = 360 - margin.left - margin.right,
			height = 300 - margin.top - margin.bottom;
			//legend = [260,300];
		var colors = d3.scale.category20c();
		var leg, legend = [];

		var rowType;


		function chart(selection) {
			console.log("1. legend length check: ");

		  	selection.each(function(data) {

				console.log("legend length: " +  legend.length);
				var t = legend.length ? legend[0] : 0;
				console.log("t : " +  t);

				var x = d3.scale.linear().range([0, width]);
				var y = d3.scale.ordinal().rangeRoundBands([0, height], 0.1);
				var xAxis = d3.svg.axis().scale(x).orient("bottom");
				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left")
					.tickSize(0)
					//.ticks(0)
					.tickFormat( function(d) { return "";} ) // disable tick label
					.tickPadding(6);
		 		colors.domain(data.map(function(d) { return d['MSCI/S&P Sector'];}));
				
				//////////var svg = d3.select("body").append("svg")
				//var div = d3.select(this),
				//		svg = d3.selectAll('svg').append("svg")
				var svg = d3.select(this).append("svg")
						//.attr("width", width + margin.left + margin.right)
						.attr("width", width + margin.left + margin.right + (legend.length ? legend[0] : 0))
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
							.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				x.domain(d3.extent(data, function(d) {
					//return +d['Relative Weight']; })).nice();
					return +d[rowType.name]; })).nice();
				y.domain(data.map(function(d) {
					return d['MSCI/S&P Sector']; })); //return d.name; }));


				// select the chart group
				var g = svg.select('g.chart-content');

				svg.selectAll('.bar')
					.data(data)
  					.enter().append('rect')
						//.attr("class", function(d) { return "wtbar wtbar--" + (+d['Relative Weight'] < 0 ? "negative" : "positive"); })
						////.attr("class", function(d) { return "bar bar--" + (+d['Relative Weight'] < 0 ? "negative" : "positive"); })
						.attr("class", function(d) { return "bar bar--" + (+d[rowType.name] < 0 ? "negative" : "positive"); })
						////.attr("x", function(d) { return x(Math.min(0, +d['Relative Weight'])); })
						.attr("x", function(d) { return x(Math.min(0, +d[rowType.name])); })
						.attr("y", function(d) { return y(d['MSCI/S&P Sector']); })
						.attr("fill", function(d,i) { return colors(d['MSCI/S&P Sector']); })

						.attr("width", function(d) { return Math.abs(x(0)); })
						.transition()
  						.duration(1000)

  						//.attr("width", function(d) { return Math.abs(x(+d['Relative Weight']) - x(0)); })
  						.attr("width", function(d) { return Math.abs(x(+d[rowType.name]) - x(0)); })
						.attr("height", y.rangeBand());

				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis);

				svg.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + x(0) + ",0)")
					.call(yAxis);


				//if (rowType.name === 'Stock Selection') {
				if (legend.length) {
					leg = svg.selectAll(".legend")
						.data(colors.domain())
				  		.enter().append("g")
						.attr("class", "legend")
						.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")";});
				
					leg.append("rect")
						.attr("x", width ) //.attr("x", width - 18)
						.attr("y", 4)
						.attr("width", 10)
						.attr("height", 10)
						.style("fill", colors)
					leg.append("text")
						.attr("x", width + 22) //.attr("x", width + 4)
						.attr("y", 9)
						.attr("dy", ".35em")
						.style("text-anchor", "start")
						.text(function(d) { return d; });
				}
			}); // selection.each
		} // chart


		// accessors
        chart.rowType = function(value) {
            if (!arguments.length) { return rowType; }
            rowType = value;
            return chart;
        };
        chart.width = function(value) {
            if (!arguments.length) { return width; }
            width = value;
            return chart;
        };
        chart.legend = function(value) {
            if (!arguments.length) { return legend; }
            legend = value;
            return chart;
        };

		return chart;
	};  // rowChart

