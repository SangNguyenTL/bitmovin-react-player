const path = require("path");


module.exports = {
  stories: ["../src/**/*.stories.tsx", "../src/**/*.story.tsx"],
  // Add any Storybook addons you want here: https://storybook.js.org/addons/
  addons: [],
  webpackFinal: async (config) => {
    const { alias = {} } = config.resolve;
    Object.assign(alias, {
      '~': path.resolve(__dirname, '../node_modules'),
    });
    config.resolve.alias = alias;

    config.module.rules.push({
      test: /\.s[ac]ss$/,
      use: ["style-loader", "css-loader", {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
          extract: true,
          modules: false,
          plugins: [
            require("postcss-import", { alias }),
            require("postcss-node-sass")(),
            require("postcss-svg")({ dirs: ['./node_modules/bitmovin-player-ui/'] })
          ]
        }
      }, 'sass-loader'],
      include: [path.resolve(__dirname, "../src")]
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]]
      }
    });
    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  }
};