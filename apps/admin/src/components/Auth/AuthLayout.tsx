import type { ReactNode } from "react";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-neutral-900 tracking-tight">
            Bazaar
          </span>
          <span className="ml-2 text-xs font-medium text-neutral-400 uppercase tracking-wider align-middle">
            Admin
          </span>
          <h1 className="text-xl font-bold text-neutral-900 mt-4">{title}</h1>
          {subtitle && (
            <p className="text-sm text-neutral-500 mt-2">{subtitle}</p>
          )}
        </div>

        <div className="bg-white border border-neutral-200 p-8 rounded-xl shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
