import Ts from "rollup-plugin-typescript2";

export default {
  input: [
    "src/index.ts",
    // Atoms
    "src/atoms/Button/index.ts",
    "src/atoms/Dot/index.ts",
    "src/atoms/Text/index.ts",
    "src/atoms/Box/index.ts",
    // Molecules
    "src/molecules/Select/index.ts",
    // Organisms
  ],
  output: {
    dir: "lib",
    format: "esm",
    sourcemap: true,
    preserveModules: true,
  },
  plugins: [Ts()],
  external: ["react", "@winoo/foundation"],
};
