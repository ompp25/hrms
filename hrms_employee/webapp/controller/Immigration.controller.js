sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/format/DateFormat"
], function(Controller, DateFormat) {
	"use strict";

	return Controller.extend("com.create.empEmp_creation.controller.Immigration", {

		formatDate: function(sValue) {

			var value = sValue.substring(6, 18); // maybe it's safer to work with regular expressions

			var oDateFormat = DateFormat.getDateInstance({
				pattern: "yyyy-MM-dd"
			});

			var date = oDateFormat.format(new Date(Number(value)));
			return date;
		},
		onSave: function(oEvent) {

		},

		onEdit: function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("dialog");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "com.create.empEmp_creation.view.Edit", this);
				oView.addDependent(oDialog);

			}

			oDialog.open();
			var oTable = this.getView().byId("tbl");
			//var selected = oEvent.getParameters();
			var path = oEvent.getSource().getParent().getBindingContext("modelProdMain").getPath();
			var model = oTable.getModel("modelProdMain");
			var property = model.getProperty(path);

			/*oView.byId("I1").setValue(property.ID);
			oView.byId("I2").setValue(property.Description);
			oView.byId("I3").setValue(property.Name);
			oView.byId("I4").setValue(property.Rating);
			oView.byId("I5").setValue(property.Price);*/

		},
		onCancel: function() {
			this.getView().byId("dialog").close();
		},
		flag: function(iValue) {
			var value = iValue;
			var pass = "Passport";
			var visa = "Visa";
			if (value === 0) {
				return pass;
			} else if (value === 1) {
				return visa;
			}

		}

	});

});