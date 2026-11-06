export function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article className="glass-card flex h-full flex-col p-6 md:p-8">
      <div className="mb-8 text-white/70">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-white">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-pink-muted">{body}</p>
    </article>
  );
}
