import React from 'react'
import {Link} from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header">
            <section className="container">
                <div className="header-content">
                    <h1 className="site-title">MisterEmail</h1>
                    <nav className="nav">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/emails" className="nav-link">Emails</Link>
                        <Link to="/about" className="nav-link">About Us</Link>
                    </nav>
                </div>
            </section>
        </header>
    )
}

