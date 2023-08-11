"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessagesGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var uuid_1 = require("uuid");
var MessagesGateway = /** @class */ (function () {
    function MessagesGateway() {
    }
    MessagesGateway.prototype.handleConnection = function (client) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log('Client connected' + client.id);
    };
    MessagesGateway.prototype.handleDisconnect = function (client) {
        console.log('Client disconnected' + client.id);
    };
    MessagesGateway.prototype.handleMessage = function (client, message) {
        console.log('Received message from client:', message, client.id);
        var formatMessage = {
            id: uuid_1.v4(),
            content: message,
            senderId: client.id
        };
        this.server.emit('message', formatMessage);
    };
    __decorate([
        websockets_1.WebSocketServer()
    ], MessagesGateway.prototype, "server");
    __decorate([
        websockets_1.SubscribeMessage('sendMessage')
    ], MessagesGateway.prototype, "handleMessage");
    MessagesGateway = __decorate([
        websockets_1.WebSocketGateway({ cors: true })
    ], MessagesGateway);
    return MessagesGateway;
}());
exports.MessagesGateway = MessagesGateway;
