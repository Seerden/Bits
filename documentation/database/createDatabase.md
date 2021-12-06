To create a .sql file that builds the database tables in their current form, run

```
    pg_dump -U postgres --schema-only bits > createBits.sql
```

Fairly sure this requires the actual database to exist, so first run

```
    psql -U postgres -c 'create database bits;'
```
