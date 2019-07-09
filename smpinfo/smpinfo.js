const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
let running = false;
let sensval = {"accx" : null, "accy" : null, "accz" : null};

async function reset() {
  document.querySelector("#result").value = "";
}

async function toggle() {
  if(running) {
    running = false;
  }
  else {
    running = true;
    return new Promise((resolve, result) => {
      writesensors();
    });
  }
}

async function writesensors() {
  while(running) {
    document.querySelector("#result").value += sensval["accx"] + "," + sensval["accy"] + "," + sensval["accz"];
    document.querySelector("#result").value += "\n";
    await sleep(100);
  }
}

window.addEventListener("devicemotion", (event) => {
  sensval["accx"] = event.acceleration.x;
  sensval["accy"] = event.acceleration.y;
  sensval["accz"] = event.acceleration.z;
});

window.addEventListener("onload", (event) => {
  document.querySelector("#toggle").addEventListener("onclick", (event) => {
    toggle();
  });
  document.querySelector("#reset").addEventListener("onclick", (event) => {
    reset();
  });
});
