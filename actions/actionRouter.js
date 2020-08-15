const express = require("express")
const actions = require("../data/helpers/actionModel")
const {validateProjectId, validateActionId} = require("../middleware/validate")


const router = express.Router();

router.get("/", (req, res, next) => {
   return actions
    .get()
    .then((action) => {
        if(action) {
        res.status(200).json(action)
        } else {
            res.status(400).json({errorMessage: "Actions can't be found"})
        }
    })
    .catch(next)
})

router.post("/", validateProjectId(), (req, res, next) => {
   return actions.insert(req.body)
    .then((action) => {
        if (action) {
        res.status(201).json(action)
        } else {
            res.status(400).json({errorMessage: "Need a value for description and notes"})
        }
    })
    .catch(next)
})

router.put("/:id", validateActionId(),(req, res) => {
    actions.update(req.params.id, req.body)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch(next)
})

module.exports = router 