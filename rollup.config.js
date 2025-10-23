import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: [
        { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
        { file: 'dist/index.cjs', format: 'cjs', sourcemap: true }
    ],
    external: [/^react/, /^react-redux/, /^@reduxjs\/toolkit/, /^lodash(\/.*)?$/],
    plugins: [resolve({ extensions: ['.js'] }), commonjs()]
};
