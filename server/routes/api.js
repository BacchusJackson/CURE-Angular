const express = require('express');
const request = require('request');

const router = express.Router();

const APIKEY = process.env.CURE_API_KEY;

console.log(APIKEY);

router.get('/', (routeRequest, routeResponse) => {
    
    const options = {
        url: 'https://mhx0exgc74.execute-api.us-gov-west-1.amazonaws.com/beta/',
        headers: {
            'x-api-key': APIKEY
        }
    };
    
    request(options, (err, res, body) => {
        
        console.log(err || 'Successful touch...');
        console.log(body);
        console.log(res.statusCode);

        if(res.statusCode === 200) {
            data = body;
            
        } else {
            data = 'Something went terribly wrong... Go get help'
        }
        
        routeResponse.send(data);
    });
});

module.exports = router;
