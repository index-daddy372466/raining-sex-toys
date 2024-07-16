const path = require("path");
const { readdirSync } = require("fs");
let crud = [];
let main_routes = [];

const routingMiddleware = (app) => {
  // route helper fn
  const useRoute = (file, url) => {
    let mod = file.replace(/\.js$/, "");
    let required = require(url);
    app.use(`/${mod}`, required);
  };
  // base routing
  // routing Apis for C.R.U.D. functionality
  readdirSync(path.resolve(__dirname, "db/crud")).forEach((file) => {
    crud.push(file);
  });
  crud.forEach((file, index) => {
    useRoute(file, `./db/crud/${file}`);
  });
  // base routing
  // routing Apis for each client-screen
  readdirSync(path.resolve(__dirname, "routes")).forEach((file) => {
    main_routes.push(file);
  });
  main_routes.forEach((file) => {
    useRoute(file, `./routes/${file}`);
  });
};
module.exports = routingMiddleware;
