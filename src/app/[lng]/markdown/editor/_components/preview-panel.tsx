interface PreviewPanelProps {
  html: string;
}

export function PreviewPanel({ html }: PreviewPanelProps) {
  return (
    <div className="w-1/2 overflow-y-auto px-8 py-6">
      <article
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
