/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "ysrrjycudvnypbfvfjir.supabase.co" },
    ],
    // Wikimedia rate-limits Next's image-optimizer proxy (no descriptive User-Agent).
    // Serve originals directly — the browser's own request succeeds fine.
    unoptimized: true,
  },
};

export default nextConfig;
