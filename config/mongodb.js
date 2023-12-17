require('dotenv').config();
const mongoose = require('mongoose').set('strictQuery', false);

main().then(()=> console.log('Database Connected...')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB);
  
}

module.exports = mongoose;

