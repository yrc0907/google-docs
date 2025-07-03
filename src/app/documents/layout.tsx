"use client";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
} 