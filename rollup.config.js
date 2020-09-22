import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import base64 from 'postcss-base64';
import postSvg from 'postcss-svg';
import inlineSvg from 'postcss-inline-svg';
import sass from 'postcss-node-sass';
import svgo from 'postcss-svgo';
import pkg from './package.json'

export default {
    input: 'src/index.tsx',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            strict: false
        },
    ],
    plugins: [
        typescript({ useTsconfigDeclarationDir: true }),
        postcss({
            extract: true,
            modules: false,
            plugins: [
                sass(),
                postSvg({ dirs: ['./node_modules/bitmovin-player-ui/'] }),
                base64(),
                inlineSvg(),
                svgo(),
            ]
        }),
    ],
    external: ['react', 'react-dom']
}