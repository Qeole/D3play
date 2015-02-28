// vim: set ts=2 sw=2:
function bin() {

  var date;
  var loop;
  var g;

  var sWidth  = 20;
  var sHeight = 20;
  var pad     = 5;

  function init() {
    g = d3.select("#binary")
      .append("div")
        .attr("class", "clock")
      .append("svg")
        .attr("width",  "170px")
        .attr("height", "100px")
      .append("g")
        .attr("transform", "translate(2,2)");

    d3.range(3).map((i) => {
      d3.range(2).map((j) => {
        d3.range(4).map((k) => {
          g.append("rect")
            .attr("x", (2-i)*(3*sWidth)+(1-j)*(sWidth+pad))
            .attr("y", (3-k)*(sHeight+pad))
            .attr("width",  sWidth)
            .attr("height", sHeight)
            .attr("style", "stroke: black; fill: none; stroke-width: 2;");
        })
      })
    });
  }

  function fill () {
    var date = new Date();
    var secs = date.getSeconds();
    var mins = date.getMinutes();
    var hrs  = date.getHours();

    time = [
      secs & 1, secs & 2, secs & 4, secs & 8, secs & 16, secs & 32, 0, 0,
      mins & 1, mins & 2, mins & 4, mins & 8, mins & 16, mins & 32, 0, 0,
      hrs  & 1, hrs  & 2, hrs  & 4, hrs  & 8, hrs  & 16, 0,         0, 0
    ]

    g.selectAll("rect")
        .data(time)
        .attr("style", (d, i) => {
          var color;
          if (d) {
            if (i<8)
              color = "red;"
            else if (i<16)
              color = "green;"
            else
              color = "blue;"
          }
          else
            color = "none;"

          return "fill:" + color + "stroke: black; stroke-width: 2;";
        });
  }

  this.launch = function () {
    init();
    fill();
    loop = setInterval(fill, 1000);
  }

  this.stop = function () {
    window.clearInterval(loop);
  }
}
