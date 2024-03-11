# Decesio
Empower Your Growth with Decesio: Your Personal and Professional Development Hub


## Create Database

```sql
sudo -u postgres psql
CREATE DATABASE decesio;
CREATE USER decesio WITH ENCRYPTED PASSWORD 'decesio';
ALTER ROLE decesio SET client_encoding TO 'utf8';
ALTER ROLE decesio SET default_transaction_isolation TO 'read committed';
ALTER ROLE decesio SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE decesio TO decesio;
```

## Drop Database

```sql
DROP DATABASE decesio WITH (FORCE);
```