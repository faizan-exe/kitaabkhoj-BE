const multer = require("multer");

export let upload = multer({ limits: { fileSize: 26 * 1024 * 1024 } }).single(
  "attachment"
);
