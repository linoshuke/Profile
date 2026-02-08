import { useScrollReveal } from '../hooks/useScrollReveal'

function Clients() {
    const { ref, isVisible } = useScrollReveal()

    const clients = [
        {
            id: 1,
            name: 'MAN 1 Jombang',
            type: 'Madrasah Aliyah',
            description: 'Sistem SPMB Online dan Website Sekolah',
            year: '2025'
        },
        {
            id: 2,
            name: 'SMK Negeri 1',
            type: 'Sekolah Menengah Kejuruan',
            description: 'E-Learning Platform dan Sistem Akademik',
            year: '2024'
        },
        {
            id: 3,
            name: 'RS Harapan Sehat',
            type: 'Rumah Sakit',
            description: 'Sistem Pendaftaran Pasien Online',
            year: '2024'
        },
        {
            id: 4,
            name: 'CV Maju Bersama',
            type: 'Perusahaan Retail',
            description: 'POS System dan Inventory Management',
            year: '2023'
        },
        {
            id: 5,
            name: 'Koperasi Sejahtera',
            type: 'Koperasi',
            description: 'Sistem Simpan Pinjam Digital',
            year: '2023'
        },
        {
            id: 6,
            name: 'Dinas Pendidikan',
            type: 'Instansi Pemerintah',
            description: 'Dashboard Monitoring Sekolah',
            year: '2023'
        }
    ]

    return (
        <section
            id="clients"
            ref={ref}
            className={`py-24 bg-[var(--bg-light)] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-6">
                <h2 className="section-title text-[var(--primary)]">Klien & Institusi</h2>
                <div className="w-20 h-1.5 bg-[var(--accent)] mx-auto mb-4 rounded-full"></div>
                <p className="section-subtitle text-slate-600">
                    Berbagai lembaga dan institusi yang telah mempercayakan proyek mereka kepada saya
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map((client) => (
                        <div
                            key={client.id}
                            className="glass-card p-6 group border border-slate-100"
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[var(--accent)]/10 transition-all duration-300">
                                    <span className="text-2xl">🏢</span>
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-[var(--primary)] group-hover:text-[var(--accent)] transition-colors">
                                        {client.name}
                                    </h3>
                                    <p className="text-sm text-[var(--accent)] font-medium mb-1">
                                        {client.type}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        {client.description}
                                    </p>
                                    <span className="text-xs text-slate-400 mt-2 inline-block font-medium">
                                        {client.year}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Clients
