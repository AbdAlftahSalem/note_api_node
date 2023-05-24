const AuthRout = require("../routs/auth_rout");
const NoteRout = require("../routs/note_rout");

const mountRoutes = (app) => {
    app.use('/api/v1/auth', AuthRout)
    app.use('/api/v1/note', NoteRout)
};

module.exports = mountRoutes;
