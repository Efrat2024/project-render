const User = require("../modules/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({ email }).lean()
    console.log(foundUser);
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized auth' })
    }
    console.log(foundUser.password);
    const match = await bcrypt.compare(password, foundUser.password)
    console.log(match, "aaaaaaaaaa");
    if (!match)
        return res.status(401).json({ message: 'not match ' })


    const userInfo = { _id: foundUser._id, firstname: foundUser.firstname, lastname: foundUser.lastname, email: foundUser.email, password: foundUser.password, role: foundUser.roles }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    if (password == process.env.ManagerPassword) {
        res.json({ accessToken: accessToken, status: 1, name: `${foundUser.firstname} ${foundUser.lastname}`, id: `${foundUser.id}` })
    }
    else {
        res.json({ accessToken: accessToken, status: 2, name: `${foundUser.firstname} ${foundUser.lastname}`, id: `${foundUser._id}` })
    }

}
const register = async (req, res) => {
    console.log("i in register in server");
    const { password, firstname, lastname, email, vacationPackage, shoppingCart, pay } = req.body
    console.log({ password, firstname, lastname, email });
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ email: email }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate email" })
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    let userObject = {};
    if (password == process.env.ManagerPassword)
        userObject = { password: hashedPwd, firstname, lastname, email, vacationPackage, shoppingCart, roles: "Manager" }
    else
        userObject = { password: hashedPwd, firstname, lastname, email, vacationPackage, shoppingCart }

    const user = await User.create(userObject)
    console.log("user", user);
    if (user && user.password === process.env.ManagerPassword) {
        const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET)
        res.status(201).json({ message: `New manager ${user.firstname}  ${user.lastname}  created`, status: 1, accessToken })
    }

    else if (user) {
        console.log("i create,,,,");
        const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET)
        res.status(201).json({ message: `New user ${user.firstname}  ${user.lastname}  created`, status: 2, accessToken })
    }
    else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}
module.exports = { login, register }


