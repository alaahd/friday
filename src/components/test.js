import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Test extends React.Component {
    constructor() {
        super()
        this.state = {
            name: 'Ryan'
        }
    }

    componentWillMount() {
        console.log('component will mount')
    }

    componentDidMount() {
        console.log('component did mount')
    }

    render() {
        return (
            <h1>This is the test component {this.state.name}</h1>
        )
    }
}


