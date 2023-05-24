const AuthRout = require("./user_rout");

const mountRoutes = (app) => {
    app.use('/api/v1/auth', AuthRout)
};

module.exports = mountRoutes;
