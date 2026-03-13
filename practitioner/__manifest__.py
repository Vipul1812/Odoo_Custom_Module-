# -*- coding: utf-8 -*-

{
    'name': 'practitioner',
    'version': '1.4',
    'summary': 'Practitioner Registration',
    'sequence': 10,
    'description': """
    Practitioner Registration
    """,
    'category': '',
    'website': '',
    'depends': ['base_setup', 'web', 'mail', 'website'],
    'data': [
        'views/practitioner_registration_template.xml',
        'views/practitioner_registration_menu.xml',
        'views/home_template.xml',
        'views/about_us.xml'
    ],
    'installable': True,
    'application': True,
    'author': 'In2it',
    'license': 'LGPL-3',
}
