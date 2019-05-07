import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema( {
    firstName: String,
    lastName: String,
    username: String,
    displayName: String,
    password: String,
    site: String,
    clinic: String,
    status: String,
})