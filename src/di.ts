/**
 * @author WMXPY
 * @namespace DI
 * @description DI
 */

import { AutoWirer, Injector } from "./declare";
import { Inject } from "./inject";

export const getInstance = (namespace?: string): Inject => {

    return Inject.getInstance(namespace);
};

export const asEntries = (namespace?: string): [Injector, AutoWirer] => {

    const instance: Inject = getInstance(namespace);

    return [instance.createServiceInjector(), instance.createServiceAutoWirer()];
};

export const asObjects = (namespace?: string): Readonly<{
   readonly Injectable: Injector;
   readonly AutoWire: AutoWirer;
}> => {

    const instance: Inject = getInstance(namespace);

    return Object.freeze({
        Injectable: instance.createServiceInjector(),
        AutoWire: instance.createServiceAutoWirer(),
    });
};

export const getInjector = (namespace?: string): Injector => {

    return getInstance(namespace).createServiceInjector();
};

export const getAutoWirer = (namespace?: string): AutoWirer => {

    return getInstance(namespace).createServiceAutoWirer();
};
