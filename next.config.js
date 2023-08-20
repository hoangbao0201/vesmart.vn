/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "res.cloudinary.com",
            "lh3.googleusercontent.com",
            "image.folderstyle.com",
            "down-vn.img.susercontent.com",
        ],
    },
    compiler: {
        styledComponents: true,
    },
};

module.exports = nextConfig;
