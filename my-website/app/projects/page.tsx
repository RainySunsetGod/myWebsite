const projects = [
    {
        name: "SuperCity",
        desc: "A superhero roguelike game built in the browser.",
        link: "/game",
    },
    {
        name: "Another Project",
        desc: "Another cool app built with Next.js.",
        link: "https://github.com/yourusername/project",
    },
];

export default function ProjectsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-blue-400">Projects</h2>
            <ul className="space-y-4">
                {projects.map((p) => (
                    <li key={p.name} className="p-4 bg-gray-900 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-yellow-400">{p.name}</h3>
                        <p className="text-gray-400 mb-2">{p.desc}</p>
                        <a
                            href={p.link}
                            className="text-blue-400 hover:underline hover:text-blue-300 transition"
                        >
                            View Project →
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
