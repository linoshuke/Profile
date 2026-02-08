import { useScrollReveal } from '../hooks/useScrollReveal'

function About() {
    const { ref, isVisible } = useScrollReveal()

    const skills = [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'Laravel', level: 85 },
        { name: 'PHP', level: 80 },
        { name: 'MySQL', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Firebase', level: 75 },
        { name: 'Node.js', level: 70 },
    ]

    return (
        <section
            id="about"
            ref={ref}
            className={`py-24 bg-[var(--bg-light)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-6">
                <h2 className="section-title text-[var(--primary)]">Tentang Saya</h2>
                <div className="w-20 h-1.5 bg-[var(--accent)] mx-auto mb-4 rounded-full"></div>
                <p className="section-subtitle text-slate-600">
                    Mengenal lebih dekat siapa saya dan apa yang saya lakukan
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Profile Image */}
                    <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                        <div className="relative">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-2xl blur-2xl" />
                            {/* Image Placeholder */}
                            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-lg">
                                <div className="text-center">
                                    <span className="text-8xl">👨‍💻</span>
                                    <p className="text-slate-400 text-sm mt-4 font-medium">Foto Profil</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="order-2 lg:order-1">
                        <h3 className="text-2xl font-bold mb-4 text-[var(--primary)]">
                            Hi, Saya <span className="text-[var(--accent)]">Nama Anda</span>
                        </h3>
                        <p className="text-slate-600 mb-4 leading-relaxed">
                            Saya adalah seorang software engineer dengan pengalaman lebih dari 3 tahun dalam
                            mengembangkan solusi software untuk berbagai institusi termasuk sekolah, rumah sakit,
                            koperasi, dan instansi pemerintah.
                        </p>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            Fokus saya adalah menciptakan aplikasi yang tidak hanya fungsional, tetapi juga
                            user-friendly dan scalable. Saya percaya bahwa teknologi yang baik harus bisa
                            menyederhanakan proses dan memberikan nilai nyata bagi penggunanya.
                        </p>

                        {/* Download CV Button */}
                        <a
                            href="/cv.pdf"
                            download
                            className="btn-download inline-flex items-center gap-2 mb-8 bg-[var(--primary)]"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download CV
                        </a>

                        {/* Skills */}
                        <h4 className="text-lg font-semibold mb-4 text-[var(--primary)]">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full bg-white text-[var(--primary)] border border-slate-100 text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-default shadow-sm"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
