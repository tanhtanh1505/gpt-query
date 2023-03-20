const { MongoClient } = require("mongodb");

module.exports.getMongoDBSchema = async (uri) => {
  const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
  try {
    const db = client.db();
    const collections = await db.collections();
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
    await client.close();
  }
};
