/** @type {import('next').NextConfig} */

// const removeImports = require("next-remove-imports");


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
    // webpack: function (config) {
    //     config.module.rules.push({
    //         test: /\.md$/,
    //         use: "raw-loader",
    //     });
    //     return config;
    // },
};

module.exports = (nextConfig);
