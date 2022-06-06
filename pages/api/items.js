import prisma from '../../utils/lib/prisma'

export default async function  profile(req,res) {
    if(req.method === 'GET'){
        try {
            const result = await prisma.item.findMany()
            res.status(200).json(result)
        } catch (error) {
            console.log('Eror:', error)
        }
    }
    if(req.method === 'POST'){
        try {
            const data = await prisma.item.create({
               data:{
                   owner: req.body.owner,
                   tokenId: req.body.tokenId,
                   description: req.body.description,
                   images: req.body.images,
                   video: req.body.video
                   
                  
               }
                   
            })
          res.status(200).json(data).send('Saved')
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