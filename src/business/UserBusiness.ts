import { UserDatabase } from "../database/UserDatabase";
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/users/getUsers.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/users/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/users/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { TokenPayload, User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const { name, email, password } = input;
    const id = this.idGenerator.generate();
    const hashedPassword = await this.hashManager.hash(password);

    const user = new User(
      id,
      name,
      email,
      hashedPassword,
      new Date().toISOString()
    );

    const userDB = user.toDBModel();
    await this.userDatabase.insertUser(userDB);

    const payload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
    };
    const token = this.tokenManager.createToken(payload);

    const output: SignupOutputDTO = {
      token,
    };
    return output;
  };

  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;
    const userDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new BadRequestError("Email ou senha invalido");
    }
    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.created_at
    );
    const hashedPassword = user.getPassword();
    const isPasswordCorrect = await this.hashManager.compare(
      password,
      hashedPassword
    );
    if (!isPasswordCorrect) {
      throw new BadRequestError("Email ou senha invalido");
    }

    const payload: TokenPayload = {
      id: user.getId(),
      name: user.getEmail(),
    };
    const token = this.tokenManager.createToken(payload);
    const output: LoginOutputDTO = {
      token,
    };
    return output;
  };
  public getUsers = async (input: GetUsersInputDTO): Promise<GetUsersOutputDTO> => {
    const {token} = input
    const payload =this.tokenManager.getPayload(token)
    if(!payload){
      throw new BadRequestError("token invalido")
    }
    const usersDB = await this.userDatabase.getUsers()

    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.created_at
      )
      return user.toBusinessModel()
    })
    const output: GetUsersOutputDTO = users
    return output
  }
}
