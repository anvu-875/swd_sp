import Airtable from 'airtable';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const airtableAxios = axios.create({
  baseURL: 'https://api.airtable.com/v0',
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
    'Content-Type': 'application/json'
  }
});
