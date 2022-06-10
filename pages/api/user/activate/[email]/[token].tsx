import React from 'react'
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { getMaxListeners } from 'process';
import Sendmail from '../../../../../utils/sendgrid/Sendmail';


interface DT {
    email :string,
    password: string
}

const prisma = new PrismaClient()

export default async function  Emailverification(req:NextApiRequest,res:NextApiResponse) {
    
 const userEmail = req.body.email 
 if(userEmail){
    try {
        await prisma.user.update({
            where: {
                email: userEmail
            },
           data:{
            verified:true
           }
        })
    } catch (error) {
        console.log(error)
    }
 }
 res.send('Email activated')
}

