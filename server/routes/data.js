const express = require('express');
const router = express.Router();

const Activity = require('../../models/activity');
const Entry = require('../../models/entry');
const Sites = require('../../models/site');

//This module handles all http requests for data

/*
All Activities Get Request
Use Case: This returns all the activities from the database
*/

router.get('/allActivities', (req, res, next) => {

    Activity.getAllActivities((err, data)=> {
        if(err) throw err;

        res.json({activities: data});
    })
});

/*
Add Activity Post Request
Use Case: This adds an Activity to the database
The request body will have all of the information for the update
*/

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

/*
All Entries
Use Case: This returns all the entries from the database
*/

router.get('/allEntries', (req, res, next) => {
    Entry.getAll((err, data) => {
        if(err) throw err;
        
        res.json({entries: data})
    })
});

/*
add Entry
Use Case: This adds an entry to the database
The request should have all of the information to create a new entry
*/

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

/*
Site Get Request
Use Case: This returns all the sites from the database
*/
router.get('/sites', (req, res, next) => {
    Sites.getAll((err, data) => {
        if(err) throw err;
        
        res.json({sites: data})
    })
});

module.exports= router;