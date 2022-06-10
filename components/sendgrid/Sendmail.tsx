import React from 'react'
import mail, { MailDataRequired } from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from 'next'


    const key = process.env.SENDGRID_API_KEY
    mail.setApiKey(key || '')
    const temp = 'd-1fbec631dc1248fc9b79e51299b0917f'

interface DT {
    firstname: string,
    lastname: string,
    to:string,
    from:string,
    templateId: string,
    dynamicTemplateData:{} | string

}

export default async function Sendmail(props:any) {
const {to, from,templateId, dynamicTemplateData, firstname, subject,link} = props
    try {
        if(!to) return ("Reciever's email is needed")
        if(!from) return ("Senders's email is needed")
        if(!templateId) return (" Email template is needed")
        

        const Emaildata:MailDataRequired | MailDataRequired[] = {
            to,
            from,
            templateId,
            dynamicTemplateData:{
                firstname,
                subject,
                link
            }
           
        }
        await mail.send(Emaildata)
        return ('email sent')
  
       } catch (error) {
           return (
               console.log(error)
           )
        
       }
}