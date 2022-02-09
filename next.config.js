const withPWA = require('next-pwa')
 
module.exports = withPWA({
    pwa: {
        dest: 'public'
    }
})

module.exports = {
    generateBuildId: async () => {
      // Return custom build ID, like the latest git commit hash
      return 'my-build-id'
    }
  }