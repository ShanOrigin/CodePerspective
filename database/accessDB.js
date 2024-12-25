/*
 * const PouchDB = require('pouchdb');
const path = require('path');
const dbPath = path.resolve(__dirname, './CodePerspective');
const db = new PouchDB(dbPath);
module.exports = db;
*/

import PouchDB from 'pouchdb';
import { fileURLToPath } from 'url';
import path from 'path';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the database path
const dbPath = path.resolve(__dirname, './CodePerspective');
const db = new PouchDB(dbPath);

export default db;
