const { serverHttp , app } = require('./src/http');
require('./src/websocket');
const momgoose = require('mongoose');

const port = process.env.PORT || 8080;
serverHttp.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});