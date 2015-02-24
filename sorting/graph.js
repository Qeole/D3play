// vim: set ts=4 sts=4 sw=4:
var values = d3.range(gPrefs.nbVal).map( () => {
    return Math.floor(Math.random()*gPrefs.maxVal);
});

var x = d3.scale.linear()
    .domain([0, gPrefs.nbVal + 1])
    .range ([0, gPrefs.svgWidth]);

var y = d3.scale.linear()
    .domain([0,                d3.max(values)])
    .range ([gPrefs.svgHeight, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("svg")
    .attr("width",  gPrefs.svgWidth  + gMargin.left + gMargin.right)
    .attr("height", gPrefs.svgHeight + gMargin.top  + gMargin.bottom)
  .append("g")
    .attr("transform", "translate(" + gMargin.left + "," + gMargin.top + ")");

var bar = svg.selectAll(".bar")
    .data(values)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d, i) {
        return "translate(" + x(i + 1/2 + 1/6) + "," + y(d) + ")";
    });

bar.append("rect")
    .attr("x", 1)
    .attr("width", x(2/3))
    .attr("height", function(d) { return gPrefs.svgHeight - y(d); });

bar.append("text")
    .attr("dy", ".75em")
    .attr("y", 6)
    .attr("x", x(2/3) / 2)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + gPrefs.svgHeight + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

function swap (a, b) {
    if (a==b)
        return;

    var temp  = values[a];
    values[a] = values[b];
    values[b] = temp;

    var tmp1 = d3.selectAll(".bar").filter((d, i) => { return i == a; }).attr("transform");
    var tmp2 = d3.selectAll(".bar").filter((d, i) => { return i == b; }).attr("transform");

    var yTmp1 = tmp1.slice(tmp1.indexOf(","));
    var yTmp2 = tmp2.slice(tmp2.indexOf(","));

    tmp1 = tmp1.slice(0, tmp1.indexOf(",")) + yTmp2;
    tmp2 = tmp2.slice(0, tmp2.indexOf(",")) + yTmp1;

    var bar1 = d3.selectAll(".bar").filter((d, i) => { return i == a; })
        .transition()
        .attr("transform", tmp2);
    var bar2 = d3.selectAll(".bar").filter((d, i) => { return i == b; })
        .transition()
        .attr("transform", tmp1);

    swapG(a, b, bar1[0][0], bar2[0][0]);
}

function swapG (a, b, aBar, bBar) {
    if (a>b)
        return swapG (b, a, bBar, aBar);

    var p = aBar.parentNode;
    p.removeChild(aBar);
    p.insertBefore(aBar, p.childNodes[b-1]);
    if (a >= gPrefs.nbVal - 1) {
        p.removeChild(bBar)
        p.append(bBar);
    }
    else {
        p.removeChild(bBar);
        p.insertBefore(bBar, p.childNodes[a]);
    }
    return true;
}

oddEven = true;
function foobar () {
    if (oddEven)
        values.sort((a, b) => { return a - b;});
    else
        d3.shuffle(values);
    oddEven = !oddEven;

    var bar = d3.selectAll(".bar")
        .data(values).transition()
        .attr("transform", function(d, i) { return "translate(" + x(i + 1/2 + 1/6) + "," + y(d) + ")"; });
    bar.select("rect")
        .attr("height", function(d) { return gPrefs.svgHeight - y(d); });
    bar.select("text")
        .text(function(d) { return d; });
}
