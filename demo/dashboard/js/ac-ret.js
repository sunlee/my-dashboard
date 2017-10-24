	var rowChart = function () {

	  	var margin = {top: 2, right: 2, bottom: 2, left: 2},
			width = 100 - margin.left - margin.right,
			height = (40 - margin.top - margin.bottom) * 13,
      rect = [width, height];

		var colors = d3.scale.category20b();
		var leg, legend = [];

		function chart(selection) {
			console.log("1. legend length check: ");

		  	selection.each(function(data) {

				console.log("legend length: " +  legend.length);
				var t = legend.length ? legend[0] : 0;
				console.log("t : " +  t);

		 		////colors.domain(data.map(function(d) { return d.sector;}));
		 		colors.domain(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']);
				
				var svg = d3.select(this).append("svg")
						.attr("width", width + margin.left + margin.right + (legend.length ? legend[0] : 0))
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
							.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				// select the chart group
				var g = svg.select('g.chart-content');

				if (!legend.length) {
				svg.selectAll('.bar')
					.data(data)
  					.enter().append('rect')
						.attr("class", function(d) { return "bar" ; })
						.attr("x", function(d, i) { return 0; })
						.attr("y", function(d, i) { return i * 20; })
						.attr("fill", function(d,i) { 
                    return colors(d.sector); })

						.attr("width", function(d) { return 20; })
//						.transition()
//  						.duration(1000)
//
//  						////.attr("width", function(d) { return Math.abs(x(+d[rowType.name]) - x(0)); })
//  						.attr("width", function(d) { return 20; })
//						//.attr("height", y.rangeBand());
						.attr("height", 20);
        }
        else { // (legend.length) {
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
//        chart.rowType = function(value) {
//            if (!arguments.length) { return rowType; }
//            rowType = value;
//            return chart;
//        };
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

