const express = require('express');
const cors = require('cors');
const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');

const generationInsertRouter = require('./api/generation-insert');

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use(cors({ origin:'http://localhost:1234' }));
app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: 'error', message: err.message
    })
});

engine.start();


//-----------------------------------------
app.use('/generation', generationInsertRouter);
app.use('/generation', require('./api/generation'));

// add these two quick routes:
app.get('/ping', (_req, res) => res.send('pong'));
app.get('/test/new', (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));
//-------------------------------------------

module.exports = app;

