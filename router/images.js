const router = require("express").Router();
const verifyBearerToken = require("../helper/verifyBearerToken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split("/")[1];
    cb(null, file.originalname + "." + fileType);
  },
});

const upload = multer({
  storage: storage,
});

router.post("/upload", upload.array("images", 12), (req, res) => {
  const reqFiles = [];
  const fileName = [];
  const url = req.protocol + "://" + req.get("host");
  for (let i = 0; i < req.files.length; i++) {
    reqFiles.push(url + "/public/" + req.files[i].filename);
    fileName.push(req.files[i].filename);
  }
  res.status(200).json("upload success");
});

module.exports = router;
