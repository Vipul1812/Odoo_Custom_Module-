/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.PractitionerRegistration = publicWidget.Widget.extend({
    selector: '#practitioner_registration_form', // This targets your form ID

    events: {
        'click #add_licensure_row': '_onAddLicensure',
        'click .remove-lic': '_onRemoveLicensure',
    },

    start: function () {
        this.licCounter = 0;
        this.container = this.$('#hidden_files_container');
        this.tbody = this.$('#licensure_tbody');
        this.table = this.$('#licensure_table');
        return this._super.apply(this, arguments);
    },

    _onAddLicensure: function (ev) {
        ev.preventDefault();
        const nameInput = this.$('#temp_lic_name');
        const fileInput = this.$('#temp_lic_file')[0];

        if (!nameInput.val() || !fileInput.files[0]) {
            alert("Please provide both a name and a file.");
            return;
        }

        this.licCounter++;
        const fileName = fileInput.files[0].name;
        const uId = 'lic_' + this.licCounter;

        // 1. Clone the file input
        const hiddenInput = fileInput.cloneNode();
        hiddenInput.name = 'lic_file_' + uId;
        hiddenInput.id = 'input_' + uId;
        hiddenInput.style.display = 'none';
        this.container.append(hiddenInput);

        // 2. Add hidden name input
        this.container.append($('<input>', {
            type: 'hidden',
            name: 'lic_name_' + uId,
            value: nameInput.val(),
            id: 'name_' + uId
        }));

        // 3. Update Table UI
        this.tbody.append(`
            <tr id="row_${uId}">
                <td>${nameInput.val()}</td>
                <td><small class="text-muted">${fileName}</small></td>
                <td class="text-center">
                    <button type="button" class="btn btn-danger btn-sm remove-lic" data-id="${uId}">×</button>
                </td>
            </tr>
        `);

        // 4. Reset
        nameInput.val('');
        this.$('#temp_lic_file').val('');
        this.table.removeClass('d-none');
    },

    _onRemoveLicensure: function (ev) {
        const id = $(ev.currentTarget).data('id');
        this.$('#row_' + id).remove();
        this.$('#input_' + id).remove();
        this.$('#name_' + id).remove();
        if (this.tbody.find('tr').length === 0) {
            this.table.addClass('d-none');
        }
    },
});