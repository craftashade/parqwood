module.exports = {
  mode: 'jit',
  purge: [
    "./src/pages/**/*.js",
    "./src/components/**/*.js",
    "./src/templates/**/*.js",
    "./src/static/**/*.js",
    "./src/containers/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#384337",
        secondary: "#E1E0D4",
        bg: "#F2F1E9",
        link: "#FF7B00",
        grey: "#999999"
      }
    },
    fontFamily: {
      'body': ['Overpass'],
    },
  },
  variants: {},
  plugins: []
};
