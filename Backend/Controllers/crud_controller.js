const { default: USER } = require("../Models/userModel")

module.exports = {
    addCustomer : async (req,res) => {
        try {
            const {name,address_line_1,email,phonenumber,pin,country,address_line_2} = req.body

            const userExist =await  USER.findOne({email},{deleted:true})

            if(userExist){
                res.status(400).json({message:"email already exist"})
            }else{
                const userTemplate = new USER({
                    name,
                    email,
                    phonenumber,
                    address_line_1,
                    pin,
                    country,
                    address_line_2
                    
                })
                const userData = await userTemplate.save()
                res.status(200).json({message:"ok"})
            }
        } catch (error) {
            res.status(error.status ? error.status  : 500 ).json(error.message)
        }
    },

    deleteCustomer : async (req,res) => {
        try {
            const {userId} = req.params
            const userExist =await  USER.findOne({_id:userId})
            
            if(!userExist){
                res.status(400).json({message:"user not exist"})
            }else{
                await USER.updateOne({_id:userId},{
                    $set:{
                        deleted:true
                    }
                },{new:true})
                res.status(200).json({message:"ok"})
            }
        } catch (error) {
            res.status(error.status ? error.status  : 500 ).json(error.message)
        }
    },

    updateCustomer : async (req,res) => {
        try {       
            const {name,address_line_1,email,phonenumber,pin,country,address_line_2} = req.body
    
            const userExist = await USER.findOne({_id:req.body._id})

            if(!userExist){
                res.status(400).json({message:"user not exist"})
            }else{
                await USER.updateOne({_id:req.body._id},{
                    $set:{
                        name,
                        email,
                        phonenumber,
                        address_line_1,
                        pin,
                        country,
                        address_line_2
                        
                    }
                })
                res.status(200).json({message:"ok"})
            }

        } catch (error) {
            res.status(error.status ? error.status  : 500 ).json(error.message)
        }
    },

    getCustomer : async (req,res) => {
        try {
            const records = await USER.find({deleted:false})
            res.status(200).json(records)
        } catch (error) {
            res.status(error.status ? error.status  : 500 ).json(error.message)
        }
    }
}