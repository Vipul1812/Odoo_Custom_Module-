
from odoo import fields, models


class Owner(models.Model):
    _name = "owner"
    _description = "Owner Portal"
    

    Properties_info = fields.One2many(
        'estate.property',
        'owners_list'
    )

    name = fields.Char(string="Name", size=20)
    contact_info = fields.Integer(string="Contact Info")

    shared_property_ids = fields.Many2many(
        'estate.property',
        'owner_property_shared_rel',
        'owner_id',
        'property_id',
        string="Shared Properties"
    )
    
    def _compute_display_name(self):
        for rec in self:
            rec.display_name = f"{rec.name}  {rec.contact_info}"
