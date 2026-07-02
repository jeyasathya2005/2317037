const axios = require("axios");

const priority = {
    Placement: 3,
    Result: 2,
    Event: 1
};

// Get all notifications
const getNotifications = async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.BASE_URL}/notifications`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Unable to fetch notifications",
            error: error.response?.data || error.message
        });

    }
};

// Get top 10 notifications
const getTopNotifications = async (req, res) => {

    try {

        const response = await axios.get(
            `${process.env.BASE_URL}/notifications`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }
        );

        let notifications = response.data.notifications;

        notifications.sort((a, b) => {

            if (priority[b.Type] !== priority[a.Type]) {
                return priority[b.Type] - priority[a.Type];
            }

            return new Date(b.Timestamp) - new Date(a.Timestamp);

        });

        res.json({
            success: true,
            notifications: notifications.slice(0, 10)
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Unable to fetch top notifications",
            error: error.response?.data || error.message
        });

    }

};

module.exports = {
    getNotifications,
    getTopNotifications
};