'use strict';

module.exports = class Token {

    constructor(tokenData) {
        for (const key of Object.keys(tokenData)) {
            this[key] = tokenData[key];
        }
        this.dependents = [];
    }

    setGovernor(governor, dependencyType) {
        this.governor = governor;
        this.dependencyType = dependencyType;
        governor.dependents.push(this);
    }

};
