import React from 'react';

export default class Panel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            aupdate: 'off'
        }
    }

    autoupdate(e) {
        this.setState({
            aupdate : e.target.value
        });
        this.props.autoupdate(e);
    }

    render() {
        return (
            <div>
                <h2>Auto Update</h2>
                <ul className="autoupdate-switch">
                    <li>
                        <input id="auto_on" checked={this.state.aupdate === 'on'} onChange={this.autoupdate.bind(this)}
                               type="radio" value="on" name="autoupdate"/>
                        <label htmlFor="auto_on"> On</label>
                    </li>
                    <li>
                        <input id="auto_off" checked={this.state.aupdate === 'off'}
                               onChange={this.autoupdate.bind(this)} type="radio" value="off" name="autoupdate"/>
                        <label htmlFor="auto_off"> Off</label>
                    </li>
                </ul>

                <h2>Quick Facts</h2>
                <ul>
                    <li>Highest Mag: <span className="info-value">{this.props.mags.max}</span></li>
                    <li>Lowest Mag: <span className="info-value">{this.props.mags.min}</span></li>

                    <li className="legend green first">
                        <div>
                            <figure></figure>
                            <h4>2.5 or less</h4>
                        </div>
                        <p>Usually not felt, but can be recorded by seismograph.</p>
                    </li>

                    <li className="legend orange">
                        <div>
                            <figure></figure>
                            <h4>2.5 to 5.4</h4>
                        </div>
                        <p>Often felt, but only causes minor damage.</p>
                    </li>

                    <li className="legend red">
                        <div>
                            <figure></figure>
                            <h4>5.5 to 6.0</h4>
                        </div>
                        <p>Slight damage to buildings and other structures.</p>
                    </li>

                    <li className="legend purple">
                        <div>
                            <figure></figure>
                            <h4>6.1 to 6.9</h4>
                        </div>
                        <p>May cause a lot of damage in very populated areas.</p>
                    </li>

                    <li className="legend black">
                        <div>
                            <figure></figure>
                            <h4>7.0 to 8.0</h4>
                        </div>
                        <p>Major earthquake. Serious damage.</p>
                    </li>
                </ul>
            </div>
        )
    }
}
