module.exports = {
    webpack: (cfg) => {
        cfg.module.rules.push(
            {
                test: /\.md$/,
                use: 'raw-loader',
                // loader: 'frontmatter-markdown-loader',
                // options: { mode: ['react-component'] }
            },
        );
        cfg.module.rules.push(
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"]
            }
        );
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