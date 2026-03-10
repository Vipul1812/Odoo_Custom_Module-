from odoo import http
from odoo.http import request
from datetime import datetime

class AwesomeDashboard(http.Controller):

    @http.route('/awesome_dashboard/statistics', type='json', auth='user')
    def get_statistics(self):
        # Timeframe: Current Month
        today = datetime.now()
        start_of_month = today.replace(day=1, hour=0, minute=0, second=0)
        
        
        Offer = request.env['estate.property.offer']

        # 1. Number of new offers this month
        new_offers = Offer.search([
            ('create_date', '>=', start_of_month)
        ])

        # 2. Total price of new offers
        total_price = sum(new_offers.mapped('price'))

        # 3. Average Price (replacing t-shirt qty logic)
        avg_price = total_price / len(new_offers) if new_offers else 0

        # 4. Number of "Cancelled" (we'll count offers with past deadlines)
        expired_offers = Offer.search_count([
            ('deadline_date', '<', today)
        ])

        # 5. Average Lead Time (Days from creation to deadline)
        timed_offers = Offer.search([('deadline_date', '!=', False)])
        total_seconds = 0
        for offer in timed_offers:
            diff = offer.deadline_date - offer.create_date
            total_seconds += diff.total_seconds()
        
        avg_days = (total_seconds / len(timed_offers) / 86400) if timed_offers else 0

        # Returning keys that match your existing XML <t t-esc="state.statistics..."/>
        return {
            "nb_new_orders": len(new_offers),
            "total_amount": f"{total_price:,.2f}",
            "avg_qty": round(avg_price, 2),
            "nb_cancelled_orders": expired_offers,
            "avg_days_to_finish": round(avg_days, 1),
        }