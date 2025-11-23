const { Router } = require('express');
const GenerationTable = require('../generation/table');

const router = new Router();

router.get('/new', (req, res) => {
  const generation = req.app.locals.engine.generation;

  // Save into DB
  GenerationTable.storeGeneration(generation);

  // Return response
  res.json({ generation });
});

module.exports = router;






/**const { Router } = require('express');

const router = new Router();

router.get('/', (req, res) => {
    res.json({ generation: req.app.locals.engine.generation });
});

module.exports = router;**/