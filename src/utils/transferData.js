const Airtable = require('airtable');
const { MongoClient } = require('mongodb');

// Airtable configuration
const airtableApiKey = 'patQ43xcz4cwsG0L6.e16f615d08e4ff8b5de0c5d96871f5c9fdc4298b60b2bd4dd2549e3efa077e07';
const airtableBaseId = 'appzHJlVHHZl7fv96.';
const airtableTableName = 'swd';

// MongoDB configuration
const mongoURI = 'mongodb+srv://';
const mongoDatabaseName = 'sandbox.6gta4vq.mongodb.net';
const mongoCollectionName = 'sphuhu';

// Initialize Airtable client
const airtable = new Airtable({ apiKey: airtableApiKey }).base(airtableBaseId)(airtableTableName);

// Connect to MongoDB
MongoClient.connect(mongoURI, { useUnifiedTopology: true }, async (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  try {
    const db = client.db(mongoDatabaseName);
    const collection = db.collection(mongoCollectionName);

    // Fetch data from Airtable
    const records = await airtable.select({}).all();

    // Insert data into MongoDB
    await collection.insertMany(records.map(record => record.fields));

    console.log('Data transfer successful');
  } catch (err) {
    console.error('Error transferring data:', err);
  } finally {
    // Close MongoDB connection
    client.close();
  }
});
