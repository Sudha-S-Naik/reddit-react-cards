// postcss.config.js
module.exports = {
  plugins: [
    // use the new standalone Tailwind PostCSS plugin
    require('@tailwindcss/postcss'),
    // then autoprefixer as usual
    require('autoprefixer'),
  ],
};
