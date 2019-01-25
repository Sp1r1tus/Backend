import express = require("express");
import multer = require("multer");

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, '../../');
    },
    filename: function (request, file, callback) {
        //   console.log(file);
        callback(null, file.originalname)
    }
});

var upload = multer({ storage: storage });
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.post("/Excel", upload.single("Excel"), function (req, res, next) {
    res.send("ok")
    //  console.log(req.file.filename)
    //  console.log(req.file.originalname)
});

module.exports = router;