import { UserBusiness } from "../../../src/business/UserBusiness";
import { SignupSchema } from "../../../src/dtos/users/signup.dto";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock";

describe("Teste signup", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  );

  test("Um token deve ser gerado ao cadastrar", async () => {
    const input = SignupSchema.parse({
      name: "Fallen",
      email: "fallen@email.com",
      password: "fallenmajor1",
    });
    const output = await userBusiness.signup(input);

    expect(output).toEqual({
      token: "token-mock",
    });
  });
});
