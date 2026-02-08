import { useScrollReveal } from '../hooks/useScrollReveal'

function Services() {
    const { ref, isVisible } = useScrollReveal()

    const services = [
        {
            id: 1,
            icon: '💻',
            title: 'Web Development',
            description: 'Membangun website dan aplikasi web yang responsif, modern, dan SEO-friendly menggunakan teknologi terkini.'
        },
        {
            id: 2,
            icon: '📱',
            title: 'Software Development',
            description: 'Mengembangkan aplikasi scalable menggunakan modern tech stack untuk kebutuhan bisnis yang kompleks.'
        },
        {
            id: 3,
            icon: '🎨',
            title: 'UI/UX Design',
            description: 'Mendesain interface yang menarik dan user experience yang intuitif untuk meningkatkan engagement.'
        },
        {
            id: 4,
            icon: '🔧',
            title: 'Custom Application',
            description: 'Membuat solusi software yang disesuaikan dengan kebutuhan spesifik dan objektif bisnis Anda.'
        },
        {
            id: 5,
            icon: '🐛',
            title: 'Bug Fixing',
            description: 'Mengidentifikasi dan memperbaiki masalah software dengan cepat serta implementasi langkah preventif.'
        },
        {
            id: 6,
            icon: '🚀',
            title: 'Deployment & Maintenance',
            description: 'Deploy aplikasi ke cloud dan maintenance berkelanjutan untuk memastikan performa optimal.'
        }
    ]

    return (
        <section
            id="services"
            ref={ref}
            className={`py-24 bg-white transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-6">
                <h2 className="section-title text-[var(--primary)]">Layanan</h2>
                <div className="w-20 h-1.5 bg-[var(--accent)] mx-auto mb-4 rounded-full"></div>
                <p className="section-subtitle text-slate-600">
                    Solusi terbaik untuk bisnis, brand, institusi, atau organisasi Anda
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="glass-card p-8 text-center group border border-slate-100 hover:bg-white transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="service-icon mx-auto group-hover:scale-110 group-hover:bg-[var(--accent)]/10 transition-all duration-300">
                                <span className="text-2xl">{service.icon}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold mb-3 text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services
