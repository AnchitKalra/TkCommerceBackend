const db = require('mongoose');
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
