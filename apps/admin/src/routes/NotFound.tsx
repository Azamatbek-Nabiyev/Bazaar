import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-6xl font-bold text-neutral-900">404</p>
      <p className="text-neutral-500">Sahifa topilmadi</p>
      <Link
        to="/"
        className="text-sm font-semibold text-white px-6 py-3"
        style={{ backgroundColor: "#d94f2b" }}
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}