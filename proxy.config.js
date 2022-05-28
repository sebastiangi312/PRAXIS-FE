const PROXY_CONFIG = {
  "/api/": {
    "target" :"http://"+process.env.API_URL+":"+process.env.API_PORT,
    "secure": false,
    "logLevel": "debug"
  }
}
module.exports = PROXY_CONFIG;