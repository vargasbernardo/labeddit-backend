import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { ZodError } from "zod";
import { BaseError } from "../errors/BaseError";
import { SignupSchema } from "../dtos/users/signup.dto";
import { LoginSchema } from "../dtos/users/login.dto";
import { GetUsersSchema } from "../dtos/users/getUsers.dto";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public signup = async (req: Request, res: Response) => {
    try {
      const input = SignupSchema.parse({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      const output = await this.userBusiness.signup(input);
      res.status(201).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const input = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password,
      });
      const output = await this.userBusiness.login(input);
      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public getUsers = async (req: Request, res: Response) => {
    try {
      const input = GetUsersSchema.parse({
        token: req.headers.authorization,
      });
      const output = await this.userBusiness.getUsers(input);
      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  }
}
