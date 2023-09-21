"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twoDigit = (n) => {
    return ('0' + n).slice(-2);
};
exports.default = (date) => {
    date = date || new Date();
    const year = date.getFullYear();
    const month = twoDigit(date.getMonth() + 1);
    const day = twoDigit(date.getDate());
    const minutes = twoDigit(date.getMinutes());
    const seconds = twoDigit(date.getSeconds());
    return `${year}-${month}-${day}:${minutes}:${seconds}`;
};
