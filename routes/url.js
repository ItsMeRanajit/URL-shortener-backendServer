const express = require("express");
const URL = require("../models/url");
const { handleGenerateShortId, handleGetWeb, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortId);

router.get("/:shortid", handleGetWeb);

router.get("/analytics/:shortid", handleGetAnalytics);

module.exports = router;
