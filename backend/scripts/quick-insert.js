// scripts/quick-insert.js
const { Pool } = require('pg');

console.log('BOOT quick-insert.js'); // prove the script starts

// If you keep creds in env, these fallbacks let you run without env too.
const pool = new Pool({
  host: process.env.PGHOST || '127.0.0.1',
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || 'node_user',
  password: process.env.PGPASSWORD || 'node_password',
  database: process.env.PGDATABASE || 'dragonstackdb',
});

// helpful in case something rejects silently
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

    const { rows: [row] } = await pool.query(
      `INSERT INTO generation (expiration)
       VALUES (NOW() + interval '60 seconds')
       RETURNING id, expiration`
    );
    console.log('INSERTED ->', row);
  } catch (e) {
    console.error('ERROR ->', e.stack || e.message || e);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
