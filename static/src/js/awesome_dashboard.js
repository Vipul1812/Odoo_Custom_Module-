/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState, onWillStart } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { useService } from "@web/core/utils/hooks";

export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard";
    static components = { Layout };

    setup() {
        this.orm = useService("orm");
        this.rpc = useService("rpc");
        this.actionService = useService("action");

        this.state = useState({
            offers: [],
            selectedOffer: null,
            cards: [],
            statistics: {}
        });

        this.display = {
            controlPanel: { "top-left": true, "top-right": true },
        };

        onWillStart(async () => {
            // 1. Fetch offers from the model method we updated above
            this.state.offers = await this.orm.call(
                "estate.property.offer",
                "get_offers_for_dashboard",
                []
            );

            // 2. Fetch statistics from your Python controller
            this.state.statistics = await this.rpc("/awesome_dashboard/statistics");

            // 3. Load pinned cards
            const savedCards = localStorage.getItem("dashboard_cards");
            if (savedCards) {
                this.state.cards = JSON.parse(savedCards);
            }
        });
    }

    openLeads(){
        this.actionService.doAction({
            type: "ir.actions.act_window",
            res_model: "estate.property.offer",
            views: [[false, "kanban"], [false, "form"]],
            target: "current",
        }); 
    }

    openCustomerView() {
        this.actionService.doAction({
            type: "ir.actions.act_window",
            res_model: "estate.property.offer",
            views: [[false, "tree"], [false, "form"]],
            target: "current",
        });

    }

    selectOffer(ev) {
        const offerId = parseInt(ev.target.value);
        this.state.selectedOffer = this.state.offers.find(o => o.id === offerId);
    }

    addCard() {
        if (!this.state.selectedOffer) return;
        // Check if card already exists to avoid duplicates
        if (!this.state.cards.find(c => c.id === this.state.selectedOffer.id)) {
            this.state.cards.push({
                ...this.state.selectedOffer,
                card_uid: Date.now()
            });
            this.saveCards();
        }
    }

    deleteCard(cardUid) {
        this.state.cards = this.state.cards.filter(c => c.card_uid !== cardUid);
        this.saveCards();
    }

    saveCards() {
        localStorage.setItem("dashboard_cards", JSON.stringify(this.state.cards));
    }

    async openDetails(offerId) {
        await this.actionService.doAction({
            type: "ir.actions.act_window",
            res_model: "estate.property.offer",
            res_id: offerId,
            views: [[false, "form"]],
            target: "current",
        });
    }
}

registry.category("actions").add("awesome_dashboard", AwesomeDashboard);