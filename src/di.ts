/**
 * @author WMXPY
 * @namespace DI
 * @description DI
 */

import { AutoWirer, Injector } from "./declare";
import { Inject } from "./inject";

export const asEntries = <L extends Record<string, any> = any>(namespace?: string): [Injector<L>, AutoWirer<L>] => {

    const instance: Inject<L> = Inject.getInstance(namespace);

    return [instance.createServiceInjector(), instance.createServiceAutoWirer()];
};
