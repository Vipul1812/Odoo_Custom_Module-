/** @odoo-module **/
import { registry } from "@web/core/registry";

const dashboardService = {
    dependencies: ["orm"],
    start(env, { orm }) {
        return {
            async getOfferCount() {
                // Fetches total count from the estate.property.offer model
                return await orm.searchCount("estate.property.offer", []);
            },
        };
    },
};

registry.category("services").add("dashboard_stats", dashboardService);
