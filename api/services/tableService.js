const azure = require("azure-storage");

const tableSvc = azure.createTableService(
  "jobadderdemo9491",
  process.env.AZURE_STORAGE_ACCESS_KEY
);

const insertEntity = (tableName, entity) => {
  return new Promise((resolve, reject) => {
    tableSvc.insertEntity(
      tableName,
      entity,
      { echoContent: true, payloadFormat: "application/json;odata=nometadata" },
      (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      }
    );
  });
};

const queryEntities = (tableName, query) => {
  return new Promise((resolve, reject) => {
    tableSvc.queryEntities(
      tableName,
      query,
      null, //expects a continouation token
      { payloadFormat: "application/json;odata=nometadata" },
      (error, result, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.body);
        }
      }
    );
  });
};
exports.insertEntity = insertEntity;
exports.queryEntities = queryEntities;
