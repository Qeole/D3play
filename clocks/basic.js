// vim: set ts=2 sw=2:
function basic () {
  function myTimer() {
    var d = new Date();
    document.getElementById("basic").textContent
      = d.toLocaleTimeString();
  }

  this.launch = function () {
    myTimer();
    setInterval(myTimer, 1000);
  }
}
