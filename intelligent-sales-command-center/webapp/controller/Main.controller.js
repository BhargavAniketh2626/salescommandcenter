sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
], function (Controller, Fragment, FlattenedDataset, FeedItem) {
    "use strict";

    return Controller.extend(
        "com.sales.commandcenter.intelligentsalescommandcenter.controller.Main",
        {

        onInit: function () {

            this._initializeRevenueChart();
            this._initializeMarginChart();

        },

        /*
        -----------------------------
        Revenue Chart Initialization
        -----------------------------
        */
        _initializeRevenueChart: function () {

            var oVizFrame = this.byId("salesChart");
            if (!oVizFrame) {
                return;
            }

            var oDataset = new FlattenedDataset({
                data: {
                    path: "/Products"
                },
                dimensions: [{
                    name: "Product",
                    value: "{ProductName}"
                }],
                measures: [{
                    name: "Unit Price",
                    value: "{UnitPrice}"
                }]
            });

            oVizFrame.setDataset(oDataset);

            oVizFrame.addFeed(new FeedItem({
                uid: "valueAxis",
                type: "Measure",
                values: ["Unit Price"]
            }));

            oVizFrame.addFeed(new FeedItem({
                uid: "categoryAxis",
                type: "Dimension",
                values: ["Product"]
            }));

            oVizFrame.setVizProperties({
                title: {
                    visible: true,
                    text: "Project Revenue by Product"
                },
                plotArea: {
                    dataLabel: {
                        visible: true
                    }
                }
            });

        },

        /*
        -----------------------------
        Margin Chart Initialization
        -----------------------------
        */
        _initializeMarginChart: function () {

            var oVizFrame = this.byId("marginChart");
            if (!oVizFrame) {
                return;
            }

            var oDataset = new FlattenedDataset({
                data: {
                    path: "/Orders"
                },
                dimensions: [{
                    name: "Order Date",
                    value: "{OrderDate}"
                }],
                measures: [{
                    name: "Freight",
                    value: "{Freight}"
                }]
            });

            oVizFrame.setDataset(oDataset);

            oVizFrame.addFeed(new FeedItem({
                uid: "valueAxis",
                type: "Measure",
                values: ["Freight"]
            }));

            oVizFrame.addFeed(new FeedItem({
                uid: "categoryAxis",
                type: "Dimension",
                values: ["Order Date"]
            }));

            oVizFrame.setVizProperties({
                title: {
                    visible: true,
                    text: "Project Margin by Period"
                }
            });

        },

        /*
        -----------------------------
        Chart Click Event
        Opens Fragment
        -----------------------------
        */
        onChartClick: function () {

            var that = this;

            if (!this._oDialog) {

                Fragment.load({
                    name: "com.sales.commandcenter.intelligentsalescommandcenter.fragment.ChartDetails",
                    controller: this
                }).then(function (oDialog) {

                    that._oDialog = oDialog;
                    that.getView().addDependent(oDialog);
                    oDialog.open();

                });

            } else {
                this._oDialog.open();
            }

        },

        /*
        -----------------------------
        Close Fragment
        -----------------------------
        */
        onClose: function () {

            if (this._oDialog) {
                this._oDialog.close();
            }

        },

        /*
        -----------------------------
        Full Screen Chart Toggle
        -----------------------------
        */
        onFullScreen: function () {

            var oChart = this.byId("salesChart");

            if (oChart) {
                oChart.setHeight("100%");
                oChart.setWidth("100%");
            }

        }

    });

});