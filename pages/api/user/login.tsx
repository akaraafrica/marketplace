import React from 'react'
import prisma from '../../../utils/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


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

    if(!myUser) res.end('You have not been signed up. Please signup to login')

    const secret = process.env.JWT_KEY
    
    
    try {
     
        if(email){
            const compare = await bcrypt.compare(password, myUser ? myUser.password : '')
            if(compare){
                const token = jwt.sign({email}, secret || '' , { expiresIn: '2d'} )
            res.json({message: 'Logged In', accessToken: token})
            } else {
                return res.send('Invalid password, try again')
            }
        }
   
    } catch (error) {
        res.send(` ${error} `)
    }
    
    
}