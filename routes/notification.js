const express = require("express");

const router = express.Router();

const {
    getNotifications,
    getTopNotifications
} = require("../services/notificationService");

router.get("/", getNotifications);

router.get("/top10", getTopNotifications);

module.exports = router;