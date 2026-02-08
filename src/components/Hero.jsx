import { useScrollReveal } from '../hooks/useScrollReveal'

function Hero() {
    const { ref, isVisible } = useScrollReveal()

    return (
        <section
            id="home"
            ref={ref}
            className={`min-h-screen flex items-center bg-white transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                        Halo, Saya [Nama Anda]!
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Seorang Web Developer yang bersemangat dalam menciptakan solusi digital yang fungsional dan menarik.
                    </p>
                    <a
                        href="#projects"
                        className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Lihat Proyek Saya
                    </a>
                </div>
                <div className="md:w-1/3">
                    <img
                        src="/assets/images/profile.jpg"
                        alt="Foto Profil"
                        className="rounded-full shadow-2xl w-64 h-64 mx-auto object-cover"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero
