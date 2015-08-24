sap.ui.commons.RangeSlider.extend("com.iprosis.sapui5.RangeSlider", {
	initDesignStudio: function() {
		this.attachChange(function() {
			this.fireDesignStudioPropertiesChanged(["value"]);
			this.fireDesignStudioPropertiesChanged(["value2"]);
			this.fireDesignStudioEvent("onChange");
		});
	},
	renderer: {}
});

sap.ui.commons.Slider.extend("com.iprosis.sapui5.Slider", {
	initDesignStudio: function() {
		this.attachChange(function() {
			this.fireDesignStudioPropertiesChanged(["value"]);
			this.fireDesignStudioEvent("onChange");
		});
	},
	renderer: {}
});


sap.designstudio.sdk.Component.subclass("com.iprosis.sapui5.AutoComplete", function() {

	var dataResultSet = null;
	var maxItems = null;
	var maxPopupItems = null;
	var displayKey = null;
	var selectedValue = null;
	var that = this;
	var Data = null;
	this.oAuto = null;

	this.init = function() {
		
		this.$().click(function() {
			that.fireEvent("onclick");
		});
		
		if (this._alive){
			return;
		} else {
			
			currentDiv = "DIV_" + this.$().attr('id');
			
			//Create a AutoComplete control and fill the items
			this.oAuto = new sap.ui.commons.AutoComplete({
				tooltip: "Enter a name",
				maxPopupItems: 5,
				displaySecondaryValues: true,
				items: {
					path: "/",
					template: new sap.ui.core.ListItem({text: "{text}", additionalText: "{key}"})
				},
				change : function() {  
    			that.firePropertiesChanged(["SelectedValue"]);  
			} 
			});
			
			this.$().html('<div id="' + currentDiv + '" class="sapUiBody"> ');
			
			this.oAuto.placeAt(currentDiv);
			
			this._alive = true;
			

		}
	};
	
	this.afterUpdate = function() {
		
		if (this._notempty){
			return;
		} else {
			this.insertData();
			this._notempty = true;
		}
	};
	
	this.insertData = function() {
		//Initialize a JSON Model
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(dataResultSet.dimensions[0].members);
		oModel.setSizeLimit(maxItems);
		this.oAuto.setMaxPopupItems(maxPopupItems);
		this.oAuto.setDisplaySecondaryValues(displayKey);
		this.oAuto.setModel(oModel);
	};
	
	this.DataResultSet = function(value) {
		if(value===undefined) {
			return dataResultSet;
		} else {
			dataResultSet = value;
			return this;
		};
	};
	
	this.MaxItems = function(value) {
		if(value===undefined) {
			return maxItems;
		} else {
			maxItems = value;
			return this;
		};
	};
	
	this.MaxPopupItems = function(value) {
		if(value===undefined) {
			return maxPopupItems;
		} else {
			maxPopupItems = value;
			return this;
		};
	};
	
	this.DisplayKey = function(value) {
		if(value===undefined) {
			return displayKey;
		} else {
			displayKey = value;
			return this;
		};
	};
	
	this.SelectedValue = function(value) {
		if(value===undefined) {
			return this.oAuto.getValue();
		} else {
			selectedValue = value;
			return this;
		};
	};
});