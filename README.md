# legacy-front
Example of Legacy Front-End application demonstrated for coverage with tests

### Getting Started

Just install npm modules:

```
  npm install
```

There is a script which starts server on 3001 port.
```
  npm start
```
If you want to specify port, pass it via environment variables to server.js:

```
  PORT=8080 node server.js
```

### Running functional tests

To run functional tests you should start selenium first

```
  npm run selenium
```

After that you're able to run functional tests in different tab

```
  npm run functional
```

### Running unit tests
To run tests once just
```
  npm test
```
To run them in watching mode
```
  karma start
```
