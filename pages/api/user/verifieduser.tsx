import { NextApiRequest, NextApiResponse}  from "next";
import { PrismaClient } from "@prisma/client";

export default async function VerifiedUsers(req:NextApiRequest,res:NextApiResponse){

const prisma = new PrismaClient()

try {
    const vuser = await prisma.user.findFirst({
        where:{
            verified: false
        }
    })
    res.status(200).send(vuser)
} catch (error) {
    console.log(error)
    return res.status(209).send(error)

}

}