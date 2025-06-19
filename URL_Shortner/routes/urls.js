const express = require("express");
const {
	handleGenerateNewShortUrl,
	handleVisitRedirectedUrl,
	handleAnalyticsUrl,
} = require("../controllers/urls");
const urlRouter = express.Router();

urlRouter.post("/", handleGenerateNewShortUrl);

urlRouter.get("/:shortId", handleVisitRedirectedUrl);

urlRouter.get("/analytics/:shortId", handleAnalyticsUrl);

module.exports = urlRouter;
