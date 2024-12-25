/*
 * const PouchDB = require('pouchdb');
const path = require('path');

const dbPath = path.resolve(__dirname, '../database/CodePerspective');
const db = new PouchDB(dbPath);

module.exports = db;
*/

/*
import PouchDB from 'pouchdb';
import path from 'path';

const dbPath = path.resolve(__dirname, '../database/CodePerspective');
const db = new PouchDB(dbPath);

export default db;

*/

import { fileURLToPath } from 'url';
import path from 'path';
import PouchDB from 'pouchdb';

// Manually define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../database/CodePerspective');
const db = new PouchDB(dbPath);

export default db;
