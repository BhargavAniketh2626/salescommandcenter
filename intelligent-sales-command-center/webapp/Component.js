// sap.ui.define([
//     "sap/ui/core/UIComponent",
//     "com/sales/commandcenter/intelligentsalescommandcenter/model/models"
// ], (UIComponent, models) => {
//     "use strict";

//     return UIComponent.extend("com.sales.commandcenter.intelligentsalescommandcenter.Component", {
//         metadata: {
//             manifest: "json",
//             interfaces: [
//                 "sap.ui.core.IAsyncContentCreation"
//             ]
//         },

//         init() {
//             // call the base component's init function
//             UIComponent.prototype.init.apply(this, arguments);

//             // set the device model
//             this.setModel(models.createDeviceModel(), "device");

//             // enable routing
//             this.getRouter().initialize();
//         }
//     });
// });
sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
    "com/sales/commandcenter/intelligentsalescommandcenter/model/models"
], function (UIComponent, Device, JSONModel, models) {
    "use strict";

    return UIComponent.extend("com.sales.commandcenter.intelligentsalescommandcenter.Component", {

        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init: function () {

            // call parent init
            UIComponent.prototype.init.apply(this, arguments);

            // set device model
            this.setModel(models.createDeviceModel(), "device");

            // initialize router
            this.getRouter().initialize();

        }

    });

});