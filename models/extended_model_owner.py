from odoo import models,fields,api 


class ExtendedModelOwner(models.Model):
    _inherit='owner'

    # Additional field for extended model
    additional_info = fields.Char(string="Additional Info")
    