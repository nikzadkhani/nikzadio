export function Stack() {
  const stack = [
    "Go",
    "Python",
    "GCP",
    "Atlassian Ops",
    "React",
    "Terraform",
    "Kubernetes",
  ];

  return (
    <div className="mb-12 flex flex-wrap gap-2" data-name="stack-list">
      {stack.map((item) => (
        <span
          key={item}
          className="rounded-md bg-stone-200 px-2 py-1 font-mono text-xs tracking-tighter text-stone-600 dark:bg-stone-800 dark:text-stone-400"
          data-name="stack-item"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
