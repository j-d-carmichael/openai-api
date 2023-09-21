"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = require("fs-extra");
const calculateOutputFilePath = (inputFileName, number) => {
    const outputFilePath = path_1.default.join(process.cwd(), `${inputFileName}.gptoutput${number ? '(' + number + ')' : ''}.txt`);
    if (!(0, fs_extra_1.pathExistsSync)(outputFilePath)) {
        return outputFilePath;
    }
    if (number) {
        ++number;
    }
    else {
        number = 1;
    }
    return calculateOutputFilePath(inputFileName, number);
};
exports.default = calculateOutputFilePath;
