/** @odoo-module **/
import { Component, useState, onWillRender } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class PriceConverter extends Component {
    setup() {
        this.state = useState({
            usdAmount: 1,
            exchangeRate: 90.65,
            INRAmount: 0, // This will be updated by the hook
        });

  
        onWillRender(() => {
            console.log("Hook triggered: Updating INR based on USD");
            
            // Logic: Calculate and round the result
            const calculated = this.state.usdAmount * this.state.exchangeRate;
            this.state.INRAmount = parseFloat(calculated.toFixed(2));
        });
    }

    // Called when the user types in the input box
    updatePrice(ev) {
        // Essential: Convert string input "100" to number 100
        const value = parseFloat(ev.target.value);
        this.state.usdAmount = isNaN(value) ? 0 : value;
    }
}

PriceConverter.template = "PriceConverter";
registry.category("actions").add("PriceConverter", PriceConverter);