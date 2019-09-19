function write(obj, sentence, i, cb) {
  if (i != sentence.length) {
    setTimeout(function() {
      i++;
      console.log("in timeout", i);
      obj.innerHTML =
        sentence.substr(0, i + 1) + ' <em aria-hidden="true"></em>';
      write(obj, sentence, i, cb);
    }, 100);
  } else {
    console.log(i);
    cb();
  }
}
function erase(obj, cb, i) {
  var sentence = obj.innerText;
  if (sentence.length != 0) {
    setTimeout(function() {
      sentence = sentence.substr(0, sentence.length - 1);
      console.log("in timeout", i);
      obj.innerText = sentence;
      setTimeout(function() {
        erase(obj, cb);
      }, 70);
    }, 18 / (i * (i / 10000000)));
  } else {
    obj.innerText = " ";
    cb();
  }
}
var typeline = document.querySelector("#typeline");

function writeerase(obj, sentence, time, cb) {
  write(obj, sentence, 0, function() {
    setTimeout(function() {
      erase(obj, cb);
    }, time);
  });
}

var sentences = [
  "a Maker. ",
  "an Engineer. ",
  "a Developer. ",
  "a Learner. ",
  "a Leader. "
];

var counter = 0;
function loop() {
  var sentence = sentences[counter % sentences.length];
  writeerase(typeline, sentence, 2500, loop);
  counter++;
}

loop();
