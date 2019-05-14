import {Router} from '../common/router'
import * as restify from 'restify'
import {Interface}  from './interface.model'


class InterfaceRouter extends Router{
    applyRoutes(application: restify.Server){

        //get all data
        application.get('/interface', (req, resp, next)=>{
            Interface.find().then(data=>{
              resp.json(data)
              return next()
            })
          })

        //get by interface id
          application.get('/interface/:id', (req, resp, next)=>{
            Interface.findById(req.params.id).then(data=>{
              if(data){
                resp.json(data)
                return next()
              }
              resp.send(404)
              return next()
            })
          })

        //insert data
        application.post('/interface', (req, resp, next)=>{
            let inter = new Interface(req.body)
            inter.save().then(data=>{
              resp.json(data)
              return next()
            })
          })

          //update sensor data
          application.put('/interface/:id/sensor', (req, resp, next)=>{
            var sensor = {kind: req.body.kind, value:req.body.value, date: req.body.date}
            Interface.update({_id: req.params.id}, {$push:{sensors:{$each:[sensor], $position:0}}}, {$pop:{sensors:1}})
                .exec().then(result=>{
              if(result.n){
                Interface.update({_id: req.params.id}, {$pop:{sensors:1}})
                .exec().then(async result=>{
                    return await Interface.findById(req.params.id)
                })
              }else{
                resp.send(404)
              }
            }).then(user=>{
              resp.json(user)
              return next()
            })
          })

           //update weights data
           application.put('/interface/:id/weights', (req, resp, next)=>{
            var weight = {value:req.body.value, date: req.body.date}
            Interface.update({_id: req.params.id}, {$push:{weights:{$each:[weight], $position:0}}}, {$pop:{weights:1}})
                .exec().then(result=>{
              if(result.n){
                Interface.update({_id: req.params.id}, {$pop:{weights:1}})
                .exec().then(async result=>{
                    return await Interface.findById(req.params.id)
                })
              }else{
                resp.send(404)
              }
            }).then(user=>{
              resp.json(user)
              return next()
            })
          })

           //update alerts data
           application.put('/interface/:id/alerts', (req, resp, next)=>{
            var alert = {kind: req.body.kind, value:req.body.value, date: req.body.date}
            Interface.update({_id: req.params.id}, {$push:{alerts:{$each:[alert], $position:0}}}, {$pop:{alerts:1}})
                .exec().then(result=>{
              if(result.n){
                Interface.update({_id: req.params.id}, {$pop:{alerts:1}})
                .exec().then(async result=>{
                    return await Interface.findById(req.params.id)
                })
              }else{
                resp.send(404)
              }
            }).then(user=>{
              resp.json(user)
              return next()
            })
          })

        //update data
        application.patch('/interface/:id', (req, resp, next)=>{
            const options = {new : true}
            Interface.findByIdAndUpdate(req.params.id, req.body, options).then(data=>{
              if(data){
                resp.json(data)
                return next()
              }
              resp.send(404)
              return next()
            })
        })

    }
}

export const interfaceRouter = new InterfaceRouter()