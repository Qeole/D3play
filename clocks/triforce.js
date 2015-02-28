// vim: set ts=2 sw=2:
function tri() {

  var date;
  var loop;
  var g;

  var size = 30;

  var mapping = [
    17, /*0*/
    15, /*1*/
    14, /*2*/
    12, /*3*/
    2,  /*4*/
    0,  /*5*/
    16, /*6*/
    99, /*7*/
    13, /*8*/
    99, /*9*/
    1,  /*10*/
    11, /*11*/
    9,  /*12*/
    5,  /*13*/
    3,  /*14*/
    10, /*15*/
    99, /*16*/
    4,  /*17*/
    8,  /*18*/
    6,  /*19*/
    7   /*20*/
  ];
  var revMapping = [ 5, 10, 4, 13, 19, 20, 18, 12, 15, 11, 3, 8, 2, 1, 6, 0, 8 ]

  function getStyle (aInt, aFill) {
    if (aFill == 99)
      return "fill: none; stroke: none;"
    if (!aFill)
      return "fill: rgb(255, 255, 180); stroke: black; stroke-width: 2;"
    var n = mapping[aInt];
    if (n < 6)
      return "fill: red; stroke: black; stroke-width=2;;"
    if (n < 12)
      return "fill: green; stroke: black; stroke-width=2;;"
    return "fill: blue; stroke: black; stroke-width=2;;"
  }

  function triangle(aObj) {
    var d = "M " + aObj.x + "," + aObj.y
         + " l " + size/2
         +  ","  + (-Math.sqrt(2)*size/2)
         + " L " + (aObj.x + size)
         +  ","  + aObj.y
         + " z";
    return d;
  }

  function init() {
    g = d3.select("#triforce")
      .append("div")
        .attr("class", "clock")
      .append("svg")
        .attr("width",  "190px")
        .attr("height", "130px")
      .append("g")
        .attr("transform", "translate(2,2)");

    var count = 0;
    d3.range(6).map((i) => {
      d3.range(6-i).map((j) => {
        g.append("path")
          .attr("d", () => {
            var startPoint = {
              x: (5+j*size+(i/2)*size),
              y: (128 - i*Math.sqrt(2)*size/2)
            }
            return triangle(startPoint);
          })
          .attr("style", "stroke: black; fill: none; stroke-width: 2;");
        //if (mapping[count]<99) {
          //g.append("text")
            //.attr("x", 15+j*size+(i/2)*size)
            //.attr("y",125 - i*Math.sqrt(2)*size/2)
            //.attr("font-size", 10)
            //.text(mapping[count]);
        //}
        count++;
      })
    });
  }

  function fill () {
    var date = new Date();
    var secs = date.getSeconds();
    var mins = date.getMinutes();
    var hrs  = date.getHours();

    time = [
      secs & 1, secs & 2, secs & 4, secs & 8, secs & 16, secs & 32,
      mins & 1, mins & 2, mins & 4, mins & 8, mins & 16, mins & 32,
      hrs  & 1, hrs  & 2, hrs  & 4, hrs  & 8, hrs  & 16, 0
    ]

    var values = mapping.map(
      (i) => {
        if (i < 99)
          return time[i];
        else
          return 99;
      }
    );
    console.log(values);

    g.selectAll("path")
        .data(values)
        .attr("style", (d, i) => {
          return getStyle(i, d)
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
