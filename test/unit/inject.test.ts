/**
 * @author WMXPY
 * @namespace DI
 * @description Inject
 * @override
 */

import { expect } from "chai";
import * as Chance from "chance";
import { afterEach } from "mocha";
import { Inject } from "../../src/inject";

describe('Given {Inject} class', (): void => {

    const chance: Chance.Chance = new Chance('di-inject');

    it('should be able to get global instance', (): void => {

        const inject: Inject = Inject.getInstance();

        expect(inject).to.be.instanceOf(Inject);
    });

    it('should be able to add service', (): void => {

        const inject: Inject = Inject.getInstance();

        // tslint:disable-next-line
        inject.service(chance.string(), class {
            public constructor(public name: string) { }
        });

        expect(inject).to.have.lengthOf(1);
    });

    afterEach((): void => {

        Inject.removeAllInstance();
    });
});
