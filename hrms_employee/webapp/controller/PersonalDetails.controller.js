sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/type/DateTime",
	"sap/ui/core/format/DateFormat"
], function(Controller, JSONModel, DateTime, DateFormat) {
	"use strict";

	return Controller.extend("com.create.empEmp_creation.controller.PersonalDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.create.empEmp_creation.view.PersonalDetails
		 */
		onInit: function() {
			var uid = window.sessionStorage.getItem('uid');
			// this.getView().byId("firsname").setValue(uid);

			var oModel = this.getOwnerComponent().getModel("modelProdMain");
			this.getView().setModel(oModel);

			oModel.read("/hs_hr_employee('" + uid + "')", {
				//filters: [oFilteruname],
				success: function(oData, oResponse) {
					console.log(oData);
					var oModel1 = new JSONModel();
					oModel1.setData({
						Details: oData
					});
					this.getView().setModel(oModel1, "PersonalDetails");

				}.bind(this),
				error: function(oErr) {
					console.log(oErr);

				}.bind(this)
			});
	
		},
		formatDate: function(sValue) {
			/* var timeStamp = sValue;
         
			 var start = timeStamp.indexOf('(')+1;

			 var end = timeStamp.lastIndexOf(')');

			 var res = timeStamp.substring(start, end);
			 
			 var date = eval('new ' + timeStamp.replace(/\//g, ''));
			 
			 var sNextDate = date.substring(0, 14);
			 console.log(sNextDate);
			return date;*/
		

		   var value = sValue.substring(6, 18); // maybe it's safer to work with regular expressions

		

			jQuery.sap.require("sap.ui.core.format.DateFormat");

			var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-dd"
			});
           
			//console.log(oDateFormat.format(new Date(Number(value)))); // 2013/08/11
			var date = oDateFormat.format(new Date(Number(value)));
			return date;
				
			
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.create.empEmp_creation.view.PersonalDetails
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.create.empEmp_creation.view.PersonalDetails
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.create.empEmp_creation.view.PersonalDetails
		 */
		//	onExit: function() {
		//
		//	}

	});

});