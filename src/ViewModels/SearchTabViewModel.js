'use strict';

/*global require*/
var defined = require('../../third_party/cesium/Source/Core/defined');
var knockout = require('../../third_party/cesium/Source/ThirdParty/knockout');

var ExplorerTabViewModel = require('./ExplorerTabViewModel');
var inherit = require('../Core/inherit');
var loadView = require('../Core/loadView');

var svgArrowDown = require('../SvgPaths/svgArrowDown');
var svgArrowRight = require('../SvgPaths/svgArrowRight');

var SearchTabViewModel = function(application) {
    ExplorerTabViewModel.call(this);

    this.application = application;

    this.name = 'Search';
    this.searchText = '';
    this.searchProviders = [];

    knockout.track(this, ['name', 'searchText', 'searchProviders']);

    this.svgArrowDown = svgArrowDown;
    this.svgArrowRight = svgArrowRight;

    var searchTextObservable = knockout.getObservable(this, 'searchText');

    searchTextObservable.extend({ rateLimit: 250 });

    searchTextObservable.subscribe(function() {
        this.search();
    }, this);
};

inherit(ExplorerTabViewModel, SearchTabViewModel);

SearchTabViewModel.prototype.show = function(container) {
    loadView(require('fs').readFileSync(__dirname + '/../Views/SearchTab.html', 'utf8'), container, this);
};

SearchTabViewModel.prototype.search = function() {
    for (var i = 0; i < this.searchProviders.length; ++i) {
        this.searchProviders[i].search(this.searchText);
    }
};

SearchTabViewModel.prototype.activateFirstResult = function() {
    for (var i = 0; i < this.searchProviders.length; ++i) {
        var searchProvider = this.searchProviders[i];
        for (var j = 0; j < searchProvider.searchResults.length; ++j) {
            var searchResult = searchProvider.searchResults[j];
            if (defined(searchResult.clickAction)) {
                searchResult.clickAction();
                return;
            }
        }
    }
};

module.exports = SearchTabViewModel;
