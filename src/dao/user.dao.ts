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

    export async function getAllUsers(): Promise<IUser[]> {
        let users: IUser[] = await User.find();
        return users;
    }

    export async function getUserById(userId : string): Promise<IUser> {
        let user: IUser = await User.findById(userId);
        return user;
    }

    export async function updateUser(userId : string, data : Partial<IUser>) {
        await User.findByIdAndUpdate(userId, {'$set': data});
        const updatedUser = await getUserById(userId);
        return updatedUser;
    }

    export async function deleteUser(userId : string) {
        await User.deleteOne({_id : userId});
    }

    export async function createUsers(usersData : DUser[]) {
        await User.insertMany(usersData);
        const updatedUsers = await getAllUsers();
        return updatedUsers;
    }
}