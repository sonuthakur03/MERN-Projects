const Url = require("../models/urls");
const shortid = require("shortid");

const handleGenerateNewShortUrl = async (req, res) => {
	const body = req.body;
	if (!body.url) return res.status(400).json({ error: "Url is required" });
	const shortId = shortid();
	await Url.create({
		shortId: shortId,
		redirectUrl: body.url,
		visitHistory: [],
	});

	return res.json({ id: shortId });
};

const handleVisitRedirectedUrl = async (req, res) => {
	const shortId = req.params.shortId;
	const entry = await Url.findOneAndUpdate(
		{ shortId },
		{
			$push: {
				visitHistory: {
					timestamp: Date.now(),
				},
			},
		}
	);
	return res.redirect(entry.redirectUrl);
};

const handleAnalyticsUrl = async (req, res) => {
	const shortId = req.params.shortId;
	const result = await Url.findOne({ shortId });
	console.log(shortId);
	console.log(req.params.shortId);

	if (!result) {
		return res.status(404).json({ msg: "URL not found" });
	}

	return res.json({
		clicked: result.visitHistory.length,
		analytics: result.visitHistory,
	});
};

module.exports = {
	handleGenerateNewShortUrl,
	handleVisitRedirectedUrl,
	handleAnalyticsUrl,
};
