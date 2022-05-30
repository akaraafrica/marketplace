import React from 'react'
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'




const prisma = new PrismaClient()

export default async function  Login(req:NextApiRequest,res:NextApiResponse) {
    
    const {email, password} = req.body
    if(req.method === 'GET'){
        res.end('Method not allowed')
    }

    if(!email && !req.body.password) res.end('You need login details to login')
    if(!email) res.end('Please provide email address to login')
    if(!req.body.password) res.end('Please provide password to login')
    

    
    const myUser = await prisma.user.findFirst({
        where:{
            email: req.body.email,
            
        }
     })

    
     const secret = process.env.JWT_KEY
    
    
    try {
     
   if(email){
       if(await bcrypt.compare(password, myUser?.password)){
        const token = jwt.sign({email}, secret , { expiresIn: '2d'} )
     res.json({message: 'Logged In'})
       } else {
           return res.send('Invalid password, try again')
       }
   }
   
    } catch (error) {
        res.send(` ${error} `)
    }
    
    
}