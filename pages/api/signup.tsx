import React from 'react'
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'


const prisma = new PrismaClient()

export default async function Signup(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET' || req.method === 'PATCH' || req.method === 'UPDATE') {
        res.send({
            message: 'Method not allowed'
        })
    }
    const check = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })
    if (check) {
        res.send({
            message: 'User already exist'
        })
    } else {
        const createUser = await prisma.user.create({
            data: {

                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                createdAt: req.body.createdAt
            }
        })
        res.status(200).json({
            message: 'Saved'
        })
    }
}

