"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const interface_model_1 = require("./interface.model");
class InterfaceRouter extends router_1.Router {
    applyRoutes(application) {
        //get all data
        application.get('/interface', (req, resp, next) => {
            interface_model_1.Interface.find().then(data => {
                resp.json(data);
                return next();
            });
        });
        //get by interface id
        application.get('/interface/:id', (req, resp, next) => {
            interface_model_1.Interface.findById(req.params.id).then(data => {
                if (data) {
                    resp.json(data);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
        //insert data
        application.post('/interface', (req, resp, next) => {
            let inter = new interface_model_1.Interface(req.body);
            inter.save().then(data => {
                resp.json(data);
                return next();
            });
        });
        //update data
        application.put('/interface/:id/sensor', (req, resp, next) => {
            var sensor = { kind: req.body.kind, value: req.body.value, date: req.body.date };
            interface_model_1.Interface.update({ _id: req.params.id }, { $push: { sensors: { $each: [sensor], $position: 0 } } }, { $pop: { sensors: 1 } })
                .exec().then(result => {
                if (result.n) {
                    console.log(result);
                    interface_model_1.Interface.update({ _id: req.params.id }, { $pop: { sensors: 1 } })
                        .exec().then((result) => __awaiter(this, void 0, void 0, function* () {
                        return yield interface_model_1.Interface.findById(req.params.id);
                    }));
                }
                else {
                    resp.send(404);
                }
            }).then(user => {
                resp.json(user);
                return next();
            });
        });
        //update data
        application.patch('/interface/:id', (req, resp, next) => {
            const options = { new: true };
            interface_model_1.Interface.findByIdAndUpdate(req.params.id, req.body, options).then(data => {
                if (data) {
                    resp.json(data);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
    }
}
exports.interfaceRouter = new InterfaceRouter();
