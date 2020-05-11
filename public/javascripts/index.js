const [write, download, show] = Array.from(
  document.querySelectorAll("#list li")
).map((el) => el);
const display = document.querySelector("#display");

write.addEventListener("click", async (e) => {
  removeImage();

  await fetch("/write-to-disk");
});

download.addEventListener("click", async (e) => {
  removeImage();

  const data = await getImgData();
  downloadFile(data, "stars.jpg");
});

show.addEventListener("click", async (e) => {
  removeImage();

  const data = await getImgData();
  const img = `<img src="${data}">`;
  display.innerHTML = img;
});

const getImgData = async () => {
  const res = await fetch("/image");
  const data = await res.text();

  return data;
};

const downloadFile = (dataurl, filename) => {
  const a = document.createElement("a");
  a.href = dataurl;
  a.setAttribute("download", filename);
  a.click();
};

const removeImage = () => {
  const img = display.querySelector("img");

  if (img) {
    display.removeChild(img);
  }
};
