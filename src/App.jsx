import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import { AppHeader } from './cmps/AppHeader';
import { Home } from './pages/Home';
import { EmailIndex } from './pages/EmailIndex';
import { EmailDetails } from './cmps/EmailDetails'; 
import { AboutUs } from './pages/AboutUs'; 

export function App() {
    return (
        <Router>
            <section className='main-app'>
               <AppHeader/>

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
