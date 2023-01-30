const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../model/user.model');
const Counter = require('../../model/counter.model')
const { tokenKey, user_email, user_password, port } = require('../../config')
const mongo = require('../../lib/mongoose.manger');
const nodemailer = require('nodemailer');
const randomString = require('randomstring');

mongo.connectDb();



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'simran19961303@gmail.com',
        pass: 'pgarriashbpgelvg'
    }
});

const userRegister = async (userFirstName, userLastName, userEmail, userPassword, userConfirmPassword, userBio, userPhoto) => {
    try {

        const hashedPassword = await bcrypt.hash(userPassword, 10);
        userPassword = hashedPassword;
        const hashedConfirmPassword = await bcrypt.hash(userConfirmPassword, 10);
        userConfirmPassword = hashedConfirmPassword;
        const userData = await User.create({ userFirstName, userLastName, userEmail, userPassword, userConfirmPassword, userBio, userPhoto });

        return userData;
    }
    catch (err) {
        let reason, result;
        const e = err.message
        const toLook = e.includes(userEmail);

        if (toLook) {
            reason = 'Email already exists';
        }

        const sequence = await Counter.find({ id: "userId" }, { seq: 1 }).lean();
        const getSequence = await User.find().sort({ userId: -1 }).limit(1).lean();

        const value = sequence[0].seq - 1;
        if (sequence[0].seq > getSequence[0].userId) {

            result = await Counter.updateMany(
                { id: "userId" },
                {
                    $set: {
                        seq: value
                    }
                })
        }

        return reason
    }
}



const userLogin = async (userEmail, userPassword) => {
    try {
        const findUser = await User.findOne({ userEmail });

        if (!findUser) {
            return {
                message: "Could not find user with provided email",
                status: 400,
                res: findUser
            };
        }
        const passwordMatch = await bcrypt.compare(userPassword, findUser.userPassword);
        if (!passwordMatch) {
            return {
                message: "Could not find user with provided password",
                status: 400
            };
        }

        const token = jwt.sign(
            {
                userId: findUser.userId, email: findUser.userEmail
            }, tokenKey);

        return { auth: token, response: true };
    }
    catch (err) {
        console.log(err)
    }
}


const getUser = async (userEmail) => {
    try {
        const userData = await User.findOne({ userEmail })
        return userData;
    }
    catch (err) {
        return err
    }
}

const userUpdate = async (userEmail, userFirstName,userLastName, userPassword, userBio) => {

    const userFind = await User.findOne({ userEmail });
    if (userPassword) {
        const hashpass = await bcrypt.hash(password, 10);
        userPassword = hashpass;
    }
    else {
        userPassword = userFind.userPassword
    }
    if (!userFirstName) {
        userFirstName = userFind.userFirstName
    }
    if (!userLastName) {
        userLastName = userFind.userLastName;
    }
    if (!userPassword) {
        userPassword = userFind.userPassword;
    }
    if (!userBio) {
        userBio = userFind.userBio
    }
    // if(!userPhoto){
    //     userPhoto= userFind.userPhoto;
    // }
    console.log(userLastName)
    const update = await User.updateOne({ userEmail }, { $set: { userFirstName,userLastName, userPassword, userBio, } })
    const user = await User.findOne({ userEmail });
    return user

}


const passwordReset = async (userEmail) => {
    try {
        const findUser = await User.findOne({ userEmail });

        if (!findUser) {
            return ({
                message: "Could not find user with provided email",
                status: 400,
                res: findUser
            })
        };

        const randomStringVal = randomString.generate();
      
        const data = await User.updateOne({ userEmail }, { $set: { token: randomStringVal } });
        const mail = await transporter.sendMail({
            to: userEmail,
            from: user_email,
            subject: 'Password reset',
            html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="http://localhost:${port}/auth/reset/${randomStringVal}">link</a> to set a new password.</p>  `
        });
        //  console.log(mail)
        return { message:'Mail is send'}
    }
    catch (err) {
        console.log(err)
    }

}

const getNewPassword = async (token) => {
    try {
        const tokenData = await User.findOne({ token });
        if (!tokenData) {
            return ({
                message: "Could not find user with provided email",
                status: 400,
            })
        }
        //console.log('...',tokenData);
        return tokenData

    }
    catch (err) {
        console.log(err)
    }
}

const newPassword = async (userId, userPassword) => {
    try {
        const tokenData = await User.findOne({ userId });
        if (!tokenData) {
            return ({
                message: "Could not find user with provided email",
                status: 400,
            })
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);
        userPassword = hashedPassword;

        const updatedate = await User.updateOne({ userEmail: tokenData.userEmail }, {
            $set: {
                userPassword: userPassword,
                token: ''
            }
        });

        return updatedate

    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    userRegister,
    userLogin,
    getUser,
    userUpdate,
    passwordReset,
    getNewPassword,
    newPassword

}