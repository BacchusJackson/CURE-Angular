import { Document } from 'mongoose'

export interface User extends Document {
    id?: string;
    firstName: string;
    lastName: string;
    username: string;
    displayName: string;
    password: string;
    site: string;
    clinic: string;
    status: string;
}