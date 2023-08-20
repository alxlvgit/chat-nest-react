"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var prisma_service_1 = require("src/prisma.service");
var user_module_1 = require("src/user/user.module");
var user_service_1 = require("src/user/user.service");
var auth_controller_1 = require("./auth.controller");
var auth_service_1 = require("./auth.service");
var local_strategy_1 = require("./strategies/local.strategy");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Module({
            imports: [
                user_module_1.UserModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.register({
                    secret: 'secretKey',
                    signOptions: { expiresIn: '60s' }
                }),
            ],
            providers: [auth_service_1.AuthService, user_service_1.UserService, local_strategy_1.LocalStrategy, prisma_service_1.PrismaService],
            controllers: [auth_controller_1.AuthController]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
