export function Stack() {
    const stack = [
        'Go',
        'Python',
        'GCP',
        'Atlassian Ops',
        'React',
        'Terraform',
        'Kubernetes',
    ]

    return (
        <div className="flex flex-wrap gap-2 mb-12">
            {stack.map((item) => (
                <span
                    key={item}
                    className="px-2 py-1 text-xs rounded-md bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 font-mono tracking-tighter"
                >
                    {item}
                </span>
            ))}
        </div>
    )
}
