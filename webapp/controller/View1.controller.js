sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.create.empEmp_creation.controller.View1", {

		onInit: function() {
			// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// oRouter.getRoute("second");
			//var sValue = jQuery.sap.getUriParameters().get("myUriParam");
			//console.log(sap.ui.getCore().getModel());
			var oModel = this.getOwnerComponent().getModel("modelProdMain");
			oModel.setUseBatch(false);
		},
		
		
		// _onObjectMatched: function (oEvent) {
		// 	// this.getView().bindElement({
		// 	// 	path: "/" + oEvent.getParameter("arguments").id,
		// 	// 	model: "modelProdMain"
		// 	// });
		// },
		

		onCreate: function(oEvent) {
			var eNum = this.byId("Emp_numb").getValue();
			var eFname = this.byId("firstName").getValue();
			// var eMname = this.byId("middleName").getValue();
			var eLname = this.byId("lastName").getValue();
			// var eMob = this.byId("mobile").getValue();
			// var eStreet1 = this.byId("street1").getValue();
			// var eStreet2 = this.byId("street2").getValue();
			// var eZip = this.byId("zip").getValue();
			// var eCountry = this.byId("country").getValue();

			// var eEmail = this.byId("email").getValue();
			// var eContact = this.byId("contact").getValue();

			var oModel = this.getOwnerComponent().getModel("modelProdMain");
			
			var oEntry = {
							"user_role_id": parseInt(eNum,[10]),
							"user_name" : eLname,
							"user_password" : eFname
							// "emp_middlename" : eMname,
							// "emp_mobile": eMob,
							// "emp_street1": eStreet1,
							// "emp_street2": eStreet2,
							// "emp_zipcode": eZip,
							// "coun_code": eCountry,
							// "emp_oth_email": eEmail,
							// "emp_hm_telephone": eContact
							
							// "EmpDesignation": sCat4,
							// "EmpSalary" : parseInt(sCat5),
							// "EmpStatus" : sCat6
							
						};
						oModel.create("/ohrm_user", oEntry,{
							success:function(oData,oResponse){
								
								
								// this.getOwnerComponent().getModel("modelProdMain").refresh(true);
							}.bind(this),
							error:function(err){
								
								// this.getError(err);
								
							}.bind(this)
				
				
			});

		}

	});
});