import { useScrollReveal } from '../hooks/useScrollReveal'

function About() {
    const { ref, isVisible } = useScrollReveal()

    const skills = ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Firebase', 'React']

    return (
        <section
            id="about"
            ref={ref}
            className={`py-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Tentang Saya</h2>
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-2/3">
                        <h3 className="text-2xl font-semibold mb-4">Latar Belakang</h3>
                        <p className="text-gray-600 mb-6">
                            Deskripsikan latar belakang pendidikan, profesional, dan minat Anda di sini.
                            Jelaskan perjalanan Anda menjadi seorang developer.
                        </p>
                        <h3 className="text-2xl font-semibold mb-4">Keahlian (Skills)</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm"
                                >
                                    {skill}
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
