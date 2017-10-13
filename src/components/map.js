import React from 'react'
import Pace from 'react-pace-progress'
import Filters from './filters'
import Chart from 'chart.js'
import Panel from './panel'
import Home from './home'
import helpers from '../utils/helpers'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import 'mapbox-gl/dist/mapbox-gl.css'


export default class Eqmap extends Home {

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
                this.renderMap()
            }.bind(this))
    }

    refresh() {
        this.fetch();
    }

    renderMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhYWhkIiwiYSI6ImNqOHBxa3dsZjBmcnkzM3BjNWFtbHp6MWwifQ.WJHR89kYX2fK0pXMkuuHGA';

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v9'
        });

        map.on('load', function() {
            // Add a new source from our GeoJSON data and set the
            // 'cluster' option to true. GL-JS will add the point_count property to your source data.
            map.addSource("earthquakes", {
                type: "geojson",
                // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
                // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
                data: {features: this.state.eqfeed},
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });

            map.addLayer({
                id: "clusters",
                type: "circle",
                source: "earthquakes",
                filter: ["has", "point_count"],
                paint: {
                    "circle-color": {
                        property: "point_count",
                        type: "interval",
                        stops: [
                            [0, "#51bbd6"],
                            [100, "#f1f075"],
                            [750, "#f28cb1"],
                        ]
                    },
                    "circle-radius": {
                        property: "point_count",
                        type: "interval",
                        stops: [
                            [0, 20],
                            [100, 30],
                            [750, 40]
                        ]
                    }
                }
            });

            map.addLayer({
                id: "cluster-count",
                type: "symbol",
                source: "earthquakes",
                filter: ["has", "point_count"],
                layout: {
                    "text-field": "{point_count_abbreviated}",
                    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                    "text-size": 12
                }
            });

            map.addLayer({
                id: "unclustered-point",
                type: "circle",
                source: "earthquakes",
                filter: ["!has", "point_count"],
                paint: {
                    "circle-color": "#11b4da",
                    "circle-radius": 4,
                    "circle-stroke-width": 1,
                    "circle-stroke-color": "#fff"
                }
            });
        }.bind(this));
    }

    render() {
        return (
            <div>

                {this.state.isLoading ? <Pace color="#E91E63"/> : null}

                <section id="filters">
                    <Filters orderby={this.orderby.bind(this)} refresh={this.refresh.bind(this)} />
                </section>

                <section id="main">
                    <aside>
                        <Panel autoupdate={this.autoUpdate.bind(this)} mags={{max: this.getMaxMag(), min: this.getMinMag()}} />
                    </aside>

                    <main>
                        <div id='map'></div>
                    </main>
                </section>
            </div>
        )
    }
}
