import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {

        //HASH THE PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);
        //CREATE A NEW USER AND SAVE TO DB

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        res.status(201).json({ message: "Benutzer erfolgreich erstellt (User created successfully)" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Fehler bei der Benutzererstellung (user creation error)" })
    }


}
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) return res.status(401).json({ message: "Invalid Credentials!" });
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials!" })
        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({
            id: user.id,
            isAdmin: false,
        }, process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const { password: userPassword, ...userInfo } = user;

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age,
        }).status(200).json(userInfo)

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Anmeldung fehlgeschlagen (failed to login)!" })
    }
}
export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
}