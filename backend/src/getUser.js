import * as mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

// Once we connect to the database once, we'll store that connection
// and reuse it so that we don't have to connect to the database on every request.
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  // Specify which database we want to use
  cachedDb = await client.db("api-full-stuck");

  return cachedDb;
}

export async function handler(event, context) {
  const _id = event.requestContext.authorizer.jwt.claims.sub;
  if (!_id) return {
    statusCode: 401,
    body: "wrong request",
  }
  
  // By default, the callback waits until the runtime event loop is empty
  // before freezing the process and returning the results to the caller.
  // Setting this property to false requests that AWS Lambda freeze the
  // process soon after the callback is invoked, even if there are events
  // in the event loop.
  context.callbackWaitsForEmptyEventLoop = false;

  // Get an instance of our database
  const db = await connectToDatabase();
  
  // Make a MongoDB MQL Query
  const user = await db.collection("users").findOne({_id})

  return {
    statusCode: 200,
    body: JSON.stringify(user, null, 2),
  };
}