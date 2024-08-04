const { checkAuthenticated } = require("../lib/auth.config.js");

function useRoute(file, url, app) {
  let mod = file.replace(/\.js$/, "");
  let required = require(url);
  if (/scores|settings/.test(mod)) {
    app.use(checkAuthenticated);
  }
  app.use(`/${!/index/g.test(mod) ? mod : ""}`, required);
}

module.exports = useRoute;
