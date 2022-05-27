import React from 'react'
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'


const prisma = new PrismaClient()

export default async function  Login(req:NextApiRequest,res:NextApiResponse) {
    const email = req.body.email
    
    // res.send('The Login Route')
}