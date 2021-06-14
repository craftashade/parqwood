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
        cas: "#20215B",
        sunshine: "#F6C35C",
        grey: "#CFD9E1",
        "light-grey": "#EEEEEE",
        airbnb: "#FA565D",
        f6: "#F6F6F6"
      }
    },
    fontFamily: {
      'body': ['Source Sans Pro'],
    },
  },
  variants: {},
  plugins: []
};
