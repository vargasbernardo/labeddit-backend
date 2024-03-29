import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  // metodos
  public insertUser = async (userDB: UserDB): Promise<void> => {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB);
  };

  public findUserByEmail = async (
    email: string
  ): Promise<UserDB | undefined> => {
    const [userDB]: Array<UserDB | undefined> = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    )
      .select()
      .where("email", email);
    return userDB;
  };

  public getUsers = async (): Promise<Array<UserDB>> => {
    const usersDB: Array<UserDB> = await BaseDatabase.connection(UserDatabase.TABLE_USERS).select();
    return usersDB
  }
}
