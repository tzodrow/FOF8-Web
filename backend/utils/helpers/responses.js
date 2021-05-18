const serverResponse = {
    sendSuccess: (res, message, data = null) => {
        const responseMessage = {
            code: message.code ? message.code : 500,
            success: message.success,
            message: message.message,
        };
        if (data) { responseMessage.data = data; }
        return message.code; // res.status(message.code).json(responseMessage);
    },
    sendError: (res, error) => {
        const responseMessage = {
            code: error.code ? error.code : 500,
            success: false,
            message: error.message,
        };
        return error.code; // res.status(error.code ? error.code : 500).json(responseMessage);
    },
};

module.exports = serverResponse;