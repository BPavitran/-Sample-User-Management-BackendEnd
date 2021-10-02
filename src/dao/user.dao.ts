import User, { DUser, IUser } from "../schemas/user.model";

export namespace UserDao {

    export async function createUser(data: DUser): Promise<IUser> {
        const iUser = new User(data);
        let user = await iUser.save();
        return user;
    }
    
    export async function getUserByEmail(email: string): Promise<IUser | null> {
        let user: IUser = await User.findOne({email: email});
        return user;
    }

    export async function authenticateUser(email: string, password: string): Promise<any> {
        const user = await getUserByEmail(email);
        let returnBody = {
            success : true,
            value : null as any
        }
        if (user) {
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                returnBody = {
                    success : false,
                    value : 'Incorrect email/password combination'
                }
                return returnBody;
            }
            returnBody = {
                success : true,
                value : user
            }
            return returnBody;
        } else {
            returnBody = {
                success : false,
                value : 'Email not found'
            }
            return returnBody;
        }
    }
}