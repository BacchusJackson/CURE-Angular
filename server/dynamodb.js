const AWS = require("aws-sdk");

AWS.config.update('')

const doc = AWS.DynamoDB.DocumentClient();

doc.scan(scanParameters, (err, data) => {

    if(err) {
        console.log("Something went wrong... " + JSON.stringify(err))
    }else{
        console.log(data);
    }

});