// scripts/insert-check.js
const path = require('path');
const pool = require('../databasePool'); // <- your shared pool
console.log('Using pool at:', require.resolve('../databasePool'));

process.on('unhandledRejection', (e) => {
  console.error('UNHANDLED REJECTION:', e);
  process.exit(1);
});

(async () => {
  try {
    const { rows: [info] } = await pool.query(`
      SELECT current_database() AS db,
             current_user      AS usr,
             inet_server_addr()::text AS host,
             inet_server_port()       AS port
    `);
    console.log('CONNINFO ->', info);

    const { rows } = await pool.query(
      'SELECT id, expiration FROM generation ORDER BY id DESC LIMIT 5'
    );
    console.log('TOP 5 ->', rows);
  } catch (e) {
    console.error('ERROR ->', e.stack || e.message || e);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
