const userService = require('./user.service');
const { registerValidation, updateValidation } = require('../util/validation')

const userGetRegister = async (req, res) => {
    res.render('user/register')
};
const userRegister = async (req, res) => {
    try {
        const { userFirstName, userLastName, userEmail, userPassword, userConfirmPassword, userBio } = req.body
        const userPhoto = req.file.path;
        if (userPassword !== userConfirmPassword) res.render('error', { err: 'Password not match' });
        await registerValidation.validateAsync({ userFirstName, userEmail, userPassword, userConfirmPassword, userBio });
        const user = await userService.userRegister(userFirstName, userLastName, userEmail, userPassword, userConfirmPassword, userBio, userPhoto);
        res.redirect('/')
    }
    catch (err) {
        // console.log(err)
        res.render('error', { err: err.message })
    }
};

const userGetLogin = async (req, res) => {
    res.render('user/login')
};
const userLogin = async (req, res) => {
    const { userEmail, userPassword } = req.body
    try {
        const user = await userService.userLogin(userEmail, userPassword);
        res.cookie('token', user, {
            httpOnly: true
        });
        if (user.response) {
            //  res.send(user)
             res.render('user/home')
        }
        else {

            res.redirect('/')
        }

    }
    catch (err) {
        res.send(err)
        res.render('error', { err: err.message })
    }
}

const getUser = async (req, res) => {
    try {
        const userEmail = req.user.email
        const user = await userService.getUser(userEmail);
        res.render('user/profile', { user });
    } catch (err) {
        console.log('error:', err.message);
        return res.send(err.message).status(404);
    }
}

const userGetUpdate = async (req, res) => {
    return res.render('user/update')
}
const userUpdate = async (req, res) => {
    try {
        const { userFirstName, userLastName, userPassword, userBio } = req.body
        const userEmail = req.user.email;
        // const userPhoto = req.file.path;
        //    console.log('........',userPhoto)
        const user = await userService.userUpdate(userEmail, userFirstName, userLastName, userPassword, userBio);
        // console.log(user)
        res.render('user/profile', { user });
    }
    catch (err) {
        return res.render('error', { err: err.message })
    }
}


const userLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.clearCookie("googleToken");
        // console.log("logout succesfully");
        res.redirect('/');
    }
    catch (err) {
        res.render('error', { err: err.message })
    }
}


const getPasswordReset = async (req, res) => {
    return res.render('user/reset')
}
const passwordReset = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const response = await userService.passwordReset(userEmail);
        // res.send(response);
        res.redirect('/');
    } catch (err) {
        res.render('error', { err: err.message })

    }
}

const getNewPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const response = await userService.getNewPassword(token);
        res.render('user/newpassword', { response })
    } catch (err) {
        console.log(err)
        res.render('error', { err: err.message })
    }
}

const newPassword = async (req, res) => {
    try {
        const { userId, userPassword } = req.body;
        const response = await userService.newPassword(userId, userPassword);
        console.log(response)
        res.redirect('/')
    }
    catch (err) {
        res.render('error', { err: err.message })
    }
}

module.exports = {
    userGetRegister,
    userRegister,
    userGetLogin,
    userLogin,
    getUser,
    userGetUpdate,
    userUpdate,
    userLogout,
    getPasswordReset,
    passwordReset,
    getNewPassword,
    newPassword
}