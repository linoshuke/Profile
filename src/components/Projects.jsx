import { useScrollReveal } from '../hooks/useScrollReveal'

function Projects() {
    const { ref, isVisible } = useScrollReveal()

    const projects = [
        {
            id: 1,
            title: 'Nama Proyek 1',
            description: 'Deskripsi singkat tentang proyek ini, teknologi yang digunakan, dan tujuannya.',
            image: '/assets/images/project1.jpg',
            link: '#'
        },
        {
            id: 2,
            title: 'Nama Proyek 2',
            description: 'Deskripsi singkat tentang proyek ini, teknologi yang digunakan, dan tujuannya.',
            image: '/assets/images/project2.jpg',
            link: '#'
        }
    ]

    return (
        <section
            id="projects"
            ref={ref}
            className={`py-20 bg-white transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Proyek Saya</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-gray-50 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300"
                        >
                            <img
                                src={project.image}
                                alt={`Gambar ${project.title}`}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <a
                                    href={project.link}
                                    className="text-blue-500 font-semibold hover:underline"
                                >
                                    Lihat Detail &rarr;
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
