const express = require("express");
const actionRouter = require("./actions/actionRouter")
const projectRouter = require("./projects/projectRouter")

const server = express();
const port = process.env.PORT || 8080;

server.use(express.json());
server.use('/api/actions',actionRouter)
server.use('/api/projects', projectRouter)

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        errorMessage: "Something went wrong, try again later."
    })
})

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to Charlene's Sprint Challenge!</h2>`)
})

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = server 
