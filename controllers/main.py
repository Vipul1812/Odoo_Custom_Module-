# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request
from datetime import datetime, date

class AwesomeDashboard(http.Controller):

    @http.route('/awesome_dashboard/statistics', type='json', auth='user')
    def get_statistics(self):
        today_dt = datetime.now()
        
        # First day of the current month
        start_of_month = today_dt.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

        Offer = request.env['estate.property.offer']

        # 1. New Offers (Created this month)
        new_offers = Offer.search([('create_date', '>=', start_of_month)])

        # 2. Total Revenue
        total_price = sum(new_offers.mapped('price'))

        # 3. Average Price
        avg_price = total_price / len(new_offers) if new_offers else 0

        # 4. Expired Offers (Using your actual field: deadline_date)
        expired_offers_count = Offer.search_count([
            ('deadline_date', '<', today_dt)
        ])

        # 5. Average Days to Finish (Logic between create_date and deadline_date)
        timed_offers = Offer.search([('deadline_date', '!=', False)])
        total_seconds = 0
        for offer in timed_offers:
            diff = offer.deadline_date - offer.create_date
            total_seconds += diff.total_seconds()

        avg_days = (total_seconds / len(timed_offers) / 86400) if timed_offers else 0

        return {
            "nb_new_orders": len(new_offers),
            "total_amount": f"{total_price:,.2f}",
            "avg_qty": round(avg_price, 2),
            "nb_cancelled_orders": expired_offers_count,
            "avg_days_to_finish": round(avg_days, 1),
        }