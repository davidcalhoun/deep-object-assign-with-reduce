import babel from "rollup-plugin-babel";

const outputName = "deep-object-assign";

export default {
  input: "index.js",
  output: [
    {
      file: `dist/${outputName}.umd.js`,
      name: outputName,
      format: "umd"
    },
    {
      file: `dist/${outputName}.esm.js`,
      format: "esm"
    }
  ],
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ]
};
