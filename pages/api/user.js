import prisma from '../../utils/lib/prisma'

export default async function  profile(req,res) {
    if(req.method === 'GET'){
        try {
            const result = await prisma.user.findMany()
            res.status(200).json(result)
        } catch (error) {
            console.log('Eror:', error)
        }
    }
    if(req.method === 'POST'){
        try {
            const data = await prisma.user.create({
               data:{
                   address: req.body.address,
                   email: req.body.email,
                   password: req.body.password,
                   profileId: req.body.profileId,

                   
                   
                   profile:{
                       create:{
                           name:req.body.name,
                           avatar: req.body.avatar,
                           dob: req.body.dob,
                           

                       }
                   }
               }
                   
            })
          res.status(200).json(data)
        console.log(data);
        } catch (error) {
            console.log(error)
            res.json({

                error:"There was an error"
            })
            
        }
    }
}

// await prisma.user.create({
//     firstName: “Alice”,
//     email: “alice@prisma.io”
//   })