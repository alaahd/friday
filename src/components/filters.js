import React from 'react';

export default class Filters extends React.Component {
    render() {
        return (
            <ul className="data-filters">
                <li>
                    Filter By:
                </li>
                <li><span>Time:</span>
                    <select>
                        <option value="">24 hours</option>
                    </select>
                </li>
                <li><span>Location:</span>
                    <select>
                        <option value="">All Locations</option>
                    </select>
                </li>
                <li><span>Magnitude:</span>
                    <select onChange={this.props.orderby}>
                        <option value="all">All</option>
                        <option value="desc">Highest to Lowest</option>
                        <option value="asc">Lowest to Highest</option>
                    </select>
                </li>
                <li>
                    <button onClick={this.props.refresh}>Reload</button>
                </li>
            </ul>
        )
    }
}