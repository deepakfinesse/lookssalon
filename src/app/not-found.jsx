import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-7xl md:text-9xl font-bold text-white">
        404
      </h1>

      <h2 className="text-3xl md:text-4xl font-semibold text-white mt-6">
        Page Not Found
      </h2>

      <p className="text-lg md:text-xl text-white mt-4 max-w-xl">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 px-8 py-3 border border-primary text-primary text-lg font-semibold rounded-full hover:bg-primary hover:text-black transition-all duration-300"
      >
        Return Home
      </Link>

    </div>
  );
}
