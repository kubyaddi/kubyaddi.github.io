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
    document.querySelector("#result").innerHTML += "<br>";
    await sleep(100);
  }
}

async function download() {
  const csv_data = document.querySelector("#result").innerHTML.split("<br>").join("\n");
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const blob = new Blob([bom, csv_data], { type: 'text/csv' });
  const url = (window.URL || window.webkitURL).createObjectURL(blob);
  let a = document.querySelector("#download_a");
  a.download = 'data.csv';
  a.href = url;
  a.click();
}

async function copy() {
  const csv_data = document.querySelector("#result").innerHTML.split("<br>").join("\n");
  var tmp = document.createElement("div");
  var pre = document.createElement('pre');
  pre.style.webkitUserSelect = 'auto';
  pre.style.userSelect = 'auto';
  tmp.appendChild(pre).textContent = csv_data;
  tmp.style.position = 'fixed';
  tmp.style.right = '200%';
  document.body.appendChild(tmp);
  document.getSelection().selectAllChildren(tmp);
  document.execCommand("copy");
  document.body.removeChild(tmp);
}

window.addEventListener("devicemotion", (event) => {
  sensval["accx"] = event.acceleration.x;
  sensval["accy"] = event.acceleration.y;
  sensval["accz"] = event.acceleration.z;
});

window.addEventListener("load", (event) => {
  document.querySelector("#toggle").addEventListener("click", (event) => {
    toggle();
  });
  document.querySelector("#reset").addEventListener("click", (event) => {
    reset();
  });
  document.querySelector("#download").addEventListener("click", (event) => {
    download();
  });
  document.querySelector("#copy").addEventListener("click", (event) => {
    copy();
  });
});
