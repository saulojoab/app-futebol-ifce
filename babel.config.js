const presets = ["module:metro-react-native-babel-preset"];
const plugins = [];

plugins.push(
  [
    "module-resolver",
    {
      root: ["./"],
      extensions: [
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        ".android.js",
        ".android.tsx",
        ".ios.js",
        ".ios.tsx",
      ],
    },
  ],
  "react-native-reanimated/plugin"
);

module.exports = {
  presets,
  plugins,
};
