// vim: set ts=2 sw=2:
function cam() {

  var date;
  var loop;
  var g;

  var a = d3.svg.arc()
            .startAngle(0);

  var arcSecs = { innerRadius: 66, outerRadius: 100, color: "red"   };
  var arcMins = { innerRadius: 33, outerRadius: 67,  color: "green" };
  var arcHrs  = { innerRadius: 0,  outerRadius: 34,  color: "blue"  };

  function init() {
    g = d3.select("#camembert")
      .append("div")
        .attr("class", "clock")
      .append("svg")
        .attr("width", "200px")
        .attr("height", "200px")
      .append("g");
  }

  function fill () {
    var date = new Date();

    arcSecs.endAngle = date.getSeconds()*Math.PI/30;
    arcMins.endAngle = date.getMinutes()*Math.PI/30;
    arcHrs .endAngle = date.getHours()  *Math.PI/12;
    var arcs = [ arcSecs, arcMins, arcHrs ];

    g.selectAll("path")
        .data(arcs)
        .attr("d", (d, i) => { return a(d); })
      .enter().append("path")
        .attr("transform", "translate(100,100)")
        .attr("style", (d) => {
          return "fill: " + d.color + ";";
        })
        .attr("d", (d, i) => { return a(d); });
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
