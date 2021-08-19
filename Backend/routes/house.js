const express = require("express");
const router = express.Router();
const multer = require("multer");
const { House } = require("../models/House");

let jsonUrl = [];
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

router.post("/uploadHouse", (req, res) => {
  const house = new House({
    addr: req.body.addr,
    writer: req.body.writer /*추후에 사라짐*/,
    stabilityStar: req.body.stabilityStar,
    stabilityDesc: req.body.stabilityDesc,
    accessStar: req.body.stabilityStar,
    accessDesc: req.body.accessDesc,
    images: jsonUrl,
  });
  house.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/images", upload.array("image"), (req, res) => {
  let urlArr = new Array();
  for (let i = 0; i < req.files.length; i++) {
    urlArr.push(`${req.files[i].filename}`);
    console.log(urlArr[i]);
  }
  jsonUrl = JSON.stringify(urlArr);
  res.end();

  console.log("파일업로드했습니다");
});

module.exports = router;
