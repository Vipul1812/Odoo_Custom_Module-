/** @odoo-module **/
import { registry } from "@web/core/registry";
import { memoize } from "@web/core/utils/functions";
import { Component , } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";


const statisticsService = {
    dependencies: ["rpc"],
    start(env, { rpc }) {
        return {
            loadStatistics: memoize(() => rpc("/awesome_dashboard/statistics", {})),
        };
    },
};

registry.category("services").add("awesome_dashboard.statistics", statisticsService);


class ClickerClientAction extends Component {
    static template = "ClickerClientTemplate";
    static props = ['*'];

    setup() {
        this.action = useService("action");
        
    }

    openFormView(){
        this.action.doAction({
            type: "ir.actions.act_window",
            res_model: "estate.property.offer",
            views: [[false, "form"]],
            target: "new",
        });
    }
    
}

registry.category("actions").add("ClickerClientAction", ClickerClientAction);