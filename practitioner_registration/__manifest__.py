# -*- coding: utf-8 -*-

{
    'name': 'HPCSA',
    'version': '1.4',
    'summary': 'Practitioner Registration',
    'sequence': 10,
    'description': """
    Practitioner Registration
    """,
    'category': '',
    'website': '',
    'depends': ['base_setup', 'crm'],
    'data': [
        'security/ir.model.access.csv',
        'views/practitioner_registration_views.xml',
        'views/digital_maintenance_of_licensure_views.xml',
    ],
    'demo': [

    ],
    'installable': True,
    'application': True,
    'author': 'In2it',
    'license': 'LGPL-3',
}
