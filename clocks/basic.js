// vim: set ts=2 sw=2:
function basic () {
  var loop;

  function myTimer() {
    var d = new Date();
    d3.select("#basic")
      .select(".clock")
        .text(d.toLocaleTimeString());
  }

  this.launch = function () {
    d3.select("#basic")
      .append("div")
        .attr("class", "clock");

    myTimer();
    loop = setInterval(myTimer, 1000);
  }

  this.stop = function () {
    window.clearInterval(loop);
  }
}
