"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    checkValidEmail: (email) => {
        const emailRegexp = /\S+@\S+\.\S+/;
        return emailRegexp.test(String(email).toLowerCase());
    },
};
//# sourceMappingURL=string_utils.js.map