import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { EmailIndex } from './pages/EmailIndex';
import { EmailDetails } from './cmps/EmailDetails'; 
import { AboutUs } from './pages/AboutUs'; 

export function App() {
    return (
        <Router>
            <section className='main-app'>
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

                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/emails" element={<EmailIndex />} />
                        <Route path="/email/:mailId" element={<EmailDetails />} />
                        <Route path="/about" element={<AboutUs />} />
                    </Routes>
                </main>

                <footer>
                    <section className="container">
                    &copy; Nitzan Paz
                    </section>
                </footer>
            </section>
        </Router>
    );
}
