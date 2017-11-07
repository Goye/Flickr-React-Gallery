import React, { Component } from 'react';
import style from './App.css';
import * as FlickrAPI from './FlickrAPI';
import SearchView from './SearchView';

class App extends Component {
    componentDidMount() {
        this.getPhotos();
    }

    getPhotos = async valueToSearch => {
        const photos = await FlickrAPI.getPhotosByKeyword(valueToSearch);
        if (!photos) return;
        this.setState({
            photos,
        });
    };

    state = {
        photos: [],
        currentIndexPhoto: 0,
    };

    getMainImage = photos => {
        const { currentIndexPhoto } = this.state;
        let img = null;
        if (photos.length > 0) {
            const image = photos[currentIndexPhoto];
            img = (
                <img
                    src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_b.jpg`}
                    alt={image.title}
                    style={{ height: 680 }}
                />
            );
        }
        return img;
    };

    onRightClick = e => {
        let { currentIndexPhoto, photos } = this.state;
        e.preventDefault();
        if (currentIndexPhoto < photos.length - 1) {
            this.setState({
                currentIndexPhoto: currentIndexPhoto + 1,
            });
        }
    };

    onLeftClick = e => {
        let { currentIndexPhoto } = this.state;
        e.preventDefault();
        if (currentIndexPhoto > 0) {
            this.setState({
                currentIndexPhoto: currentIndexPhoto - 1,
            });
        }
    };

    onThumbnailClick = key => {
        this.setState({
            currentIndexPhoto: key,
        });
    };

    render() {
        const { photos, currentIndexPhoto } = this.state;
        return (
            <div className={style.app}>
                <div className={style.searchInput}>
                    <SearchView getPhotos={this.getPhotos} />
                </div>
                <div className={style.carousel}>
                    <div className={style.carouselInner} role="listbox">
                        {this.getMainImage(photos)}
                    </div>
                    <a
                        className={`${style.left} ${style.carouselControl}`}
                        onClick={this.onLeftClick}>
                        <span className="glyphicon glyphicon-chevron-left" />
                    </a>
                    <a
                        className={`${style.right} ${style.carouselControl}`}
                        onClick={this.onRightClick}>
                        <span className="glyphicon glyphicon-chevron-right" />
                    </a>
                </div>
                <div className={`${style.footer} row`}>
                    {photos.map((photo, key) => (
                        <div className="col-xs-6 col-md-2" key={photo.id}>
                            <a
                                className={`${currentIndexPhoto === key
                                    ? style.active
                                    : ''} thumbnail`}
                                onClick={() => this.onThumbnailClick(key)}>
                                <img
                                    src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                                    alt={photo.title}
                                    style={{ height: 180, width: '100%', display: 'block' }}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
