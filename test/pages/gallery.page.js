'use strict';
/*global browser*/

function Page() {}

Page.prototype.open = function() {
    browser.url('/');
};

var galleryPage = Object.create(Page.prototype, {
    innerImage: { get: () => browser.element('#carouselInner img') },
    thumbnailContent: { get: () => browser.element('#thumbnail') },
    searchBar: { get: () => browser.element('#search-bar input') },
    leftArrow: { get: () => browser.element('#leftArrow') },

    getInnerImage: {
        value: function(code) {
            browser.pause(500);
            return this.innerImage.isVisible();
        },
    },

    getThumbnailImages: {
        value: function(code) {
            browser.pause(500);
            return this.thumbnailContent.elements('a').value.length;
        },
    },

    setSearchValue: {
        value: function(value) {
            this.searchBar.setValue(value);
        },
    },

    getSearchValue: {
        value: function() {
            return this.searchBar.getValue();
        },
    },

    clickLeftArrow: {
        value: function() {
            browser.leftClick(this.leftArrow.selector);
            browser.pause(800);
        },
    },

    getActiveThumbnail: {
        value: function(code) {
            return this.thumbnailContent.elements('.active').isVisible();
        },
    },
});

module.exports = galleryPage;
