import { useScrollReveal } from '../hooks/useScrollReveal'

function Projects() {
    const { ref, isVisible } = useScrollReveal()

    const projects = [
        {
            id: 1,
            title: 'SPMB Online',
            description: 'Sistem Penerimaan Murid Baru berbasis web dengan fitur pendaftaran online, verifikasi dokumen, dan pengumuman otomatis.',
            tech: ['Laravel', 'React', 'MySQL'],
            image: '/images/project1.jpg',
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: 2,
            title: 'E-Learning Platform',
            description: 'Platform pembelajaran online dengan fitur video conference, quiz interaktif, dan tracking progress siswa.',
            tech: ['React', 'Firebase', 'Node.js'],
            image: '/images/project2.jpg',
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: 3,
            title: 'Sistem Inventory',
            description: 'Aplikasi manajemen inventory dengan barcode scanner, laporan stok real-time, dan notifikasi otomatis.',
            tech: ['PHP', 'MySQL', 'JavaScript'],
            image: '/images/project3.jpg',
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: 4,
            title: 'Company Profile',
            description: 'Website company profile modern dengan animasi premium, CMS untuk update konten, dan SEO optimized.',
            tech: ['React', 'Tailwind', 'Firebase'],
            image: '/images/project4.jpg',
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: 5,
            title: 'POS System',
            description: 'Point of Sale system dengan fitur kasir, manajemen produk, laporan penjualan, dan multi-cabang.',
            tech: ['Laravel', 'Vue.js', 'PostgreSQL'],
            image: '/images/project5.jpg',
            demoLink: '#',
            githubLink: '#'
        },
        {
            id: 6,
            title: 'Booking System',
            description: 'Sistem reservasi online untuk hotel/restaurant dengan calendar view, payment gateway, dan reminder.',
            tech: ['Next.js', 'Prisma', 'Stripe'],
            image: '/images/project6.jpg',
            demoLink: '#',
            githubLink: '#'
        }
    ]

    return (
        <section
            id="projects"
            ref={ref}
            className={`py-24 bg-white transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-4 text-navy">Projects</h2>
                <div className="w-20 h-1.5 bg-softblue mx-auto mb-4 rounded-full"></div>
                <p className="text-slate-600 text-center max-w-[600px] mx-auto mb-12">
                    Beberapa proyek yang telah saya kerjakan untuk berbagai klien dan institusi
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="glass-card overflow-hidden group border border-slate-100"
                        >
                            {/* Project Image */}
                            <div className="relative h-48 bg-slate-50 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-navy/5 to-softblue/10 flex items-center justify-center">
                                    <span className="text-6xl opacity-30 transform group-hover:scale-110 transition-transform duration-500">💻</span>
                                </div>
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-navy/90 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <a
                                        href={project.demoLink}
                                        className="w-12 h-12 rounded-full bg-softblue text-white flex items-center justify-center hover:scale-110 transition-transform"
                                        title="Live Demo"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                    <a
                                        href={project.githubLink}
                                        className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:scale-110 transition-transform"
                                        title="GitHub"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-navy group-hover:text-softblue transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="text-xs px-3 py-1 rounded-full bg-softblue/10 text-softblue font-medium border border-softblue/10"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
