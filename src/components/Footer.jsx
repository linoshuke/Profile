function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; {currentYear} [Nama Anda]. Dibuat dengan React dan Tailwind CSS.</p>
            </div>
        </footer>
    )
}

export default Footer
