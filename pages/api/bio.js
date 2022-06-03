import prisma from '../../utils/lib/prisma'

export default async function  bio(req,res) {
    if(req.method === 'GET'){
        try {
            const result = await prisma.bio.findMany()
            res.status(200).json(result)
        } catch (error) {
            console.log('Eror:', error)
        }
    }
    if(req.method === 'POST'){
        try {
            const data = await prisma.bio.create({

               data:{
                address: req.body.address,
                email: req.body.email,
                password: req.body.password,
                id: req.body.id,
                profileId: req.body.profileId
               }
                    
            })
          res.status(200).json(data).end('Saved')
        } catch (error) {
            console.log(error);
            res.json({
                error:"There was an error"
            })
            
        }
    }
}