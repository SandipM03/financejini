import  arcjet, { tokenBucket } from "@arcjet/next";



const aj=arcjet({
    key: process.env.ARCJET_API_KEY,
    characteristics: ["userId"],
    rules:[
        tokenBucket({
            node:"LIVE",
            refillRate:12,
            interval:3600,
            capacity:12,
        }),
    ],
});
export default aj;
