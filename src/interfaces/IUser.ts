import { Types } from 'mongoose';

export default interface IUser {
    _id: Types.ObjectId; 
    username: string;
    password: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
