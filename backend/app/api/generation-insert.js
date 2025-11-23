// app/api/generation-insert.js
const { Router } = require('express');
const router = new Router();
const GenerationTable = require('../generation/table');

router.get('/new', async (_req, res) => {
  console.log('>>> HIT /generation/new');
  try {
    const generation = { expiration: new Date(Date.now() + 60 * 1000) };
    const row = await GenerationTable.storeGeneration(generation);
    console.log('>>> INSERT OK:', row);
    res.json({ generation: row });
  } catch (e) {
    console.error('>>> INSERT FAIL:', e);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;


// app/api/generation-insert.js
/**const { Router } = require('express');
const router = new Router();
const GenerationTable = require('../generation/table');

router.get('/new', (req, res) => {
  // make a fresh expiration 60s from now
  const generation = { expiration: new Date(Date.now() + 60 * 1000) };

  // write to DB and report the result
  GenerationTable.storeGeneration(generation);

  res.json({ generation });
});

module.exports = router;**/
