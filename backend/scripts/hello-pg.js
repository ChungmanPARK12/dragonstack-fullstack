const { Client } = require('pg');

(async () => {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: 'node_user',
    password: 'node_password',
    database: 'dragonstackdb',
    ssl: false,
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    const { rows } = await client.query(
      'INSERT INTO notes(message) VALUES ($1) RETURNING id, message, created_at',
      ['hello from node (final)']
    );
    console.log('Inserted row:', rows[0]);
  } catch (err) {
    console.error('PG ERROR:', err);
  } finally {
    await client.end();
  }
})();
