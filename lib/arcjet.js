import  arcjet, { tokenBucket } from "@arcjet/next";



const aj=arcjet({
    key: process.env.ARCJET_KEY || "test-key",
    characteristics: ["userId"],
    rules:[
        tokenBucket({
            mode: process.env.NODE_ENV === 'production' ? "LIVE" : "DRY_RUN",
            refillRate:2,
            interval:3600,
            capacity:2,
        }),
    ],
});
export default aj;
