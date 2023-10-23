const db = require('mongoose');
const DB_URL = "mongodb+srv://ak007kalra:admin@cluster0.glwxvhy.mongodb.net/?retryWrites=true&w=majority"
const connection = async () => {
    try {
           const con = await db.connect(DB_URL)
   if(con) {
    console.log("Succesfully connected to DB");
   }
   else {
        throw new Error(e);
   }
}catch(err) {
    console.log(err);
}
};
connection()
module.exports = db;