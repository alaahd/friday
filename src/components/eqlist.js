import React from 'react';

class Eqlist extends React.Component {

    getMagPct(mag) {
        return Math.floor((mag / 8) * 100);
    }

    getMagLevel(mag) {
        let levels = [
            {level: 'green', color: '#2ecc71', min: -1, max: 2.5},
            {level: 'orange', color: '#f39c12', min: 2.5, max: 5.4},
            {level: 'red', color: '#c0392b', min: 5.4, max: 6},
            {level: 'purble', color: '#9C27B0', min: 6, max: 6.9},
            {level: 'black', color: '#9C27B0', min: 7, max: 8}
        ];

        return levels.filter(item => mag >= item.min && mag < item.max);
    }


    render() {

        var eqItems = this.props.eqfeed.map((item, index) => {

            let magPctStyle = {
                width: parseFloat(item.properties.mag) > 0.05 ? this.getMagPct(item.properties.mag) + '%' : '1%',
                background: this.getMagLevel(item.properties.mag)[0].color
            }

            return (
                <li key={index}>
                    <div><span className="label">Location:</span>{item.properties.place && item.properties.place}</div>
                    <div><span className="label">Mag:</span>{item.properties.mag && item.properties.mag}</div>
                    <div className="mag-holder"><span className="mag-pct" style={magPctStyle}>&nbsp;</span>
                    </div>
                </li>
            )
        });



        return (
            <ul className="eqlist">
                {eqItems}
            </ul>
        )
    }
}

export default Eqlist;

