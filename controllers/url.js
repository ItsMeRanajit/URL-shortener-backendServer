const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerateShortId = async (req, res) => {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  // return res.json({ id: shortId });
  return res.render("home", {
    id: shortID,
  });
};

const handleGetWeb = async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  res.redirect(entry.redirectUrl);
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortid;
  const result = await URL.findOne({ shortId });
  return res.json({ TotalClicks: result.visitHistory.length, Analytics: result.visitHistory });
};
module.exports = { handleGenerateShortId, handleGetWeb, handleGetAnalytics };
