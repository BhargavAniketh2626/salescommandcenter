sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/ViewSettingsDialog",
    "sap/m/ViewSettingsItem"
], function (
    Controller,
    Fragment,
    Filter,
    FilterOperator,
    Sorter,
    ViewSettingsDialog,
    ViewSettingsItem
) {
    "use strict";

    return Controller.extend(
        "com.sales.commandcenter.intelligentsalescommandcenter.controller.Main",
        {

        onInit: function () {

            this._configureCharts();

        },

        /*
        -----------------------------
        Configure Chart Properties
        -----------------------------
        */
        _configureCharts: function () {

            var oSalesChart = this.byId("salesChart");
            var oMarginChart = this.byId("marginChart");

            if (oSalesChart) {

                oSalesChart.setVizProperties({
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

            }

            if (oMarginChart) {

                oMarginChart.setVizProperties({
                    title: {
                        visible: true,
                        text: "Project Margin by Period"
                    }
                });

            }

        },

        /*
        -----------------------------
        Search Orders
        -----------------------------
        */
        onSearchOrders: function (oEvent) {

            var sQuery = oEvent.getSource().getValue();
            var oTable = this.byId("ordersTable");
            var oBinding = oTable.getBinding("items");

            if (!sQuery) {
                oBinding.filter([]);
                return;
            }

            var oFilter = new Filter({
                filters: [
                    new Filter("CustomerID", FilterOperator.Contains, sQuery),
                    new Filter("OrderID", FilterOperator.EQ, sQuery)
                ],
                and: false
            });

            oBinding.filter(oFilter);

        },

        /*
        -----------------------------
        Sort Orders
        -----------------------------
        */
        onSortOrders: function () {

            var that = this;

            if (!this._sortDialog) {

                this._sortDialog = new ViewSettingsDialog({

                    sortItems: [

                        new ViewSettingsItem({
                            text: "Order ID",
                            key: "OrderID"
                        }),

                        new ViewSettingsItem({
                            text: "Customer",
                            key: "CustomerID"
                        }),

                        new ViewSettingsItem({
                            text: "Freight",
                            key: "Freight"
                        })

                    ],

                    confirm: function (oEvent) {

                        var sKey = oEvent.getParameter("sortItem").getKey();
                        var bDesc = oEvent.getParameter("sortDescending");

                        var oSorter = new Sorter(sKey, bDesc);

                        that.byId("ordersTable")
                            .getBinding("items")
                            .sort(oSorter);

                    }

                });

            }

            this._sortDialog.open();

        },

        /*
        -----------------------------
        Filter Orders
        -----------------------------
        */
        onFilterOrders: function () {

            var that = this;

            if (!this._filterDialog) {

                this._filterDialog = new ViewSettingsDialog({

                    filterItems: [

                        new ViewSettingsItem({
                            text: "Freight > 50",
                            key: "HighFreight"
                        }),

                        new ViewSettingsItem({
                            text: "Freight ≤ 50",
                            key: "LowFreight"
                        })

                    ],

                    confirm: function (oEvent) {

                        var aFilters = [];

                        oEvent.getParameter("filterItems")
                            .forEach(function (oItem) {

                                if (oItem.getKey() === "HighFreight") {

                                    aFilters.push(
                                        new Filter(
                                            "Freight",
                                            FilterOperator.GT,
                                            50
                                        )
                                    );

                                }

                                if (oItem.getKey() === "LowFreight") {

                                    aFilters.push(
                                        new Filter(
                                            "Freight",
                                            FilterOperator.LE,
                                            50
                                        )
                                    );

                                }

                            });

                        that.byId("ordersTable")
                            .getBinding("items")
                            .filter(aFilters);

                    }

                });

            }

            this._filterDialog.open();

        },

        /*
        -----------------------------
        Refresh Orders
        -----------------------------
        */
        onRefreshOrders: function () {

            var oModel = this.getOwnerComponent().getModel();
            oModel.refresh(true);

        },

        /*
        -----------------------------
        Chart Click
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
        Close Dialog
        -----------------------------
        */
        onClose: function () {

            if (this._oDialog) {
                this._oDialog.close();
            }

        },

        /*
        -----------------------------
        Full Screen Chart
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