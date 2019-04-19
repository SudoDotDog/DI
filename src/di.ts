/**
 * @author WMXPY
 * @namespace DI
 * @description DI
 */

import { AutoWirer, Injector } from "./declare";
import { Inject } from "./inject";

export const getInstance = <L extends Record<string, any> = Record<string, any>>(namespace?: string): Inject<L> => {

    return Inject.getInstance(namespace);
};

export const asEntries = <L extends Record<string, any> = Record<string, any>>(namespace?: string): [Injector<L>, AutoWirer<L>] => {

    const instance: Inject<L> = getInstance(namespace);

    return [instance.createServiceInjector(), instance.createServiceAutoWirer()];
};

export const asObjects = <L extends Record<string, any> = Record<string, any>>(namespace?: string): Readonly<{
    readonly Injectable: Injector<L>;
    readonly AutoWire: AutoWirer<L>;
}> => {

    const instance: Inject<L> = getInstance(namespace);

    return Object.freeze({
        Injectable: instance.createServiceInjector(),
        AutoWire: instance.createServiceAutoWirer(),
    });
};

export const getInjector = <L extends Record<string, any> = Record<string, any>>(namespace?: string): Injector<L> => {

    return getInstance<L>(namespace).createServiceInjector();
};

export const getAutoWirer = <L extends Record<string, any> = Record<string, any>>(namespace?: string): AutoWirer<L> => {

    return getInstance<L>(namespace).createServiceAutoWirer();
};
