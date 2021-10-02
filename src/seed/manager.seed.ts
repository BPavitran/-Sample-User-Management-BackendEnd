import { UserType } from './../common/user-type';
import { UserDao } from "../dao/user.dao";
import { DUser } from "../schemas/user.model";

export const managerEmail = `manager1@xyz.com`;

export default async function createManagerUser() {

    const user = await UserDao.getUserByEmail(managerEmail);
    if (user) {
        console.log("Manager Already Created");
        return null;
    }

    const managerData : DUser = {
        firstName : "Liano",
        lastName: "Davinci",
        password: "111111",
        userType: UserType.MANAGER,
        email: managerEmail,
        age: 35,
        address: "Kandy, Peradeniya"
    }

    const manager = await UserDao.createUser(managerData);
    console.log("Manager Created");
    return manager;
}