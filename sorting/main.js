// vim: set ts=2 sts=2 sw=2:
function setValues () {
  values = d3.range(gPrefs.nbVal).map( () => {
    return Math.floor(Math.random()*gPrefs.maxVal);
  });
}
