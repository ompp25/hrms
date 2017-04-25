sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
	"use strict";

	return Controller.extend("com.create.empEmp_creation.controller.MainView", {

	       _data : {
			"dtValue" : new Date()
//			"dtValue" : "08:15:32"
		},
			onInit: function() {
			var oModel = new JSONModel(this._data);
			this.getView().setModel(oModel);	
		   
			var uname= window.sessionStorage.getItem('uname');
			this.getView().byId("bt3").setText("Welcome Mr."+uname);
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
			onAccept: function(oEvent) {
					this.showBusyIndicator(4000,0);
					this.getRouter().navTo("View3");
			},
			onPressAdmin: function(oEvent){
				this.getRouter().navTo("oapp");
			}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.create.empEmp_creation.view.MainView
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.create.empEmp_creation.view.MainView
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.create.empEmp_creation.view.MainView
		 */
		//	onExit: function() {
		//
		//	}

	});

});