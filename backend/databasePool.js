
//const databaseConfiguration = require('./secrets/databaseConfiguration');
// databasePool.js
// databasePool.js
const { Pool } = require('pg');
const cfg = require('./secrets/databaseConfiguration');

const pool = new Pool({
  host: '127.0.0.1',
  port: cfg.port ?? 5432,
  user: cfg.user,
  password: cfg.password,
  database: cfg.database,
  ssl: cfg.ssl ?? false,
  connectionTimeoutMillis: cfg.connectionTimeoutMillis ?? 10000,
  idleTimeoutMillis: cfg.idleTimeoutMillis ?? 10000,
});


// one-time connection banner
(async () => {
  try {
    const { rows: [r] } = await pool.query(`
      SELECT current_database() AS db,
             current_user AS usr,
             inet_server_addr()::text AS host,
             inet_server_port() AS port
    `);
    console.log(`[DB] Connected -> db=${r.db}, user=${r.usr}, host=${r.host}, port=${r.port}`);
  } catch (e) {
    console.error('[DB] Connection check failed:', e.message || e);
  }
})();
module.exports = pool;


/**const pool = new Pool(databaseConfiguration);

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

module.exports = pool;**/
