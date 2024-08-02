function useRoute(file, url, app) {
  let mod = file.replace(/\.js$/, "");
  let required = require(url);
  app.use(`/${!/index/g.test(mod) ? mod : ""}`, required);
}

module.exports = useRoute;
  