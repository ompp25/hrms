sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.create.empEmp_creation.controller.Master", {

		onItemPress: function(oEvent){
			alert(oEvent);
		}

	});

});