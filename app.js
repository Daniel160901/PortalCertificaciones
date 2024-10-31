import App from './config/config.js';

const port = process.env.APP_PORT || 8081;

App.http.listen(port, ()=>console.log(`API is running, port: ${port}`));