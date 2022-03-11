const readerOnLoad = (event) => {
  const canvas = document.querySelector("#original");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = event.target.result;
  img.onload = (event) => {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);
  };
};

const onChange = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = readerOnLoad;
  reader.readAsDataURL(file);
};

document.querySelector("#input").addEventListener("change", onChange);

const radioGroup = document.getElementById("radioGroup");
radioGroup.addEventListener("change", function () {
  const radio = document.querySelector('[name="処理方法選択"]:checked');

  // input
  const originalCanvas = document.querySelector("#original");
  const originalCtx = originalCanvas.getContext("2d");
  const imageData = originalCtx.getImageData(
    0,
    0,
    originalCanvas.width,
    originalCanvas.height
  );

  // process
  switch (radio.value) {
    case "オリジナル":
      break;
    case "グレースケール":
      const data = imageData.data;
      for (let i = 0; i < data.length / 4; i++) {
        const gray = (data[i * 4 + 0] + data[i * 4 + 1] + data[i * 4 + 2]) / 3;
        data[i * 4 + 0] = gray;
        data[i * 4 + 1] = gray;
        data[i * 4 + 2] = gray;
      }
      break;

    default:
      break;
  }

  // output
  const processedCanvas = document.querySelector("#processed");
  const processedCtx = processedCanvas.getContext("2d");

  processedCanvas.width = imageData.width;
  processedCanvas.height = imageData.height;

  processedCtx.putImageData(imageData, 0, 0);
});
