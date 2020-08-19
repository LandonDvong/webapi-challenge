const express = require('express');
const router = express.Router();
const Actions = require('../data/helpers/actionModel');

router.get("/", async (req,res) => {
    try{
        const action = await Actions.get();

        if(action.length){
            res.status(200).json(action)
        }
    }catch(err){

    }
});

router.get("/:id", validateActionId,  (req,res) => {
    Actions.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err.stack)
        res.status(500).json({ error: "Action not found."})
    })
});

router.delete("/:id", validateActionId, (req,res) =>{
    Actions.remove(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err.stack)
        res.status(500).json({ message: "Problem deleting action."})
    })
})

router.put("/:id",validateActionId, async (req,res) => {
    const { id } = req.params;
    const { description, notes } = req.body;
    const action = await Actions.get(id)

    if(!description || !notes){
        return res.status(400).json({ message: "Must provide description and notes for the action."})
    }
    const newAction = Actions.update(id, req.body);
    res.status(200).json(newAction)
});

async function validateActionId(req,res, next){
    const action = await Actions.get(req.params.id);
    if(!action){
        return res.status(404).json({ message:"Error getting actions."})
    }
    req.action = req.params.id;
    next();
}

module.exports = router 