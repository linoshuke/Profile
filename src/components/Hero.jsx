import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTypewriter } from '../hooks/useTypewriter'
import { heroData, socialLinks } from '../data/hero.data'
import SocialLinks from './SocialLinks'

const Hero = () => {
    const { ref, isVisible } = useScrollReveal()
    const displayText = useTypewriter(heroData.titles)

    return (
        <section
            id="hero"
            ref={ref}
            className={`bg-offwhite py-24 pt-28 min-h-screen flex items-center relative overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in-up">
                        <p className="text-lg md:text-xl text-[#1B263B] mb-2 font-medium">
                            {heroData.greeting}
                        </p>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                            <span className="text-navy">I am </span>
                            <span className="text-softblue hover:text-softblue-dark transition-colors">
                                {heroData.name}
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl font-bold mb-6 h-8">
                            <span className="text-navy opacity-60">I'm a </span>
                            <span className="text-softblue border-r-2 border-softblue pr-1 animate-pulse">
                                {displayText}
                            </span>
                        </p>

                        <div className="w-16 h-1 bg-[#1B263B] mb-6"></div>

                        <p className="text-base md:text-lg text-navy/70 max-w-lg mb-8 leading-relaxed">
                            {heroData.description}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <a href={heroData.cvUrl} className="bg-softblue hover:bg-softblue-dark text-white px-7 py-3.5 rounded-lg font-semibold text-[0.95rem] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(96,165,250,0.3)] inline-flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download CV
                            </a>
                            <a href="#about" className="bg-transparent text-navy px-10 py-3.5 rounded-lg font-semibold text-[0.95rem] transition-all duration-300 border-2 border-navy hover:bg-navy hover:text-white hover:-translate-y-0.5 inline-block no-underline">
                                More
                            </a>
                        </div>

                        <SocialLinks links={socialLinks} />
                    </div>

                    <div className="animate-fade-in-right relative flex justify-center lg:justify-end">
                        <div className="absolute top-10 right-20 animate-floating">
                            <svg className="w-6 h-6 text-[#60A5FA]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                            </svg>
                        </div>
                        <div className="absolute top-1/3 right-10 animate-floating" style={{ animationDelay: '1s' }}>
                            <div className="w-8 h-8 border-2 border-[#60A5FA]/50 rounded-full"></div>
                        </div>

                        <div className="w-80 h-[420px] relative max-lg:w-[260px] max-lg:h-[340px] max-sm:w-[220px] max-sm:h-[290px]">
                            <div className="absolute inset-0 bg-[#1B263B] rounded-tl-[100px] rounded-tr-[100px] rounded-bl-[40px] rounded-br-[40px] transform translate-x-4 translate-y-4"></div>

                            <div className="relative z-10 overflow-hidden rounded-tl-[100px] rounded-tr-[100px] rounded-bl-[40px] rounded-br-[40px]">
                                <img
                                    src={heroData.profileImage}
                                    alt="Profile"
                                    className="w-80 h-auto object-cover profile-image"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1B263B]/30 to-transparent mix-blend-multiply"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
