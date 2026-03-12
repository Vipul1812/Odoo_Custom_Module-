
from odoo import api, fields, models

class PractitionerRegistration(models.Model):
    _inherit = 'res.partner'

    profession_category_id = fields.Many2one('profession.category', string="Profession/Category")
    Registration_number = fields.Char(string="HPCSA Student Reg Number")
    board_type = fields.Many2one('board.type', string="Board Type")
    qualifications_ids = fields.One2many('qualifications', 'partner_id', string="Qualifications Details")
    experience_ids = fields.One2many('experience', 'partner_id', string="Experience Details")
    licensure_ids = fields.One2many('licensure', 'partner_id', string="Licensure Details")

    rwpos_approval = fields.Boolean(string="RWOPS Approval")
    sessional_contract = fields.Boolean(string="Sessional Contract")


class ProfessionCategory(models.Model):
    _name = 'profession.category'

    name = fields.Char(string="Name")
    code = fields.Char(string="Code")


class BoardType(models.Model):
    _name = 'board.type'

    name = fields.Char(string="Name")
    code = fields.Char(string="Code")
    cpd_hours = fields.Float(string="CPD hours")


class Qualifications(models.Model):
    _name = 'qualifications'

    degree_certificate = fields.Char(string="Degree Certificate")
    university_name = fields.Char(string="University Name")
    year_of_completion = fields.Date(string="Year of Completion")
    internship_community_service_proof = fields.Binary(string="Internship/Community Service Proof")
    partner_id = fields.Many2one('res.partner')


class Experience(models.Model):
    _name = 'experience'

    start_date = fields.Date(string="Start Date")
    end_date = fields.Date(string="End Date")
    service_record = fields.Char(String="Service Record")
    partner_id = fields.Many2one('res.partner')

class Licensure(models.Model):
    _name = 'licensure'

    name = fields.Char(string="Name")
    documents = fields.Binary(string="Document")
    partner_id = fields.Many2one('res.partner')
    crm_lead_id = fields.Many2one('crm.lead')
