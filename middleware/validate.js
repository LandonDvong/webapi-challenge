const projects = require("../data/helpers/projectModel")
const actions = require("../data/helpers/actionModel")


module.exports = {
    validateProjectId,
    validateActionId

};

function validateProjectId() {
    return (req, res, next) => {
        projects.get(req.body.project_id, req.params.id)
        .then(project => {
            if (project) {
                req.project = project
                next()
            } else {
                res.status(404).json({errorMessage: "Project not found"})
            }
        })
        .catch(next)
    }
}

function validateActionId () {
    return(req, res, next) => {
        actions.get(req.body.action_id, req.params.id)
        .then((action) => {
            if (action) {
                req.action = action
                next()
            } else {
                res.status(404).json({errorMessage: "Action not found"})
            }
        })
        .catch(next)

    }
}