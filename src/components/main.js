import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import Eqchart from './chart'
import Eqmap from './map'

import 'normalize.css';
import '../style/index.css';


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
    <div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/chart' component={Eqchart} />
            <Route exact path='/map' component={Eqmap} />
        </Switch>
    </div>
)

export default Main
