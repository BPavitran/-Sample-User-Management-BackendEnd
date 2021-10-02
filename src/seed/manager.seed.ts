import { UserType } from './../common/user-type';
import { UserDao } from "../dao/user.dao";
import { DUser } from "../schemas/user.model";

export const managerEmail = `manager222222222222@xyz.com`;

export default async function createManagerUser() {

    const user = await UserDao.getUserByEmail(managerEmail);
    if (user) {
        console.log("Manager Already Created");
        return null;
    }

    const managerData : DUser = {
        firstName : "Liano2222222222",
        lastName: "Davinci22222222222",
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