"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envirenment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    db: { url: process.env.DB_URL || 'mongodb://191.252.1.150/interface' }
};
