import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


export function comparePassword(password, encryptedPassword){
    return bcrypt.compare(password, encryptedPassword)
}

export function encryptPassword(password){
return bcrypt.hash(password, 5)
}

export function createJWT(user){
const token = jwt.sign({id: user.id, username: user.username }, process.env.JWT_SECRET)
return token
} 

export function protect (req, res, next) {
    const bearer = req.headers.authorization
if (!bearer){
    res.status(401)
    res.json({message: 'Not authorised'})
    return
}

const [, token] = bearer.split(' ')

if (!bearer){
    res.status(401)
    res.json({message: 'Not authorised'})
    return
}
try{
const user = jwt.verify(token, process.env.JWT_SECRET)
req.user = user
next()
} catch (e){
    console.error(e);
    res.status(401);
    res.send("Not authorized");
    return;
}
}