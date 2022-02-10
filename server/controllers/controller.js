var Userdb = require('../models/model')

//create and save new user

exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        return res
        .status(400)
        .send({message:"content can not be empty"})
 
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })
    //save user
    user
    .save(user)
    .then(data=>{
        // res.send(data)
        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "something wrong"
        })
    })
}

//retrive and return all/single users

exports.find = (req,res)=>{
    if(req.query.id)
    {
        const id=req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"wrong"})
            }
            else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:"error"})
        })
    }else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({
                messsage:err.message || "error"
            })
        })
    }

}

//update 

exports.update = (req,res)=>{
    //validate
    if(!req.body){
        res.status(400).send({message:"content can not be empty"})
        return;
    }
    const id =req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res
            .status(404)
            .send({message:`${id} not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error information"})
    })
}

//delete

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}