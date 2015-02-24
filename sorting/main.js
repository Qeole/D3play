// vim: set ts=2 sts=2 sw=2:
function setInitVal () {
  gInitValues = d3.range(gPrefs.nbVal).map( () => {
    return Math.floor(Math.random()*gPrefs.maxVal);
  });
}

function log (aMesg) {
  d3.select("#log")
    .append("p")
    .text(aMesg);
}

function cloneVals () {
  gVal = {
    bubble    : gInitValues.slice(0),
    selection : gInitValues.slice(0),
    insertion : gInitValues.slice(0),
    fusion    : gInitValues.slice(0)
  };
  gState = {
    bubble    : { stepi: 0, stepn: gPrefs.nbVal, finished: false, count: 0 },
    insertion : { stepi: 1, stepn: 1, finished: false, count: 0 },
    selection : { stepi: 0, stepn: 0, finished: false, count: 0 }
  };
}

function isSorted (aArray) {
  for (var i=1; i<aArray.length; i++) {
    if (aArray[i] < aArray[i-1])
      return false;
  }
  return true;
}

// BUBBLE

function bubbleStep () {
  gState.bubble.count++;

  var i = ++gState.bubble.stepi;
  if (i == gState.bubble.stepn) {
    i = 1;
    gState.bubble.stepi = 1;
    gState.bubble.stepn--;
  }
  if (gVal.bubble[i] < gVal.bubble[i-1])
    swap("#bubble", i-1, i);

  if (gState.bubble.stepn <= 1) {
    console.log("Bubble sort finished!")
    log("Bubble sort finished");
    gState.bubble.finished = true;
  }
}

function bubbleLoop () {
  if (gState.bubble.finished) {
    return;
  }
  bubbleStep();
  //redraw(gVal.bubble, "#bubble");
  setTimeout(bubbleLoop, gPrefs.period);
}

// INSERTION

function insertionStep () {
  gState.insertion.count++;

  var i = gState.insertion.stepi;
  if (i==0 || gVal.insertion[i]>=gVal.insertion[i-1]) {
    gState.insertion.stepi = ++gState.insertion.stepn;
    if (gState.insertion.stepn == gPrefs.nbVal) {
      console.log("Insertion sort finished!")
      log("Insertion sort finished");
    }
  }
  else {
    swap("#insertion", i-1, i);
    gState.insertion.stepi--;
  }

  if (gState.insertion.stepn == gPrefs.nbVal)
    gState.insertion.finished = true;
}

function insertionLoop () {
  if (gState.insertion.finished) {
    return;
  }
  insertionStep();
  setTimeout(insertionLoop, gPrefs.period);
}

// SELECTION

function selectionStep () {
  gState.selection.count++;
  console.log(gState.selection.stepi, gState.selection.stepn);

  var i = gState.selection.stepi;
  if (i<gState.selection.stepn) {
    var min = gState.selection.stepn;
    for (var j=i+1; j<gVal.selection.length; j++) {
      if (gVal.selection[j]<gVal.selection[min])
        min = j;
    }
    gState.selection.stepn++;
    gState.selection.stepi = min;
  }
  else {
    swap("#selection", i-1, i);
    gState.selection.stepi--;
  }

  if (gState.selection.stepn == gPrefs.nbVal) {
    console.log("Selection sort finished!")
    log("Selection sort finished");
    gState.selection.finished = true;
  }
}

function selectionLoop () {
  if (gState.selection.finished) {
    return;
  }
  selectionStep();
  //redraw(gVal.selection, "#selection");
  setTimeout(selectionLoop, gPrefs.period);
}

function start () {
  bubbleLoop();
  insertionLoop();
  selectionLoop();
}
