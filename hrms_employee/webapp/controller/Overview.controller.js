sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/odata/ODataModel',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/m/Button',
	'sap/m/Dialog',
	'sap/m/Text',
	'sap/ui/model/json/JSONModel',
	'com/create/empEmp_creation/js/jquerysession'
	], function(Controller, ODataModel, Filter, FilterOperator, Button, Dialog, Text, JSONModel, jquerysession) {
	"use strict";

	return Controller.extend("com.create.empEmp_creation.controller.Overview", {
		onInit: function() {
		
		var oModel = this.getOwnerComponent().getModel("modelProdMain");
			oModel.setUseBatch(false);
			
		},
		
		hideBusyIndicator : function() {
			sap.ui.core.BusyIndicator.hide();
		},
 
		showBusyIndicator : function (iDuration, iDelay) {
			sap.ui.core.BusyIndicator.show(iDelay);
 
			if (iDuration && iDuration > 0) {
				if (this._sTimeoutId) {
					jQuery.sap.clearDelayedCall(this._sTimeoutId);
					this._sTimeoutId = null;
				}
 
				this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function() {
					this.hideBusyIndicator();
				});
			}
		},
 
		

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onLogin: function(oEvent) {
			this.showBusyIndicator(4000,0);
			var oUserName = this.getView().byId("uname").getValue();
			var oPassword = this.getView().byId("pwd").getValue();
			if (!oPassword || !oUserName) {
				var dialog = new Dialog({
					title: 'Error',
					type: 'Message',
					state: 'Error',
					content: new Text({
						text: 'Please Enter valid ID/Password'
					}),
					beginButton: new Button({
						text: 'OK',
						press: function() {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});

				dialog.open();
			} else {
				var oModel = this.getOwnerComponent().getModel("modelProdMain");
				var oFilteruname = new Filter("user_name", FilterOperator.EQ, oUserName);
				var oFilterupwd = new Filter("user_password", FilterOperator.EQ, oPassword);
				var oAllFilters = new Filter({
					filters: [oFilteruname, oFilterupwd],
					bAnd: true
				});
				oModel.read("/ohrm_user", {
					filters: [oAllFilters],
					success: function(oData, oResponse) {
						if (oData.results.length === 0) {
							var dialog = new Dialog({
								title: 'Error',
								type: 'Message',
								state: 'Error',
								content: new Text({
									text: 'Please Enter valid ID/Password'
								}),
								beginButton: new Button({
									text: 'OK',
									press: function() {
										dialog.close();
									}
								}),
								afterClose: function() {
									dialog.destroy();
								}
							});

							dialog.open();
						} else {
							
							var username=oData.results[0].user_name;
							var id=oData.results[0].emp_number;
						   window.sessionStorage.setItem('uname', username);
						   window.sessionStorage.setItem('uid', id);
						  //alert(window.sessionStorage.getItem('my'));
							this.getView().getModel("TempModel").setProperty("/",{"Id":username});
							
							this.getRouter().navTo("View2",{id: oData.results[0].user_name}, true);
							
						}
					}.bind(this),
					error: function(err) {

					}.bind(this)
				});

			}
		}

	});

});