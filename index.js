const { serverHttp } = require('./src/http');
require('./src/websocket');

const port = process.env.PORT || 8080;
serverHttp.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});