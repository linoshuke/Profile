import { useState } from 'react'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" className="text-2xl font-bold text-gray-900">NamaAnda-.</a>
                <div className="hidden md:flex space-x-6">
                    <a href="#home" className="text-gray-600 hover:text-blue-500 transition duration-300">Home</a>
                    <a href="#about" className="text-gray-600 hover:text-blue-500 transition duration-300">Tentang</a>
                    <a href="#projects" className="text-gray-600 hover:text-blue-500 transition duration-300">Proyek</a>
                    <a href="#contact" className="text-gray-600 hover:text-blue-500 transition duration-300">Kontak</a>
                </div>
                {/* Tombol Hamburger untuk Mobile */}
                <button
                    id="mobile-menu-button"
                    className="md:hidden"
                    onClick={toggleMenu}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </nav>
            {/* Menu Mobile */}
            <div
                id="mobile-menu"
                className={`${isMenuOpen ? '' : 'hidden'} md:hidden px-6 pt-2 pb-4 space-y-2`}
            >
                <a href="#home" onClick={closeMenu} className="block text-gray-600 hover:text-blue-500">Home</a>
                <a href="#about" onClick={closeMenu} className="block text-gray-600 hover:text-blue-500">Tentang</a>
                <a href="#projects" onClick={closeMenu} className="block text-gray-600 hover:text-blue-500">Proyek</a>
                <a href="#contact" onClick={closeMenu} className="block text-gray-600 hover:text-blue-500">Kontak</a>
            </div>
        </header>
    )
}

export default Header
