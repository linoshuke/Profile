import { useState, useEffect } from 'react'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#projects', label: 'Projects' },
        { href: '#clients', label: 'Klien' },
        { href: '#services', label: 'Layanan' },
        { href: '#about', label: 'About' },
        { href: '#certificates', label: 'Sertifikat' },
    ]

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-200' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <a href="#home" className="text-xl font-bold text-[var(--primary)]">
                    NamaAnda
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="text-[var(--primary)]/70 hover:text-[var(--accent)] transition-colors duration-300 text-sm font-semibold"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    id="mobile-menu-button"
                    className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6 text-[var(--primary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-100 transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
                <div className="container mx-auto px-6 py-4 space-y-4">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            onClick={closeMenu}
                            className="block text-[var(--primary)]/70 hover:text-[var(--accent)] transition-colors py-2 font-medium"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    )
}

export default Header
