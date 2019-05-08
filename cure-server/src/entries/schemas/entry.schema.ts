import *as mongoose from 'mongoose';

export const EntrySchema = new mongoose.Schema({
    activityID: String,
    creatorID: String,
    siteID: String,
    dateEntered: Date,
    dateCreated: Date,
    hours: Number,
    members: Number,
    description: String,
})