const path = require("path");
const { readdirSync } = require("fs");
const useRoute = require('./lib/routes.config')
let crud = [];
let main_routes = [];


const routingMiddleware = (app) => {
  // base routing
  // routing Apis for C.R.U.D. functionality
  readdirSync(path.resolve(__dirname, "db/crud")).forEach((file) => {
    crud.push(file);
  });
  crud.forEach((file, index) => {
    useRoute(file, `../db/crud/${file}`, app);
  });
  // base routing
  // routing Apis for each client-screen
  readdirSync(path.resolve(__dirname, "routes")).forEach((file) => {
    main_routes.push(file);
  });
  main_routes.forEach((file) => {
    // if(!/index/.test(file)){
    //   useRoute(file, `./routes/${file}`);
    // }
    // else{
    //   useRoute(file,`./routes/`)
    // }
    useRoute(file, `../routes/${file}`, app);
  });
};
module.exports = routingMiddleware;
