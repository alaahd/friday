import React from 'react';
import Pace from 'react-pace-progress'

import Filters from './components/filters';
import Eqlist from './components/eqlist';
import Panel from './components/panel';
import helpers from './utils/helpers';

import _ from 'lodash';
import 'normalize.css';
import './style/index.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
            eqfeed: [],
            autorefresh: 10,
            isLoading: true
        }
    }

    componentDidMount() {
        this.fetch();
    }

    componentWillUnmount() {
        this.stopAutoRefresh();
    }

    autoUpdate(e) {
        let value = e.target.value;
        if (value === 'on') {
            this.startAutoRefresh();
        } else {
            this.stopAutoRefresh();
        }
    }

    startAutoRefresh() {
        this.interval = setInterval(()=>this.fetch(), this.state.autorefresh * 1000);
    }

    stopAutoRefresh() {
        console.log('Autoupdate Stopped');
        clearInterval(this.interval);
    }

    refresh() {
        this.setState({
            eqfeed: []
        });
        this.fetch();
    }

    orderby(e) {
        let ord = e && e.target.value;

        if (ord === 'all') {
            this.refresh();
            return;
        }

        this.setState({
            eqfeed : _.orderBy(this.state.eqfeed, [function(o) { return o.properties.mag }], [ord])
        });


    }

    getMaxMag() {
        let max = 0;

        if (this.state.eqfeed.length) {
            max = _.maxBy(this.state.eqfeed, o => o.properties.mag).properties.mag;
        }

        return max > 0 ? '+' + max : max ;
    }

    getMinMag() {
        let min = 0;

        if (this.state.eqfeed.length) {
            min = _.minBy(this.state.eqfeed, o => o.properties.mag).properties.mag;
        }

        return min;
    }

    fetch() {
      this.setState({isLoading: true});
      helpers.getEarthQuickData(this.state.url)
        .then(function(jsonData){
            console.info('New fetch for data at: ' + new Date());
            let feed = jsonData.data.features;
            this.setState({
                eqfeed: feed
            });
            this.timeout = setTimeout(()=>{
                this.setState({
                    isLoading: false
                })
            }, 2000);
        }.bind(this))
    }

    render() {
        return (
           <div>

               {this.state.isLoading ? <Pace color="#E91E63"/> : null}

               <header>
                   <h1>Worldwide Earthquake Information (Last 24 Hours)</h1>
               </header>

               <nav>
                   <ul className="view-filter">
                       <li>List View</li>
                       <li>Chart View</li>
                       <li>Map View</li>
                   </ul>
               </nav>

               <section id="filters">
                   <Filters orderby={this.orderby.bind(this)} refresh={this.refresh.bind(this)} />
               </section>

               <section id="main">
                   <aside>
                       <Panel autoupdate={this.autoUpdate.bind(this)} mags={{max: this.getMaxMag(), min: this.getMinMag()}} />
                   </aside>

                   <main>
                       <Eqlist mags={{max: this.getMaxMag()}} eqfeed={this.state.eqfeed} />
                   </main>
               </section>
           </div>
        )
    }
}