// vim: set ts=2 sw=2:
function basic () {
  var loop;

  function myTimer() {
    var d = new Date();
    document.getElementById("basic").textContent
      = d.toLocaleTimeString();
  }

  this.launch = function () {
    myTimer();
    loop = setInterval(myTimer, 1000);
  }

  this.stop = function () {
    window.clearInterval(loop);
  }
}
