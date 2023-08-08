/**
 * @type {import('@shelf/jest-dynamodb/lib').Config}')}
 */
const config = {
    tables: [
      {
        TableName: `funding`,
        KeySchema: [{AttributeName: 'id', KeyType: 'HASH'}],
        AttributeDefinitions: [{AttributeName: 'id', AttributeType: 'S'}],
        ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
      },
      {
        TableName: `product`,
        KeySchema: [{AttributeName: 'id', KeyType: 'HASH'}],
        AttributeDefinitions: [{AttributeName: 'id', AttributeType: 'S'}],
        ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
      },
      // etc
    ],
    port: 8000,
  };
  module.exports = config;