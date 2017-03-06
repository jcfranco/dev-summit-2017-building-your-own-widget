# TypeScript + JS API Setup

## Initialize project (`package.json` with defaults)

```
npm init --yes
```

## Install dependencies

```
npm install --save-dev typescript
```

## Install typings

```
npm install --save-dev @types/arcgis-js-api
```

## Provide TypeScript compiler options

```json
{
  "compilerOptions": {
    "module": "amd",
    "noImplicitAny": true,
    "sourceMap": true,
    "jsx": "react",
    "reactNamespace": "jsxFactory",
    "target": "es5",
    "experimentalDecorators": true,
    "preserveConstEnums": true,
    "suppressImplicitAnyIndexErrors": true
  },
  "include": [
    "./app/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## Compile

```
tsc
```

## Run app!
