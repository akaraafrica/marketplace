import React from "react";
import mail, { MailDataRequired } from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

const key = process.env.SENDGRID_API_KEY;
mail.setApiKey(key || "");
const temp = "d-1fbec631dc1248fc9b79e51299b0917f";

interface DT {
  firstname?: string;
  lastname?: string;
  to: string;
  from: string;
  templateId: string;
  // dynamicTemplateData:{}
  link: string;
  subject: string;
  email?: string;
  name?: string;
}

export default async function Sendmail({
  to,
  from,
  firstname,
  email,
  templateId,
  link,
  subject,
}: DT) {
  try {
    if (!to) return "Reciever's email is needed";
    if (!from) return "Senders's email is needed";
    if (!templateId) return " Email template is needed";

    const dynamicTemplateData = {
      email,
      subject,
      link,
      firstname,
    };
    await mail.send({ to, from, templateId, dynamicTemplateData, subject });
    return "email sent";
  } catch (error) {
    console.log(error);
  }
}
