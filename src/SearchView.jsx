import React, { Component } from 'react';

class SearchView extends Component {
    state = {
        valueToSearch: '',
    };

    onValueChange = event => {
        const valueToSearch = event.target.value;
        this.setState({ valueToSearch });
        if (!valueToSearch) return;
        setTimeout(() => {
            this.props.getPhotos(valueToSearch);
        }, 200);
    };

    render() {
        const { valueToSearch } = this.state;
        return (
            <div className="input-group">
                <input
                    value={valueToSearch}
                    onChange={this.onValueChange}
                    type="text"
                    className="form-control"
                    placeholder="Search for..."
                />
            </div>
        );
    }
}

export default SearchView;
