const withImages = require('next-images')

module.exports = withImages({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (dev) {
      // config.module.rules.push({
      //   test: /\.(j|t)sx?$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      // })
    }
    return config
  },
  async rewrites() {
    await fetch(`http://${process.env.API_HOST}`)
      .catch(() => process.exit(1));

    return [
      {
        source: '/admin/:path*',
        destination: `http://${process.env.API_HOST}/admin/:path*`
      },
      {
        source: `/${process.env.API_PATH}/:path*`,
        destination: `http://${process.env.API_HOST}/${process.env.API_PATH}/:path*`
      }
    ];
  },
  env: {
    'API_HOST': process.env.API_HOST,
    'HOST_URL': process.env.HOST_URL,
    'API_PATH': process.env.API_PATH,
  }
})
