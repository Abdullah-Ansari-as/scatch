const mongoose = require('mongoose');
const config = require('config');

const dbgr = require('debug') ("development:mongoose");
// So, basically to setup env variable in windows type this command ---> $env:DEBUG="development"
// And to remove the env setup type this ---> Remove-Item Env:DEBUG

mongoose
    .connect(`${config.get("MONGODB_URI")}/scatch`)
    .then(() => {
        dbgr("connected")
    })
    .catch((err) => {
        dbgr(err)
    })

module.exports = mongoose.connection;