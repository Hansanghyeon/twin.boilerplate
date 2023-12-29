import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'
import copy from 'rollup-plugin-copy'

const config = {
  name: 'DesignSystem',
  extensions: ['.ts', '.tsx'],
}

export default {
  input: 'src/index.ts',
  output: [
    {
      // ES Modules: Modern browser imports

      // Browser usage:
      // <script type="module">
      //   import { func } from 'my-lib';
      //   func();
      // </script>

      // js/tsx file usage:
      // import { func } from 'my-lib';
      // func();
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    // Automatically add peerDependencies to the `external` config
    // https://rollupjs.org/guide/en/#external
    peerDepsExternal(),

    // External modules not to include in your bundle (eg: 'lodash', 'moment' etc.)
    // https://rollupjs.org/guide/en/#external
    // external: []

    resolve({ extensions: config.extensions }),

    commonjs(),

    babel({
      extensions: config.extensions,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
    }),


    // d.ts 복사하기
    copy({
      targets: [{ src: 'src/**/*.d.ts', dest: 'dist' }],
      flatten: false, // Preserve directory structure
    }),
  ],
}
