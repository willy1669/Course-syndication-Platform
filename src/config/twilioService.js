import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.accountSid;
const authToken = process.env.auth_token;
const client = require('twilio')(accountSid, authToken);


export const sendMessage = async (recipientPhoneNumber, messageBody) => { 
    return await client.messages
    .create({
       body: messageBody,
       from: process.env.TWILIO_PHONE_NUMBER,
       to: recipientPhoneNumber
     }) 
}