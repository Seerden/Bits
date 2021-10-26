## Node backend for a full stack app with TypeScript:

### Base dependencies:
```
npm i -D ts-node ts-node-dev
```

### Scripts:
- In `server/package.json`, assuming that the entrypoint is `index.ts`:
```javascript
"scripts": {
    "start-dev": "ts-node-dev --poll --respawn ./index.ts"
}
```

If we want to run the front- and backend concurrently, include concurrently in the top-level package.json and run as follows (following snippet includes a TypeGraphQL codegen script as well)

- In `/package.json`:
```javascript
"sd": "concurrently \"npm:codegen\" \"npm:start-front --prefix ./frontend\" \"npm:start-dev --prefix ./backend\"",
```
 - With `codegen` command:
 ```javascript
 "codegen": "wait-on tcp:5000 && graphql-codegen --config codegen.yml --watch \"./backend/schema.gql\""
 ``` 
 where `npm:codegen` depends on `/codegen.yaml`
 ```yaml
 overwrite: true
schema: "http://localhost:5000/graphql"
# documents: ./frontend/src/**/*.graphql
documents: null
generates:
  ./frontend/src/graphql/codegen-output.ts:
    plugins:
      - "typescript"
      - "typescript-resolvers"
      - "typescript-operations"
      # - "typescript-react-query"
      # - "typescript-urql"
    # config:
    #   withHooks: true

 ```