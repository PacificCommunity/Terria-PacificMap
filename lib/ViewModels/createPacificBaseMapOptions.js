"use strict";

/*global require*/
var WebMapServiceCatalogItem = require("terriajs/lib/Models/WebMapServiceCatalogItem");
var BaseMapViewModel = require("terriajs/lib/ViewModels/BaseMapViewModel");

var createPacificBaseMapOptions = function(terria) {
  var result = [];

  var gebco = new WebMapServiceCatalogItem(terria);
  gebco.url = "https://www.gebco.net/data_and_products/gebco_web_services/2019/mapserv";
  gebco.layers = "GEBCO_2019_Grid";
  gebco.opacity = 1.0;
  gebco.isRequiredForRendering = true;
  gebco.name = "GEBCO Bathymetry";
  gebco.allowFeaturePicking = false;

  result.push(
    new BaseMapViewModel({
      image: require("../../wwwroot/images/gebco.png"),
      catalogItem: gebco,
      contrastColor: "#000000"
    })
  );

  return result;
};

module.exports = createPacificBaseMapOptions;