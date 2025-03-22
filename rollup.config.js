import nodeResolve from "@rollup/plugin-node-resolve";
// import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
    treeshake: false,
    plugins: [nodeResolve(), typescript()],
    input: "src/SimpleLangEvaluator.ts",
    output: {
        dir: "dist",
        format: "iife",
        sourcemap: true,
    }
}
