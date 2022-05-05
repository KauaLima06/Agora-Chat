const { serverHttp , app } = require('./src/http');
require('./src/websocket');
const mongoose = require('mongoose');
require('dotenv').config();

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const port = process.env.PORT || 8080;
//Connecting data base
mongoose.connect(`mongodb+srv://${db_user}:${db_pass}
@api-db.0xuhv.mongodb.net/agora-api?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Mongo was connected');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    })
    .catch(err => console.log(`Error: ${err}`));