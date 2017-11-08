var galleryPage = require('../../pages/gallery.page');
var expect = require('chai').expect;

describe('React Gallery Scenarios', () => {
    before(() => {
        galleryPage.open();
    });

    it('should render an inner image', () => {
        expect(galleryPage.getInnerImage()).to.be.true;
    });

    it('should render the thumbnail images', () => {
        expect(galleryPage.getThumbnailImages()).to.equal(6);
    });

    it('should search dogs images using the search bar', () => {
        galleryPage.setSearchValue('dogs');
        expect(galleryPage.getSearchValue()).to.equal('dogs');
        expect(galleryPage.getInnerImage()).to.be.true;
    });

    it('should change image when left arrow is pressed', () => {
        galleryPage.clickLeftArrow();
        expect(galleryPage.getActiveThumbnail()).to.be.true;
    });
});
