//定义一个数组
	var width = 225;
	var height = 250;

	//在 body 里添加一个 SVG 画布	
	var svg = d3.select("svg")
		.append("svg")
		.attr("width", width)
		.attr("height", height);
	var padding = {left:30, right:30, top:20, bottom:20};
	var dataset = [15, 8, 10, 38, 221, 66, 38, 8, 25, 58, 5, 23];
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
	var ordinal = d3.scale.ordinal()
        .domain(month)
        .range(dataset);
	//x轴的比例尺
	var xScale = d3.scale.ordinal()
		.domain(d3.range(month.length))
		.rangeRoundBands([0, width - padding.left - padding.right]);
	//y轴的比例尺
	var yScale = d3.scale.linear()
		.domain([0,d3.max(dataset)])
		.range([height - padding.top - padding.bottom, 0]);

	//定义x轴
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
		
	//定义y轴
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

	//矩形之间的空白
	var rectPadding = 2;

	//添加矩形元素
	var rects = svg.selectAll(".MyRect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class","MyRect")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return xScale(i) + rectPadding/2;
		} )
		.attr("y",function(d){
			return yScale(d);
		})
		.attr("width", xScale.rangeBand() - rectPadding )
		.attr("height", function(d){
			return height - padding.top - padding.bottom - yScale(d);
		});

	//添加x轴
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
		.call(xAxis); 
		
	//添加y轴
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.call(yAxis);
