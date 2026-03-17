/** @odoo-module **/
import { registry } from "@web/core/registry";
import { Component, useExternalListener } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks"; 
import { useclicker } from "./clicker.js"; // Import the shared service

export class Clicker extends Component {
    static template = "ClickerTemplate";
    
    setup() {
        this.state = useclicker(); 
        this.action = useService("action");
        this.effect = useService("effect");

        useExternalListener(window, "keydown", this.incrementfromExternal.bind(this));
    }

    incrementfromExternal(ev) {
        this.state.counter += 9;
        this.checkMilestone();
    }

    increment() {
        this.state.counter -= 1;
    }

   
    checkMilestone() {
        if (this.state.counter >= 2000 && this.state.level === 0) {
            this.state.level = 0;
            this.effect.add({
                type: "rainbow_man",
                text: "!! 2,000 Clicks! Robot Shop Unlocked !!",
            });
        }
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

export const systrayClicker = { Component: Clicker };
registry.category("systray").add("clicker", systrayClicker);
