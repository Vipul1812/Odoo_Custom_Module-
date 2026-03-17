/** @odoo-module **/
import { registry } from "@web/core/registry";
import { memoize } from "@web/core/utils/functions";
import { Component } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { useclicker } from "./clicker.js";
import { humanNumber } from "@web/core/utils/numbers";

// 1. Helper Component for Tooltips
export class ClickValue extends Component {
    static template = "ClickValueTemplate";
    static props = ["value"];
    get humanCount() {
        return humanNumber(this.props.value, { decimals: 1 });
    }
}

const statisticsService = {
    dependencies: ["rpc"],
    start(env, { rpc }) {
        return {
            loadStatistics: memoize(() => rpc("/awesome_dashboard/statistics", {})),
        };
    },
};
registry.category("services").add("awesome_dashboard.statistics", statisticsService);

export class ClickerClientAction extends Component {
    static template = "ClickerClientTemplate";
    static components = { ClickValue }; 
    static props = ['*'];

    setup() {
        this.action = useService("action");
        this.effect = useService("effect"); 
        this.state = useclicker();
        
        this.hasShown2kEffect = false;
    }

    increment() {
        this.state.counter += 400;

        
        if (this.state.counter >= 2000 && !this.hasShown2kEffect) {
            this.hasShown2kEffect = true; 
            this.state.level = 1; 
            this.effect.add({
                type: "rainbow_man",
                text: "2.0k Clicks Reached! You are a pro!",
            });
        }
    }

    buyRobot() {
        if (this.state.counter >= 1000) {
            this.state.counter -= 1000;
            this.state.clickBots += 1;
        }
    }

    openFormView() {
        this.action.doAction({
            type: "ir.actions.act_window",
            res_model: "estate.property.offer",
            views: [[false, "form"]],
            target: "new",
        });
    }

    get humanCount() {
        return humanNumber(this.state.counter, { decimals: 1 });
    }
}

registry.category("actions").add("ClickerClientAction", ClickerClientAction);
