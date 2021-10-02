import { UserType } from './../common/user-type';
import { UserDao } from "../dao/user.dao";
import { DUser } from "../schemas/user.model";

export const adminEmail = `admin@xyz.com`;

export default async function createAdminUser() {

    const user = await UserDao.getUserByEmail(adminEmail);
    if (user) {
        console.log("Admin Already Created");
        return null;
    }

    const adminData : DUser = {
        firstName : "Marco",
        lastName: "Polo",
        password: "111111",
        userType: UserType.ADMIN,
        email: adminEmail,
        age: 40,
        address: "Colombo, Wellawatta"
    }

    const admin = await UserDao.createUser(adminData);
    console.log("Admin Created");
    return admin;
}