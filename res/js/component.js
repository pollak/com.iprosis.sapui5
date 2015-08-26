//Last Update - Amit Pollak 10.03.2015
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

//Last Update - Amit Pollak 10.03.2015
sap.ui.commons.Slider.extend("com.iprosis.sapui5.Slider", {
	initDesignStudio: function() {
		this.attachChange(function() {
			this.fireDesignStudioPropertiesChanged(["value"]);
			this.fireDesignStudioEvent("onChange");
		});
	},
	renderer: {}
});

//Last Update - Amit Pollak 26.08.2015
sap.designstudio.sdk.Component.subclass("com.iprosis.sapui5.AutoComplete", function() {

	var dataResultSet = null;
	var maxItems = null;
	var maxPopupItems = null;
	var displayKey = null;
	var selectedValue = null;
	var selectedText = null;
	var reload = false;
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
				
				change: (function (oEvent){  
			        var item = oEvent.getParameter("selectedItem");
			        selectedValue = item.getProperty("additionalText");
			        selectedText = item.getProperty("text");
		            that.firePropertiesChanged(["SelectedValue"]);
		            that.firePropertiesChanged(["SelectedText"]);  
			     })  
    			
			});
			
			this.$().html('<div id="' + currentDiv + '" class="sapUiBody"> ');
			
			this.oAuto.placeAt(currentDiv);
			
			this._alive = true;
		}
	};
	
	this.afterUpdate = function() {
		
		if (reload){
			return;
		} else {
			this.insertData();
			reload = true;
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
			//Clear Auto
			if (reload) {
				this.oAuto.setValue("");
				reload = false;
			}
			dataResultSet = value;
			return this;
		};
	};
	
	this.MaxItems = function(value) {
		if(value===undefined) {
			Reload = false;
			return maxItems;
		} else {
			Reload = false;
			maxItems = value;
			return this;
		};
	};
	
	this.MaxPopupItems = function(value) {
		if(value===undefined) {
			Reload = false;
			return maxPopupItems;
		} else {
			Reload = false;
			maxPopupItems = value;
			return this;
		};
	};
	
	this.DisplayKey = function(value) {
		if(value===undefined) {
			Reload = false;
			return displayKey;
		} else {
			Reload = false;
			displayKey = value;
			return this;
		};
	};
	
	this.SelectedValue = function(value) {
		if(value===undefined) {
			return selectedValue;
		} else {
			selectedValue = value;
			return this;
		};
	};
	
	this.SelectedText = function(value) {
		if(value===undefined) {
			return selectedText;
		} else {
			selectedText = value;
			return this;
		};
	};
});