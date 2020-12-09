module.exports = {
    mount: {
        public: '/',
        src: '/_dist_',
        lib: '/_dist_'
    },
    plugins: [
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-typescript'
    ]
}
