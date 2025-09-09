"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _swagger_1 = require("../src/swagger");
new _swagger_1.SwaggerTSBuilder().buildFromControllers().then(() => {
    console.log('Success build swagger schemas');
});
//# sourceMappingURL=gSwagger.js.map