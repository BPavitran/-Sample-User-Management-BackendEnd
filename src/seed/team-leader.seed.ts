import { UserType } from './../common/user-type';
import { UserDao } from "../dao/user.dao";
import { DUser } from "../schemas/user.model";

export const teamLeaderEmail = `teamLeader1@xyz.com`;

export default async function createTeamLeaderUser() {

    const user = await UserDao.getUserByEmail(teamLeaderEmail);
    if (user) {
        console.log("Team Leader Already Created");
        return null;
    }

    const teamLeaderData : DUser = {
        firstName : "Isaac",
        lastName: "Newton",
        password: "111111",
        userType: UserType.TEAM_LEADER,
        email: teamLeaderEmail,
        age: 35,
        address: "Gampaha, Kelaniya"
    }

    const teamLeader = await UserDao.createUser(teamLeaderData);
    console.log("Team Leader Created");
    return teamLeader;
}