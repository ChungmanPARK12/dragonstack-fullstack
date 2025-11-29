// backend/app/api/generation.js
const { Router } = require('express');
const GenerationTable = require('../generation/table');

const router = new Router();

// Retrieve the current generation (used by the frontend)
router.get('/', (req, res) => {
  const generation = req.app.locals.engine.generation;

  // Return the current generation without storing it in the DB
  res.json({ generation });
});

// Create a new generation and store it in the database
router.get('/new', (req, res) => {
  const generation = req.app.locals.engine.generation;

  // Save the generation into the database
  GenerationTable.storeGeneration(generation);

  // Return the newly created generation
  res.json({ generation });
});

module.exports = router;

/**const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
    res.json({ generation: req.app.locals.engine.generation });
});

module.exports = router;**/