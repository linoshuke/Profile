import { useState, useEffect } from 'react'
import { navLinks, brandName } from '../data/nav.data'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            const sections = navLinks.map(link => document.getElementById(link.targetId)).filter(Boolean)
            const scrollPosition = window.scrollY + 100

            for (const section of sections) {
                const sectionTop = section.offsetTop
                const sectionHeight = section.offsetHeight

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(section.id)
                    break
                }
            }
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

    const handleNavClick = (e, targetId) => {
        e.preventDefault()
        const target = document.getElementById(targetId)

        if (target) {
            const headerOffset = 80
            const targetPosition = target.offsetTop - headerOffset

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            })

            closeMenu()
        }
    }

    // Split brand name to color "Sam" differently
    const renderBrandName = () => {
        const name = brandName
        if (name.startsWith('Sam')) {
            return (
                <>
                    <span className="text-purple-500">Sam</span>
                    <span className="text-white">{name.slice(3)}</span>
                </>
            )
        }
        return <span className="text-white">{name}</span>
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Purple top accent line */}
            <div className="h-[3px] bg-purple-600 w-full" />

            <nav
                className={`transition-all duration-300 ${isScrolled
                        ? 'bg-[#0a0a14]/95 backdrop-blur-md'
                        : 'bg-[#0a0a14]'
                    }`}
            >
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Brand / Logo with dotted border */}
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, 'hero')}
                        className="text-xl font-bold border border-dashed border-purple-500/50 px-4 py-2 rounded-sm hover:border-purple-400 transition-all duration-300"
                    >
                        {renderBrandName()}
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Nav links group with dotted border */}
                        <div className="border border-dashed border-purple-500/50 px-6 py-2 rounded-sm flex items-center gap-8">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={`#${link.targetId}`}
                                    onClick={(e) => handleNavClick(e, link.targetId)}
                                    className={`text-sm font-medium tracking-wide transition-all duration-300 ${activeSection === link.targetId
                                            ? 'text-purple-400'
                                            : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Contact Me CTA button */}
                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, 'hero')}
                            className="text-sm font-medium text-purple-400 border-2 border-purple-500 px-5 py-2 rounded-sm hover:bg-purple-500 hover:text-white transition-all duration-300"
                        >
                            Contact Me
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        id="mobile-menu-button"
                        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6 text-white"
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
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`md:hidden bg-[#0a0a14]/95 backdrop-blur-md border-t border-purple-500/20 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="container mx-auto px-6 py-4 space-y-4">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={`#${link.targetId}`}
                            onClick={(e) => handleNavClick(e, link.targetId)}
                            className={`block py-2 font-medium transition-colors duration-300 ${activeSection === link.targetId
                                    ? 'text-purple-400'
                                    : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, 'hero')}
                        className="block py-2 font-medium text-purple-400 border border-purple-500 px-4 rounded-sm text-center hover:bg-purple-500 hover:text-white transition-all duration-300"
                    >
                        Contact Me
                    </a>
                </div>
            </div>

            {/* Purple bottom accent line */}
            <div className="h-[2px] bg-purple-600/60 w-full" />
        </header>
    )
}

export default Header
