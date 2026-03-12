from odoo import http
from odoo.http import request
from odoo.addons.website.controllers.main import Home


class CustomWebsiteHome(Home):

    @http.route('/', type='http', auth="public", website=True, sitemap=True)
    def index(self, **kw):
        # render your custom homepage template
        return request.render('practitioner.home_template', {})

class PractitionerController(http.Controller):

    @http.route('/practitioner/registration', type='http', auth="public", website=True)
    def practitioner_registration_page(self, **kwargs):
        professions = request.env['profession.category'].sudo().search([])
        boards = request.env['board.type'].sudo().search([])
        return request.render('practitioner.registration_page_template', {
            'professions': professions,
            'boards': boards,
        })

    @http.route('/registration/submit', type='http', auth="public", methods=['POST'], website=True, csrf=True)
    def practitioner_registration_submit(self, **post):
        # Create the Practitioner record
        practitioner = request.env['res.partner'].sudo().create({
            'name': post.get('name'),
            'email': post.get('email'),
            'phone': post.get('phone'),
            'registration_number': post.get('registration_number'),
            'profession_category_id': int(post.get('profession_category_id')) if post.get('profession_category_id') else False,
            'board_type_id': int(post.get('board_type_id')) if post.get('board_type_id') else False,
            'rwpos_approval': bool(post.get('rwpos_approval')),
            'sessional_contract': bool(post.get('sessional_contract')),
        })

        if post.get('qual_name_1'):
            request.env['qualifications'].sudo().create({
                'name': post.get('qual_name_1'),
                'year': post.get('qual_year_1'),
                'partner_id': practitioner.id,
            })

        # Redirect back to home page after success
        return request.redirect('/')
