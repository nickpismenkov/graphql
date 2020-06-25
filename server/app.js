const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const { connect, connection } = require('mongoose');

const app = express();
const PORT = 3000;

connect('mongodb://127.0.0.1:27017/graphql', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const dbConnection = connection;
dbConnection.on('error', (err) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB'));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log('Server started');
});
