const db = require('mongoose');
const connection = async () => {
    try {
           const con = await db.connect("mongodb+srv://ak007kalra:admin@cluster0.glwxvhy.mongodb.net/?retryWrites=true&w=majority");
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
