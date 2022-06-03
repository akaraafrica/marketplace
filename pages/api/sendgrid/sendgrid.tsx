import React from 'react'
import mail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from 'next'


    const key = process.env.SENDGRID_API_KEY
    mail.setApiKey(key)
    const temp = 'd-1fbec631dc1248fc9b79e51299b0917f'

export default async function sendgrid(req:NextApiRequest,res:NextApiResponse) {

    try {
        if(!req.body.to) return res.status(406).send("Reciever's email is needed")
        if(!req.body.from) return res.status(406).send("Senders's email is needed")
        if(!req.body.templateId) return res.status(406).send(" Email template is needed")
        
        await mail.send({
            to: req.body.to,
            from: req.body.from,
            templateId: req.body.templateId,
            dynamicTemplateData: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                subject: req.body.subject,
                resetLink: req.body.resetLink,
                emailComfirmLink: req.body.emailComfirmLink,

            }
        })
          return res.status(200).send('Email sent')
  
       } catch (error) {
           console.log(error)
           return res.send(error)
       }
}