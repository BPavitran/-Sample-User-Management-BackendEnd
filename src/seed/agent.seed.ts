import { UserType } from './../common/user-type';
import { UserDao } from "../dao/user.dao";
import { DUser } from "../schemas/user.model";

export const agentEmail = `agent1@xyz.com`;

export default async function createAgentUser() {

    const user = await UserDao.getUserByEmail(agentEmail);
    if (user) {
        console.log("Agent Already Created");
        return null;
    }

    const agentData : DUser = {
        firstName : "Albert",
        lastName: "Einstein",
        password: "111111",
        userType: UserType.AGENT,
        email: agentEmail,
        age: 30,
        address: "Kandy, Peradeniya"
    }

    const agent = await UserDao.createUser(agentData);
    console.log("Agent Created");
    return agent;
}