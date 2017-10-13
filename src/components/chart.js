import React from 'react'
import Pace from 'react-pace-progress'
import Filters from './filters'
import Chart from 'chart.js'
import Panel from './panel'
import Home from './home'
import helpers from '../utils/helpers'

import 'normalize.css'
import '../style/index.css'

export default class Eqchart extends Home {

    fetch() {
        this.setState({
            isLoading: true,
            canvasready: false
        });
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
                this.renderChart()
            }.bind(this))
    }

    refresh() {
        this.fetch();
    }

    renderChart() {

        this.setState({
            canvasready: true
        });

        let ctx = "myChart";
        let mags = this.state.eqfeed.map(item => item.properties.mag)
        let hrs = this.state.eqfeed.map(item => new Date(item.properties.time).getHours())

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: hrs,
                datasets: [{
                    label: 'Last 24 Hours Earthquake',
                    data: mags,
                    fill: false,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Magnitude'
                        }
                    }]
                }
            }
        });
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
                        {this.state.canvasready ? <canvas ref="myChart" id="myChart" width="1000" height="400"></canvas> : null}
                    </main>
                </section>
            </div>
        )
    }
}
