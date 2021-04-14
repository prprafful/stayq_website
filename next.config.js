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
        domains: ['wallpapercave.com', 'stayqrious.com'],
    }
}