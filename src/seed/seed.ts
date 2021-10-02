import createAdminUser from "./admin.seed";
import createManagerUser from "./manager.seed";
import createTeamLeaderUser from "./team-leader.seed";
import createAgentUser from "./agent.seed";
 
export default async function seed() {
    await createAdminUser();
    await createManagerUser();
    await createTeamLeaderUser();
    await createAgentUser(); 
}
