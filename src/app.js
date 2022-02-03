const app = require('./app/server.config');

const PORT = app.get('port')

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})