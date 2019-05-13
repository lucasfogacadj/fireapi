import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { envirenment } from "../common/envirenment";
import {Router} from "../common/router";

export class Server {

    aplication:restify.Server

    initializeDb() {
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(envirenment.db.url, {
          useMongoClient: true
        })
      }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.aplication = restify.createServer({
                    name: 'interface',
                    version: '1.0.0'
                })
                this.aplication.use(restify.plugins.queryParser())
                this.aplication.use(restify.plugins.bodyParser())

                //routes
                for (let router of routers) {
                  router.applyRoutes(this.aplication)
                }

                this.aplication.listen(envirenment.server.port,()=>{
                    resolve(this.aplication)
                })

            } catch (error) {
                reject(error)
            }
        })
    }
    bootstrap(routers: Router[]=[]): Promise<Server> {
        return this.initializeDb().then(()=>
            this.initRoutes(routers).then(() => this)
        ) 
    }
}