```sh
pg_dump -U postgres --schema-only -s bits > 1_bits.pgsql
```

Prepend the output with 1\_ to avoid possible later conflicts when containerizing (Postgres image runs sql files alphabetically on initialization).
