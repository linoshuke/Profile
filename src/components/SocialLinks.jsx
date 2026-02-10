const SocialLinks = ({ links }) => {
    return (
        <div className="flex items-center gap-4 mt-8">
            <span className="text-[#1B263B] font-medium">Find Me On</span>
            <div className="flex gap-3">
                {links.map((social, index) => (
                    <a
                        key={index}
                        href={social.url}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-softblue text-white transition-all duration-300 hover:bg-navy hover:-translate-y-1 hover:shadow-[0_6px_15px_rgba(27,38,59,0.3)] no-underline"
                        aria-label={social.name}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d={social.icon} />
                        </svg>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default SocialLinks
