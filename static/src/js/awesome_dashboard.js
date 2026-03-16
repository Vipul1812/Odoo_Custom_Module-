/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState, onWillStart } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";
import { ConfigDialog } from "./ConfigDialog.js"; 
import { browser } from "@web/core/browser/browser";

export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard";
    static components = { Layout };

    setup() {
        this.orm = useService("orm");
        this.actionService = useService("action");
        this.statisticsService = useService("awesome_dashboard.statistics");
        this.dialog = useService("dialog");

        
        this.items = [
            { id: "statistics", name: "Live Business Data" },
            { id: "selector", name: "Offer Pinner Tool" }, 
            { id: "cards", name: "Pinned Cards List" },
            { id: "leads_btn", name: "Quick Leads Access" },
            { id: "customers_btn", name: "Quick Customers Access" },
        ];

        const savedConfig = browser.localStorage.getItem("disabledDashboardItems");

        this.state = useState({
            offers: [],
            selectedOffer: null,
            cards: [],
            statistics: {},
            showWarning: false,
            loading: true,
            disabledItems: savedConfig ? JSON.parse(savedConfig) : [],
        });

        this.display = {
            controlPanel: { "top-left": true, "top-right": true , "bottom-left": true, "bottom-right": true },
        };

        onWillStart(async () => {
            this.state.offers = await this.orm.call(
                "estate.property.offer",
                "get_offers_for_dashboard",
                []
            );

            this.state.statistics = await this.statisticsService.loadStatistics();

            // FIX: Use browser.localStorage for consistency
            const savedCards = browser.localStorage.getItem("dashboard_cards");
            if (savedCards) {
                try {
                    this.state.cards = JSON.parse(savedCards);
                } catch {
                    this.state.cards = [];
                }
            }

            this.state.loading = false;
        });
    }

    openConfiguration() {
        this.dialog.add(ConfigDialog, {
            items: this.items,
            disabledItems: this.state.disabledItems,
            onUpdateConfiguration: (newDisabledItems) => {
                this.state.disabledItems = newDisabledItems;
                browser.localStorage.setItem("disabledDashboardItems", JSON.stringify(newDisabledItems));
            },
        });
    }

    openLeads() {
        this.actionService.doAction({
            type: "ir.actions.act_window",
            res_model: "estate.property.offer",
            views: [[false, "kanban"], [false, "form"]],
        });
    }

    openCustomerView() {
        this.actionService.doAction({
            type: "ir.actions.act_window",
            res_model: "estate.property.offer",
            views: [[false, "list"], [false, "form"]],
        });
    }

    selectOffer(ev) {
        const id = Number(ev.target.value);
        this.state.selectedOffer = this.state.offers.find(o => o.id === id);
    }

    addCard() {
        const selected = this.state.selectedOffer;
        if (!selected) return;

        const duplicate = this.state.cards.some(c => c.id === selected.id);
        if (duplicate) {
            this.state.showWarning = true;
            return;
        }

        this.state.cards.push({
            ...selected,
            card_uid: Date.now(),
        });

        this.saveCards();
        this.state.showWarning = false;
    }

    deleteCard(uid) {
        this.state.cards = this.state.cards.filter(c => c.card_uid !== uid);
        this.saveCards();
    }

    saveCards() {
        browser.localStorage.setItem("dashboard_cards", JSON.stringify(this.state.cards));
    }

    async openDetails(id) {
        await this.actionService.doAction({
            type: "ir.actions.act_window",
            res_model: "estate.property.offer",
            res_id: id,
            views: [[false, "form"]],
            target: "current",
        });
    }
}
registry.category("actions").add("AwesomeDashboard", AwesomeDashboard);
