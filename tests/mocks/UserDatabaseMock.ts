import { UserDB } from "../../src/models/User";
import { BaseDatabase } from "../../src/database/BaseDatabase";

const usersMock: Array<UserDB> = [
  {
    id: "id-mock",
    name: "Maneskin",
    email: "maneskin@email.com",
    password: "hash-mock",
    created_at: new Date().toISOString(),
  },
  {
    id: "id-mock2",
    name: "Nirvana",
    email: "nirvana@email.com",
    password: "hash-mock2",
    created_at: new Date().toISOString(),
  },
];

export class UserDatabaseMock extends BaseDatabase {
  public static TABLE_USERS = "users";

  public async findUserByEmail(
    email: string | undefined
  ): Promise<UserDB | undefined> {
    return usersMock.filter((user) => user.email === email)[0];
  }

  public async insertUser(userDB: UserDB): Promise<void> {}
}
