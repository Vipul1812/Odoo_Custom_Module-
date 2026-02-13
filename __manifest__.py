{
    "name": "MyCompany Custom",
    "version": "17.0.1.0.0",
    "summary": "Custom module for MyCompany",
    "category": "Custom",
    "author": "MyCompany",
    "license": "LGPL-3",
    "depends": ["base", "sale", "web", "mail", "report_xlsx"],
    "data": [
        "security/ir.model.access.csv",
        "data/owner.csv",
        "data/estate.property.xml",
        "data/owner.xml",
        "data/delete_id.xml",
        "views/estate_property.xml",
        "views/owner.xml",
        "views/enquiry.xml",
        "views/email_temp.xml",
        "views/extended_model_owner.xml",
        "wizard/property_enquiry.xml",
        "wizard/email_wizard.xml",
        "report/qweb_report.xml",
        "report/qweb_custom_pdf.xml",
        "Email_template/email.xml",
        "report/report_action_xslx.xml"
    ],
    "demo": [
        "demo/demo_data_xml.xml"
    ],

    "assets": {
        "web.assets_backend": [
            "mycompany_custom/static/src/css/tree_spacing.css",
        ],
    },

    "installable": True,
    "application": True
}
