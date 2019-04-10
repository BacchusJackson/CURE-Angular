const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database')

const Activity = require('../../models/activity');
const Entry = require('../../models/entry');
const Sites = require('../../models/site');

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

router.get('/allEntries', (req, res, next) => {
    Entry.getAll((err, data) => {
        if(err) throw err;
        
        res.json({entries: data})
    })
});

router.post('/addEntry', (req,res,next)=> {
    //create an object from the request
    const newEntry = new Entry({
        activityID: req.body.activityID,
        activity: req.body.activity,
        category: req.body.category,
        creator: req.body.creator,
        dateEntered: req.body.dateEntered,
        dateCreated: req.body.dateCreated,
        site: req.body.site,
        clinic: req.body.clinic,
        userStatus: req.body.userStatus,
        hours: req.body.hours,
        members: req.body.members,
        description: req.body.description
    });
    
    //attempt to add the entry to the database
    Entry.addEntry(newEntry, (err) => {
        if(err) {
            res.json({success:false, msg:'Server: Failed to add Entry'});
            console.log(err);
        }else {
            res.json({success:true, msg: 'Server: Entry successfully Added'})
        }
    })
});

router.get('/sites', (req, res, next) => {
    Sites.getAll((err, data) => {
        if(err) throw err;
        
        res.json({sites: data})
    })
});

module.exports= router;