const express = require("express");
require("dotenv").config();

const notificationRoutes = require("./routes/notification");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Notification Backend Running");
});

app.use("/notifications", notificationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});