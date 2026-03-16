/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";
import { CheckBox } from "@web/core/checkbox/checkbox";

export class ConfigDialog extends Component {
    static template = "awesome_dashboard.ConfigDialog";
    static components = { Dialog, CheckBox };

    setup() {
        this.state = useState({
            // items that are NOT in the disabled list are "checked"
            checkedIds: this.props.items
                .filter(i => !this.props.disabledItems.includes(i.id))
                .map(i => i.id)
        });
    }

    toggleItem(id) {
        if (this.state.checkedIds.includes(id)) {
            this.state.checkedIds = this.state.checkedIds.filter(itemId => itemId !== id);
        } else {
            this.state.checkedIds.push(id);
        }
    }

    onApply() {
        // Items NOT checked are the ones to be "disabled"
        const disabledIds = this.props.items
            .filter(i => !this.state.checkedIds.includes(i.id))
            .map(i => i.id);
        
        this.props.onUpdateConfiguration(disabledIds);
        this.props.close();
    }
}
