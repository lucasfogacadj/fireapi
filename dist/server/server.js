"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const envirenment_1 = require("../common/envirenment");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(envirenment_1.envirenment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.aplication = restify.createServer({
                    name: 'interface',
                    version: '1.0.0'
                });
                this.aplication.use(restify.plugins.queryParser());
                this.aplication.use(restify.plugins.bodyParser());
                //routes
                for (let router of routers) {
                    router.applyRoutes(this.aplication);
                }
                this.aplication.listen(envirenment_1.envirenment.server.port, () => {
                    resolve(this.aplication);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
