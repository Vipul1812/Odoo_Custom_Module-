/** @odoo-module **/
import { registry } from "@web/core/registry";
import { memoize } from "@web/core/utils/functions";
import { Component , } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { useclicker } from "./clicker.js";
import { humanNumber } from "@web/core/utils/numbers";



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
    static props = ['*'];

    setup() {
        this.action = useService("action");
        this.state = useclicker();
    }

    openFormView(){
        this.action.doAction({
            type: "ir.actions.act_window",
            res_model: "estate.property.offer",
            views: [[false, "form"]],
            target: "new",
        });
    }

    increment(){
        this.state.counter += 400 ;
        console.log(this.state.counter);
    }

    get humanCount(){
        return humanNumber(this.state.counter , {decimal: 1 });
    }
    
}

registry.category("actions").add("ClickerClientAction", ClickerClientAction);