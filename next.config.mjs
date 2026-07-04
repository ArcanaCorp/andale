/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    allowedDevOrigins: [
        "192.168.18.10"
    ],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.net",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "fxzddybegaxcjdvjcahn.supabase.co",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;