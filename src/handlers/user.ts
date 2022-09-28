import prisma from "../db";
import { encryptPassword, createJWT, comparePassword } from "../modules/auth";

export async function createUser (req, res){
    console.log(req.body)
    const encryptedPassword = await encryptPassword(req.body.password)
    console.log(encryptedPassword)
const user = await prisma.user.create({
    data: {
        userName: req.body.username,
        password: encryptedPassword

    }
})

const token = createJWT(user)
res.json({token: token})
}

export async function signIn (req, res) {
    console.log(req.body)
    const user = await prisma.user.findUnique({
        where: {
            userName: req.body.username
        }
    })
    const isValid = await comparePassword(req.body.password, user.password)

    if(!isValid){
        res.status(401)
        res.json({message: 'Not really'})
        return
    }

    const token = createJWT(user);
  res.json({ validated: true, token });
}
