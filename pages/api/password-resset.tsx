import React from 'react'
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function PasswordResset(req: NextApiRequest, res: NextApiResponse) {
    const { password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        await prisma.user.update({
            where: {
                email: req.body.email
            },
            data: {
                password: hashedPassword
            }
        })
        res.json({
            message: "Updated"
        })
    } catch (error) {
        console.log(error);

        return res.send(error)
    }
}