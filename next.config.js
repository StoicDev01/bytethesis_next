/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    domains : ["bytethesis.one"]
  },

  async rewrites (){
    return [
      {
        source : "/sitemap.xml",
        destination : "/api/sitemap"
      }
    ]
  }
}

module.exports = nextConfig
