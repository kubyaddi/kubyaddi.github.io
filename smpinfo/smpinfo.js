const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
let running = false;
let sensval = {"accx" : null, "accy" : null, "accz" : null};

async function reset() {
  document.querySelector("#result").innerHTML = "";
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
    document.querySelector("#result").innerHTML += sensval["accx"] + "," + sensval["accy"] + "," + sensval["accz"];
    document.querySelector("#result").innerHTML += "\n";
    await sleep(100);
  }
}

window.addEventListener("devicemotion", event => {
  sensval["accx"] = event.acceleration.x;
  sensval["accy"] = event.acceleration.y;
  sensval["accz"] = event.acceleration.z;
});
