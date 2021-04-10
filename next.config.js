module.exports = {
    webpack: (cfg) => {
        cfg.module.rules.push(
            {
                test: /\.md$/,
                use: 'raw-loader',
                // loader: 'frontmatter-markdown-loader',
                // options: { mode: ['react-component'] }
            }
        )
        return cfg;
    },
    target: 'serverless',
    images: {
        domains: ['wallpapercave.com', 'stayqrious.com'],
    }
}