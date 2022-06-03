import React from 'react'
import prisma from '../../utils/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'


export default async function ForgotPassword(req: NextApiRequest, res: NextApiResponse) {

    const { password } = req.body

    const checkuser = await prisma.user.findFirst({
        where: {
            email: req.body.email,
        }
    })

    try {
        if (checkuser) {
            const secret = process.env.JWT_KEY + checkuser.password


            const payload = {
                email: checkuser.email,
                adress: checkuser.address
            }
            const token = await jwt.sign(payload, secret, { expiresIn: '30m' })
            const link = `localhost:3000/auth/password-reset/${payload.email}/${token}`

            console.log(link)
            res.send('Password reset link has been sent to your email')
        } else {

            return res.send('No such user exist')
        }
    } catch (error) {

    }




}