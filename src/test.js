import { before } from './index'

class A {

    @before(() => { console.log("before") })
    method() {
        console.log(this, "executed");
    }

}

new A().method();