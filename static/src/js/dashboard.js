/** @odoo-module **/
import { useState, Component , markup} from "@odoo/owl";
import { registry } from "@web/core/registry";
import { Card } from "./card.js";

// --- CHILD COMPONENT ---
class CounterDisplay extends Component {
    static template = "CounterDisplayTemplate";
    // The child receives "count" via this.props
    
}



// --- PARENT COMPONENT ---
export class Dashboard extends Component {
    static template = "DashboardTemplate";
    
    // Register the Child component so the Parent can use it
    static components = { CounterDisplay, Card };

    setup() {
        this.state = useState({ counter: 0 });

        this.htmlContent = markup('<span class="badge bg-success">Active</span> <strong>verified</strong>');
        
        // 3. Define a normal string (this will still be escaped for safety)
        this.unsafeContent = "<b>This will look like text, not bold</b>";
    }

    incrementCounter() {
        this.state.counter++;
    }



    decrementCounter() {
        this.state.counter--;
    }

    
}

registry.category("actions").add("Dashboard", Dashboard);









