const mongoose = require("mongoose");
//const { formQuery } = require("../utils/formQuery");

module.exports.getMongoDBSchema = async (uri) => {
  try {
    await mongoose.connect(uri);
    const collections = await mongoose.connection.db.collections();
    const schema = [];

    for (let collection of collections) {
      const name = collection.collectionName;
      const document = await collection.findOne();
      if (name && document) {
        const columns = [];
        for (let key in document) {
          columns.push({
            name: key,
            type: typeof document[key],
          });
        }
        schema.push({
          name,
          columns,
        });
      }
    }

    return schema;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    mongoose.disconnect();
  }
};

//this.getMongoDBSchema("mongodb://localhost:27017/roofy").then((r) => console.log(formQuery("", "", r)));
