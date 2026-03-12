
from odoo import api, fields, models

class DigitalMaintenanceOfLicensure(models.Model):
    _inherit = 'crm.lead'

    profession_category_id = fields.Many2one('profession.category', string="Profession/Category")
    Registration_number = fields.Char(string="HPCSA Student Reg Number")
    board_type = fields.Many2one('board.type', string="Board Type")

    licensure_ids = fields.One2many('licensure', 'crm_lead_id', string="Licensure Details")

    rwpos_approval = fields.Boolean(string="RWOPS Approval")
    sessional_contract = fields.Boolean(string="Sessional Contract")
