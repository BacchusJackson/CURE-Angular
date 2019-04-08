const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database')

const Activity = require('../../models/activity');

router.get('/allActivities', (req, res, next) => {

    Activity.getAllActivities((err, data)=> {
        if(err) throw err;

        res.json({activities: data});
    })
});

router.post('/addActivity', (req, res, next) => {
    const newActivity = new Activity({
        name: req.body.name,
        category: req.body.category,
        properties: req.body.properties
    });
    Activity.addActivity(newActivity, (err)=>{
        if(err) {
            res.json({success:false, msg:'Failed to add Activity'});
        }else{
            res.json({success:true, msg:'Activity Sucessfully added'})
        }
    })
});

module.exports= router;