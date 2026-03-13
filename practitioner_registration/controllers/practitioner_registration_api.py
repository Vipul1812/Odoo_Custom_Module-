# -*- coding: utf-8 -*-
import base64
from odoo import http
from odoo.http import request

class PractitionerController(http.Controller):

    @http.route('/', type='http', auth="public", website=True)
    def practitioner_home(self, **kwargs):
        return request.render('practitioner_registration.home_template', {})
    
    @http.route('/scope-of-professions', type='http', auth='public', website=True)
    def scope_professions(self, **kwargs):
        return request.render(
            'practitioner_registration.scope_professions_page'
        )

    @http.route('/practitioner/registration', type='http', auth="public", website=True)
    def practitioner_registration_page(self, **kwargs):
        professions = request.env['profession.category'].sudo().search([])
        boards = request.env['board.type'].sudo().search([])
        
        values = {
            'professions': professions,
            'boards': boards,
        }
        return request.render('practitioner_registration.registration_page_template', values)

    @http.route('/registration/submit', type='http', auth="public", methods=['POST'], website=True, csrf=True)
    def practitioner_registration_submit(self, **post):
        # 1. Create Lead (same as your current code)
        lead_values = {
            'name': post.get('name'),
            'contact_name': post.get('name'),
            'email_from': post.get('email'),
            'phone': post.get('phone'),
            'Registration_number': post.get('registration_number'),
            'profession_category_id': int(post.get('profession_category_id')) if post.get('profession_category_id') else False,
            'board_type': int(post.get('board_type_id')) if post.get('board_type_id') else False,
            'rwpos_approval': bool(post.get('rwpos_approval')),
            'sessional_contract': bool(post.get('sessional_contract')),
        }
        new_lead = request.env['crm.lead'].sudo().create(lead_values)

        # 2. Extract dynamic licensure records from the hidden inputs
        # We look for keys starting with 'lic_file_'
        for key in post.keys():
            if key.startswith('lic_file_'):
                suffix = key.replace('lic_file_', '') # Get the 'lic_1' part
                name_key = 'lic_name_' + suffix
                
                file_obj = post.get(key)
                lic_name = post.get(name_key)

                if file_obj and lic_name:
                    file_content = file_obj.read()
                    request.env['licensure'].sudo().create({
                        'name': lic_name,
                        'documents': base64.b64encode(file_content),
                        'crm_lead_id': new_lead.id,
                    })

        return request.render('website.contactus_thanks')
    
    @http.route('/mlp', type='http', auth="public", website=True)
    def mlp_registration(self, **kwargs):
        return request.render('practitioner_registration.mlp_template', {})