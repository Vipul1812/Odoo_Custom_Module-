/** @odoo-module */

import { useState } from "@odoo/owl";





export function useclicker() {
    return useState({ counter: 0 });
}