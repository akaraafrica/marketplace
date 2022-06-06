import React from 'react'
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import Sendmail from '../../../components/sendgrid/Sendmail';


const prisma = new PrismaClient()

export default async function ForgotPassword(req: NextApiRequest, res: NextApiResponse) {

    const { password } = req.body
    const userEmail = req.body.email
    const checkuser = await prisma.user.findFirst({
        where: {
            email: userEmail,
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




            const emailData ={
                to: userEmail,
                from: 'info@mbizi.org',
                templateId: 'd-1fbec631dc1248fc9b79e51299b0917f',
                dynamicTemplateData: {
                    firstname: userEmail,
                    resetLink: link
            }}

            console.log(link)
            Sendmail(emailData)
            res.send('Password reset link has been sent to your email')
        } else {

            return res.send('No such user exist')
        }
    } catch (error) {

    }




}