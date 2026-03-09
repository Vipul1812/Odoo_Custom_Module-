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
        this.actionService = useService("action");

        this.state = useState({
            offers: [],
            selectedOffer: null,
            cards: []
        });

        this.display = {
            controlPanel: {
                "top-left": true,
                "top-right": true,
            },
        };

        onWillStart(async () => {

            // Load offers
            this.state.offers =
                await this.orm.call(
                    "estate.property.offer",
                    "get_offers_for_dashboard",
                    []
                );

            // Load saved cards
            const savedCards = localStorage.getItem("dashboard_cards");

            if (savedCards) {
                this.state.cards = JSON.parse(savedCards);
            }

        });
    }

    selectOffer(ev) {

        const offerId = parseInt(ev.target.value);

        const offer = this.state.offers.find(
            o => o.id === offerId
        );

        this.state.selectedOffer = offer;

    }

    addCard() {

        if (!this.state.selectedOffer) {
            return;
        }

        this.state.cards.push(this.state.selectedOffer);

        // Save to localStorage
        localStorage.setItem(
            "dashboard_cards",
            JSON.stringify(this.state.cards)
        );

    }

    async openoffers() {

        await this.actionService.doAction(
            "mycompany_custom.actions_estate_property_offer"
        );

    }

}

registry.category("actions")
.add("awesome_dashboard", AwesomeDashboard);