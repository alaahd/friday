import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <div>
        <header>
            <h1>Worldwide Earthquake Information (Last 24 Hours)</h1>
        </header>
        <nav>
            <ul className='view-filter'>
                <li><Link to="/">List View</Link></li>
                <li><Link to="/chart">Chart View</Link></li>
                <li><Link to="/map">Mao View</Link></li>
            </ul>
        </nav>
    </div>
)

export default Header