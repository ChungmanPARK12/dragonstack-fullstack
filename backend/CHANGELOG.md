### postgreDB connection issue
- My backend is running fine, calling table and trying to insert.
- When I call database table, I get JSON back but my database table never shows new rows, it was okay to insert in manual, the fundamental issue is to insert in auto.

## Suspicious and diagnosis
- The insert query is not reaching the database some reason, the logs show the function is called, but the DB write isn't happaening. 

- The database connection is not working properly in `databasePool.js`, debug with `pool.on` error response. 

## Action
- Check `databasePool.js` is should export a connected `pg.pool` using `databaseConfiguration.js`(clear).
- In `table.js` must confirm insert(clear).
- Check `databaseConfiguration.js` using `dragonstackdb`(clear).

### [2025-10-04] - [2025-10-05] postgreDB connection issue

## Suspicious and diagnosis
- (Clear)The `pool.queiry` callback is running, but `response.row` is probably empty.
- (Clrear)DB connection is correct, `INSERT`query is being attempted.
# Schema mismatch
- (Clear)Maybe the `generation`table has differ col names.

### [2025-10-25] - [2025-10-27]

## Suspicous and diagnosis
- My db inserting into a different Postgres or database some reason.
- It running two different PostgreSQL servers and one under Windows and WSL.

# Debug
- Add debugging, pool explicit in `databasePool.js`, checking DB connection status.

## [2025-10-25] — Fix: PostgreSQL connection + inserts from backend

### Summary
Resolved persistent timeouts from Node → PostgreSQL in WSL and verified full CRUD path.  
Backend now connects reliably and performs inserts/reads against `dragonstackdb`.

### Root Cause
- `pg` client in the backend wasn’t using a fully explicit config (host/ssl/timeout), so it timed out despite `psql` working.

### What Changed

- **Locked DB config (local)**
  - `secrets/databaseConfiguration.js`
    ```js
    module.exports = {
      user: 'node_user',
      host: '127.0.0.1', // Added host
      database: 'dragonstackdb',
      password: 'node_password',
      port: 5432, // Since here was original
      ssl: { rejectUnauthorized: false },   // local: effectively off
      connectionTimeoutMillis: 3000,
      idleTimeoutMillis: 3000,
    };
    ```
    - 
- **Pooled connection now uses full config**
  - `databasePool.js`
    ```js
    const { Pool } = require('pg');
    const cfg = require('./secrets/databaseConfiguration');

    const pool = new Pool({
      host: cfg.host,
      port: cfg.port ?? 5432,
      user: cfg.user,
      password: cfg.password,
      database: cfg.database,
      ssl: cfg.ssl ?? false,
      connectionTimeoutMillis: cfg.connectionTimeoutMillis ?? 10000,
      idleTimeoutMillis: cfg.idleTimeoutMillis ?? 10000,
    });

    // Startup banner (health check)
    (async () => {
      try {
        const { rows: [r] } = await pool.query(`
          SELECT current_database() AS db,
                 current_user AS usr,
                 inet_server_addr()::text AS host,
                 inet_server_port() AS port
        `);
        console.log(\`[DB] Connected -> db=\${r.db}, user=\${r.usr}, host=\${r.host}, port=\${r.port}\`);
      } catch (e) {
        console.error('[DB] Connection check failed:', e.message || e);
      }
    })();
    module.exports = pool;
    ```

### [2025-11-01] - [2025-11-02] - 44, 45







