const fs = require("fs").promises;
const homedir = require("os").homedir();
const { sep } = require("path");
const axios = require("axios");
const express = require("express");
const router = express.Router();

const base64flag = "data:image/jpeg;base64,";
const imgUrl =
  "https://upload.wikimedia.org/wikipedia/commons/c/cc/HR_6819_-_eso2007c.jpg";

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "Moving images with Node.js and Express" });
});

router.get("/write-to-disk", async (req, res, next) => {
  const filepath = `${homedir}${sep}Downloads${sep}write-to-disk-server.jpg`;
  const buffer = await getBase64string();

  try {
    await fs.writeFile(filepath, buffer, {
      encoding: "base64",
    });

    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.json({ ok: false });
  }
});

router.get("/image", async (req, res, next) => {
  const buffer = await getBase64string();

  try {
    res.send(`${base64flag}${buffer}`);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

const getBase64string = async () => {
  const response = await axios.get(imgUrl, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data, "binary").toString("base64");

  return buffer;
};

module.exports = router;
