const router = require("express").Router()
const path = require("path")
const apiRoutes = require("./api")

router.use("./api", apiRoutes);

router.get("./api", (req, res) =>
    res.sendFile(path.join(_dirname, "../public/index.html"))
);

router.get("/exercise")