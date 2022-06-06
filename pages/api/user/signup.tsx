
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Sendmail from '../../../components/sendgrid/Sendmail';


interface DT {
    email :string,
    password: string
}

const prisma = new PrismaClient()

export default async function  Signup(req:NextApiRequest,res:NextApiResponse) {
    
    const { password,address} = req.body
    const userEmail = await req.body.email


    let link = ''
    // console.log('Welcome:', userEmail )
    const Emaildata = {
        to: userEmail,
        from: 'info@mbizi.org',
        templateId: 'd-1fbec631dc1248fc9b79e51299b0917f',
        dynamicTemplateData: {
            firstname: userEmail,
            resetLink: link
    }}
    const oldUser = await prisma.user.findFirst({
        where:{
            email:userEmail,
        }
    })
    if(req.method === 'POST'){
    if(!userEmail && !password && !address) return res.json({message: 'You need your email, password and address to sign up'})
    if(!userEmail) return res.json({message: 'Please provide email address to sign up'})
    if(!password) return res.json({message: 'Please provide password to sign up'})
    
    
   if(oldUser) {return res.status(409).send('User already exist, please login')}

   const encryptedPassword = await bcrypt.hash(password,10)
   console.log('User emai:', userEmail)
   if(req.method === 'POST'){
    try {
        const secret = process.env.JWT_KEY+Date()
        
        const newUser = await prisma.user.create({
            data:{
             email: userEmail, 
             password: encryptedPassword,
             address
            }
         })
        
        
     
      const token = jwt.sign({ user: newUser }, 'secret', { expiresIn: '2d' })
        link = `localhost:3000/api/user/activate/${userEmail}/${token}`
        console.log("Secret:",token)

        Sendmail(Emaildata)
             return (res.status(200).json({
                 user: newUser,
                 token,
                 message: 'Please check your email to confirm'
              }) )
        } catch (error) {
           return  res.json({
                message: error
            })
        }
  
  
    }


}
if(req.method === 'DELETE'){
    if(userEmail){
        await prisma.user.delete({
            where:{
                email: userEmail
            }
        })
    }
    res.send('User deleted succesfuly')
}
else  {
   return res.send('Method not allowed')
}
}