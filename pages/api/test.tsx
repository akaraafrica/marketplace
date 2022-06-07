import React from 'react'
import mail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from 'next'
import Sendmail from '../../components/sendgrid/Sendmail';




    const key = process.env.SENDGRID_API_KEY
    mail.setApiKey(key)
    const temp = 'd-1fbec631dc1248fc9b79e51299b0917f'

export default async function Test(req:NextApiRequest, res:NextApiResponse) {

    const data = {
        to: 'kcblack22@gmail.com',
            from: req.body.from,
            templateId: temp,
            dynamicTemplateData: {
                firstname: 'Jake',
                lastname: req.body.lastname,
                subject: 'Can we meet?',
                resetLink: req.body.resetLink,
                emailComfirmLink: req.body.emailComfirmLink,
        }}
    
        await Sendmail( data)
        res.send(`Email sent to ${data.to}`)
   


    
}