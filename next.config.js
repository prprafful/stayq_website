module.exports = {
    webpack: (cfg) => {
        cfg.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
            // loader: 'frontmatter-markdown-loader',
            // options: { mode: ['react-component'] }
        });
        cfg.module.rules.push({
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ["@svgr/webpack"]
        });
        cfg.module.rules.push(
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                issuer: {
                    test: /\.(js|ts)x?$/,
                },
            }
        )
        return cfg;
    },
    target: 'serverless',
    images: {
        domains: ['stayqrious.com', 'res.cloudinary.com'],
        deviceSizes: [640, 750, 828, 1080, 1200],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // loader: 'cloudinary',
        // path: ''
    }
}