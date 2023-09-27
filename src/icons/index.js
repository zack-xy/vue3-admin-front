// https://webpack.docschina.org/guides/dependency-management/#requirecontext

import SvgIcon from '@/components/SvgIcon'

const svgRequire = require.context('./svgs', false, /\.svg$/)

svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

export default app => {
  app.component('svg-icon', SvgIcon)
}
