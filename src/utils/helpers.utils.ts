import jwt from 'jsonwebtoken';

export const generateJWT = (user: any) => {
    return new Promise((resolve, reject) => {
        const payload = { user };
        jwt.sign(payload, process.env.SEED!, {
            expiresIn: process.env.EXPIRATION_TOKEN
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token could not be generated')
            } else {
                resolve(token);
            }
        })
    })
}
