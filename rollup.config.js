import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import { readFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))

export default [
  // Main build with all components
  {
    input: 'src/index.js',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named'
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named'
      }
    ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ],
      babelHelpers: 'bundled'
    }),
    postcss({
      config: {
        path: './postcss.config.cjs'
      },
      extract: 'index.css',
      inject: false,
      minimize: true
    }),
    terser()
    ],
    external: ['react', 'react-dom', 'react-i18next', 'lucide-react']
  },
  // Alternative build without Toast (no @mantine/notifications)
  {
    input: 'src/index.no-toast.js',
    output: [
      {
        file: 'dist/index.no-toast.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named'
      },
      {
        file: 'dist/index.no-toast.esm.js',
        format: 'esm',
        sourcemap: true,
        exports: 'named'
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        preferBuiltins: false,
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }]
        ],
        babelHelpers: 'bundled'
      }),
      postcss({
        config: {
          path: './postcss.config.cjs'
        },
        extract: false,
        inject: false,
        minimize: true
      }),
      terser()
    ],
    external: ['react', 'react-dom', 'react-i18next', 'lucide-react', '@mantine/notifications']
  }
]