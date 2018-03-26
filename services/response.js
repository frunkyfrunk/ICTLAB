var response = {
    createResponse: (statuscode, body) => {
        var response = {
            "statusCode": statuscode,
            "body": JSON.stringify(body),
            "isBase64Encoded": false
        }
        return response
    }
}
module.exports = response