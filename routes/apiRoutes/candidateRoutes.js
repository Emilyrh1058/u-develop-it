const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


// GET ALL CANDIDATES
router.get('/candidates', (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
                AS party_name 
                FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});


// GET A SINGLE CANDIDATE - "GET" --> READ
router.get('/candidate/:id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
                AS party_name 
                FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id 
                WHERE candidates.id = ?`;  
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      err.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});


// CREATE A CANDIDATE - "POST" --> CREATE
router.post('/candidate', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
  VALUES (?,?,?)`;
  const params = [
    body.first_name,
    body.last_name, 
    body.industry_connected,
    body.party_id
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: result.affectedRows
    });
  });
});


// DELETE A CANDIDATE - ? (PLACEHOLDER) MEANS IT'S A PREPARED STATEMENT
router.delete('candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];


  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found"
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

module.exports = router;