import mail, { MailDataRequired } from "@sendgrid/mail";

const key = process.env.SENDGRID_API_KEY;
mail.setApiKey(key || "");
const temp = "d-1fbec631dc1248fc9b79e51299b0917f";

export interface DT {
  firstname?: string;
  lastname?: string;
  link?: string;
  subject: string;
  email?: string;
  name?: string;
  resetLink?: string;
  contributorStatus?: string;
  emailComfirmLink?: string;
}

export interface SendMailProps {
  to: string;
  from: string;
  templateId: string;
  dynamicTemplateData: DT;
}

export default async function SendMail({
  to,
  from,
  firstname,
  email,
  templateId,
  link,
  subject,
  title,
  contributor,
  amount,
  author,
  action,
}: any) {
  try {
    if (!to) return "Reciever's email is needed";
    if (!from) return "Senders's email is needed";
    if (!templateId) return " Email template is needed";

    const dynamicTemplateData = {
      email,
      subject,
      link,
      firstname,
      title,
      amount,
      author,
      contributor,
      action,
    };
    await mail.send({ to, from, templateId, dynamicTemplateData, subject });
    return "email sent";
  } catch (error) {
    console.log(error);
  }
}
