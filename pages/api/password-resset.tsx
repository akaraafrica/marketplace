import React from 'react'
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'




const prisma = new PrismaClient()

export default async function  PasswordReset(req:NextApiRequest,res:NextApiResponse) {
    
    const { password, email} = req.body
    
    if(req.method === 'GET'){
       const user = prisma.user.findFirst({
           where:{
               email
           }
       })
       
       if(!user){
            return res.status(404).send('User does not exist')
       }

    }

}