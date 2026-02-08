import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Contact() {
    const { ref, isVisible } = useScrollReveal()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [formMessage, setFormMessage] = useState({ text: '', type: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { name, email, message } = formData

        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            showMessage('Semua kolom wajib diisi!', 'error')
            return
        }

        // Jika validasi berhasil
        showMessage('Pesan Anda berhasil terkirim! Terima kasih.', 'success')
        setFormData({ name: '', email: '', message: '' })
    }

    const showMessage = (text, type) => {
        setFormMessage({ text, type })
        setTimeout(() => {
            setFormMessage({ text: '', type: '' })
        }, 4000)
    }

    return (
        <section
            id="contact"
            ref={ref}
            className={`py-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12">Hubungi Saya</h2>
                <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <form id="contact-form" onSubmit={handleSubmit}>
                        {formMessage.text && (
                            <div
                                className={`mb-4 text-center p-2 rounded-lg ${formMessage.type === 'success'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                {formMessage.text}
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                                Nama
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                                Pesan
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Kirim Pesan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
