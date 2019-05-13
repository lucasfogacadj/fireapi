"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const interfaceSchema = new mongoose.Schema({
    mac: {
        type: String,
        unique: true
    },
    sensors: [{
            kind: String,
            value: Number,
            date: Date
        }],
    weights: [{
            value: Number,
            date: Date
        }],
    alerts: [{
            kind: String,
            value: Number
        }]
});
exports.Interface = mongoose.model('Inter', interfaceSchema);
