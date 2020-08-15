const express = require("express")
const projects = require("../data/helpers/projectModel")


const router = express.Router();

router.get('/', (req, res) => {
    projects.get()
    .then()
    .catch()
})

router.post('/', (req, res) => {
    projects.insert()
    .then()
    .catch()
})

router.put("/:id")

module.exports = router;