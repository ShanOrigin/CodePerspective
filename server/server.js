/*
 *
 *const express = require('express');
const db = require('./db.js');
const cors = require('cors');
*/
import express from 'express';
import db from './db.js';
import cors from 'cors';

// Before: using the built-in, deprecated `punycode` module
// const punycode = require('punycode');

// // After: using the userland `punycode` module
// const punycode = require(require.resolve('punycode'));

// // Example: Convert a Unicode domain name to Punycode
// const punycodeDomain = punycode.toASCII('мир.рф');
// console.log(punycodeDomain); // Outputs: xn--j1alg5e.xn--p1ai

const app = express();
const port = 1430;
app.use(cors());

// API to fetch all documents
app.get('/QueenMedusa/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.get(id);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
