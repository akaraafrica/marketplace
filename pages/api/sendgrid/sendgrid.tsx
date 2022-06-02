import React from 'react'
import mail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from 'next'



interface MailData {
    to: string,
    from: string,
    subject:string,
    template: string,
    description?:string,
    
    }



export async function Sendmail( {
    to,from,subject, template, description
}:MailData) {

    const key: string = process.env.SENDGRID_API_KEY
    mail.setApiKey(key);

    const dynamicData = {
        description:'we re one ',

    }
    
     try {
       mail.send({
        to: to,
        from: from,
        subject: subject,
        templateId: template,
        dynamicTemplateData: {
            description: dynamicData.description
        }
    
        })

      return('Email sent')
     } catch (error) {
         console.log(error)
         return (error)
     }


}



export default async function SendgridTemplate(req:NextApiRequest,res:NextApiResponse) {

const object = {
    to: 'kcblack22@gmail.com',
    from: "info@mbizi.org",
    heading: "Welcome to Akara",
    subject: "Did you get my message",
    template:'98983f81-e1af-11ec-b571-3a1ce2c5c5e7',
    // template: 'd-1fbec631dc1248fc9b79e51299b0917f',
    description: " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius sunt magnam dolores repellat, voluptatibus provident dignissimos et perspiciatis modi iure.",
    dynamicTemplateData: {
        firstname: 'Julliet',
        last_name: 'Odogwu',
        note:'Thank you'
    }
}
try {
    { Sendmail(object ) 
    }
    res.send('Email sent successfully')
} catch (error) {
    console.log(error)
   return res.send(error)
}
}
