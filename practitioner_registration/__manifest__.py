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
    'depends': ['base_setup', 'web', 'mail', 'website', 'crm'],
    'data': [
        'security/ir.model.access.csv',
        'views/practitioner_home_template.xml',
        'views/practitioner_registration_views.xml',
        'views/digital_maintenance_of_licensure_views.xml',
        'views/practitioner_registration_template.xml',
        'views/practitioner_registration_menu.xml',
        'views/mlp.xml'
    ],
    'assets':{
        'web.assets_frontend': [
            'practitioner_registration/static/src/js/practitioner_registration.js',
        ],
    },
    'installable': True,
    'application': True,
    'author': 'In2it',
    'license': 'LGPL-3',
}
