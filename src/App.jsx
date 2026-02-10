import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Clients from './components/Clients'
import Services from './components/Services'
import Certificates from './components/Certificates'
import Footer from './components/Footer'

function App() {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Projects />
                <Clients />
                <Services />
                <Certificates />
            </main>
            <Footer />
        </>
    )
} 

export default App
