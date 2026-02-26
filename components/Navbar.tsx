import React, { useState } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
    { href: '#courses', label: 'Курсы' },
    { href: '#features', label: 'Возможности' },
    { href: '#pricing', label: 'Тарифы' },
    { href: '#about', label: 'О нас' },
];

const Navbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="t-navbar">
            <div className="t-nav-inner">
                {/* Logo — left */}
                <Link to="/" className="t-logo">
                    <div className="t-logo-icon">
                        <Code2 size={16} strokeWidth={2.5} />
                    </div>
                    <span className="t-logo-text">Tamasha</span>
                </Link>

                {/* Nav links — absolute center */}
                <nav className="t-nav-links-center">
                    {navLinks.map(l => (
                        <a key={l.href} href={l.href} className="t-nav-link">{l.label}</a>
                    ))}
                </nav>

                {/* Actions — right */}
                <div className="t-nav-actions">
                    <Link to="/login" className="t-btn-sm-ghost">Войти</Link>
                    <Link to="/register" className="t-btn-sm-primary">Начать бесплатно</Link>
                </div>

                <button className="t-hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Меню">
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {mobileOpen && (
                <div className="t-mobile-menu">
                    {navLinks.map(l => (
                        <a key={l.href} href={l.href} className="t-mobile-link" onClick={() => setMobileOpen(false)}>
                            {l.label}
                        </a>
                    ))}
                    <div className="t-mobile-actions">
                        <Link to="/login" className="t-btn-sm-ghost" onClick={() => setMobileOpen(false)}>Войти</Link>
                        <Link to="/register" className="t-btn-sm-primary" onClick={() => setMobileOpen(false)}>Начать бесплатно</Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
