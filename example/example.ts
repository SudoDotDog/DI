/**
 * @author WMXPY
 * @namespace Example
 * @description Example
 */

import { asEntries } from "../src/di";
import { Inject } from "../src/index";

const [Injectable, AutoWire] = asEntries('example');

@Injectable()
class Some {
    public constructor(public name: string = 'hello') { }
}

const test = () => {
    const a = AutoWire<Some>(Some);
    console.log(a.name);
};
test();

Inject.getInstance('example').refreshService(Some, 'world');

test();
