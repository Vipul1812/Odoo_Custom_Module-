/** @odoo-module **/

import { registry } from "@web/core/registry";

import { Component, useState, useExternalListener } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks"; 
import { ClickerClientAction } from "./dashboard_service.js";

export class Clicker extends Component {
    static template = "ClickerTemplate";
    static components = { ClickerClientAction };
    
    setup() {
        this.state = useState({ count: 0 });
        this.action = useService("action");


        useExternalListener(window, "keydown", this.incrementfromExternal.bind(this));
    }

    incrementfromExternal(ev) {

        this.state.count += 9;
    }

    increment() {
        this.state.count -= 1;
    }

    opentree() {
        this.action.doAction({
            name: "Open External Click",
            type: "ir.actions.client",
            tag: "ClickerClientAction",
            target: "new",
        });

    }
  
}

export const systrayClicker = {
    Component: Clicker,
};

registry.category("systray").add("clicker", systrayClicker);
