import React from 'react'
import prisma from '../../utils/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


interface DT {
    email :string,
    password: string
}


export default async function  Signup(req:NextApiRequest,res:NextApiResponse) {
    
    const {email, password,address} = req.body
    if(req.method !== 'POST'){
        res.end('Method not allowed')
    }
    if(!email && !password && !address) res.end('You need login details to sign up')
    if(!email) res.end('Please provide email address to sign up')
    if(!password) res.end('Please provide password to sign up')
    
    const oldUser = await prisma.user.findFirst({
        where:{
            email:email,
        }
    })
   if(oldUser) return res.status(409).send('User already exist, please login')

   const encryptedPassword = await bcrypt.hash(password,10)

   try {
    const secret = process.env.JWT_KEY

    const newUser = await prisma.user.create({
       data:{
        email , 
        password: encryptedPassword,
        address
       }
    })
 
 const token = await jwt.sign({user: newUser}, 'secret', {expiresIn: '2d'})
 
    return res.status(200).json({
       user: newUser,
       token
    }) 
   } catch (error) {
       return res.send(`Error signinig up, Error: ${error}`)
   }
}