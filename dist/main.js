"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const user_router_1 = require("./users/user.router");
const interface_router_1 = require("./interface/interface.router");
const server = new server_1.Server();
server.bootstrap([user_router_1.usersRouter, interface_router_1.interfaceRouter]).then(server => {
    console.log('Server is listening on:', server.aplication.address());
}).catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
