// vim: set ts=2 sw=2:
// Standard Scroll Clock by kurt.grigg@virgin.net
function ssc () {
  var H='....';
  var H=H.split('');
  var M='.....';
  var M=M.split('');
  var S='......';
  var S=S.split('');
  var Ypos=50;
  var Xpos=85;
  var Ybase=8;
  var Xbase=8;
  var dots=12;

  var loop;

  function clock (){
    var time=new Date ();
    var secs=time.getSeconds();
    var sec=-1.57 + Math.PI * secs/30;
    var mins=time.getMinutes();
    var min=-1.57 + Math.PI * mins/30;
    var hr=time.getHours();
    var hrs=-1.57 + Math.PI * hr/6 + Math.PI*parseInt(time.getMinutes())/360;
    for (i=0; i < dots; ++i){
      document.getElementById("dig" + (i+1)).style.top =Ypos+0-15+40*Math.sin(-0.49+dots+i/1.9).toString() + "px";
      document.getElementById("dig" + (i+1)).style.left=Xpos+0-14+40*Math.cos(-0.49+dots+i/1.9).toString() + "px";
    }
    for (i=0; i < S.length; i++){
      document.getElementById("sec" + (i+1)).style.top =Ypos+i*Ybase*Math.sin(sec).toString() + "px";
      document.getElementById("sec" + (i+1)).style.left=Xpos+i*Xbase*Math.cos(sec).toString() + "px";
    }
    for (i=0; i < M.length; i++){
      document.getElementById("min" + (i+1)).style.top =Ypos+i*Ybase*Math.sin(min).toString() + "px";
      document.getElementById("min" + (i+1)).style.left=Xpos+i*Xbase*Math.cos(min).toString() + "px";
    }
    for (i=0; i < H.length; i++){
      document.getElementById("hour" + (i+1)).style.top =Ypos+i*Ybase*Math.sin(hrs).toString() + "px";
      document.getElementById("hour" + (i+1)).style.left=Xpos+i*Xbase*Math.cos(hrs).toString() + "px";
    }
  }

  function fillOne (aClass, aNb) {
    return d3.select("#stdScrollClock").select(".clock")
      .selectAll("." + aClass)
        .data(d3.range(1, aNb+1))
      .enter().append("div")
        .attr("id", (d) => { return aClass + d; })
        .attr("class", aClass)
  }

  function fill () {
    d3.select("#stdScrollClock")
      .append("div")
        .attr("class", "clock");

    fillOne("dig", 12)
        .text((d) => { return d; });

    fillOne("hour", 4);
    fillOne("min" , 5);
    fillOne("sec" , 6);
  }

  function credit () {
    d3.select("#stdScrollClock").select(".clock")
      .append("a")
        .attr("style", "display: inline-block; margin-top: 60px;")
        .attr("href", "http://www.w3schools.com/js/js_timing.asp")
        .text("Standard Scroll Clock by kurt.grigg@virgin.net");
  }

  this.launch = function () {
    fill();
    clock();
    credit();
    loop = setInterval(clock, 1000);
  }

  this.stop = function () {
    window.clearInterval(loop);
  }
}
