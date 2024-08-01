const jwt = require("jsonwebtoken");

const z = require("zod");

const userSchema = z.string().email();
const passSchema = z.string().min(8);

function generateToken(email, password){
    const emailRes = userSchema.safeParse(email);
    const passRes = passSchema.safeParse(password);

    if(!emailRes.success || !passRes.success) {
        console.log("Inputs are not correct!");
        return null;
    }
    const token = jwt.sign(email, '$bjdknsl789');
    return token;
    // eyJhbGciOiJIUzI1NiJ9.YWRtaW4.lowjkaeaMV59xP_yBdO_oQ3_vUMTMrfS3PO88l_2Pp8
}

function decodeToken(token){
    const decoded = jwt.decode(token);
    return decoded;
}

function verifyToken(token, pass){
    try{
        const isVerified = jwt.verify(token, pass);
        if(isVerified){
            return true;
        }
    }
    catch(e){

    }
    return false;
}

const token = generateToken("disha@patani.com", "j545165643")
console.log(token);
console.log(decodeToken(token));
console.log(verifyToken(token, '$bjdknsl78'));
