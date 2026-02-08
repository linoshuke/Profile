import { useScrollReveal } from '../hooks/useScrollReveal'

function Certificates() {
    const { ref, isVisible } = useScrollReveal()

    const certificates = [
        {
            id: 1,
            name: 'React Developer Certificate',
            issuer: 'Meta (Coursera)',
            year: '2024',
            icon: '⚛️'
        },
        {
            id: 2,
            name: 'Full Stack Web Development',
            issuer: 'Dicoding Indonesia',
            year: '2024',
            icon: '🌐'
        },
        {
            id: 3,
            name: 'Google Cloud Associate',
            issuer: 'Google',
            year: '2023',
            icon: '☁️'
        },
        {
            id: 4,
            name: 'JavaScript Algorithms',
            issuer: 'freeCodeCamp',
            year: '2023',
            icon: '📜'
        },
        {
            id: 5,
            name: 'UI/UX Design Fundamentals',
            issuer: 'Hacktiv8',
            year: '2023',
            icon: '🎨'
        },
        {
            id: 6,
            name: 'Database Management',
            issuer: 'Oracle Academy',
            year: '2022',
            icon: '🗃️'
        }
    ]

    return (
        <section
            id="certificates"
            ref={ref}
            className={`py-24 bg-white transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-6">
                <h2 className="section-title text-[var(--primary)]">Sertifikat</h2>
                <div className="w-20 h-1.5 bg-[var(--accent)] mx-auto mb-4 rounded-full"></div>
                <p className="section-subtitle text-slate-600">
                    Sertifikasi dan pencapaian yang telah saya raih
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="certificate-badge flex items-center gap-4 group cursor-pointer border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[var(--accent)]/10 transition-all duration-300">
                                <span className="text-2xl">{cert.icon}</span>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="font-bold text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors">
                                    {cert.name}
                                </h3>
                                <p className="text-sm text-slate-500 font-medium">
                                    {cert.issuer}
                                </p>
                                <span className="text-xs text-slate-400 font-medium">
                                    {cert.year}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Certificates
