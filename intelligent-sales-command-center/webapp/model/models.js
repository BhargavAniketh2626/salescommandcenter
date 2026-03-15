// sap.ui.define([
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/Device"
// ], 
// function (JSONModel, Device) {
//     "use strict";

//     return {
//         /**
//          * Provides runtime information for the device the UI5 app is running on as a JSONModel.
//          * @returns {sap.ui.model.json.JSONModel} The device model.
//          */
//         createDeviceModel: function () {
//             var oModel = new JSONModel(Device);
//             oModel.setDefaultBindingMode("OneWay");
//             return oModel;
//         }
//     };

// });
sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
function (JSONModel, Device) {
    "use strict";

    return {

        /*
        Device Model
        Used for responsive UI behavior
        */
        createDeviceModel: function () {

            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");

            return oDeviceModel;

        },

        /*
        Dashboard Model
        Used for KPI tiles and analytics data
        */
        createDashboardModel: function () {

            var oData = {

                KPI: {
                    totalOrders: 0,
                    totalCustomers: 0,
                    totalProducts: 0,
                    totalRevenue: 0
                },

                charts: {
                    sales: [],
                    products: [],
                    customers: []
                }

            };

            return new JSONModel(oData);

        }

    };

});