import { UserBusiness } from "../../../src/business/UserBusiness";
import { LoginSchema } from "../../../src/dtos/users/login.dto";
import { HashManagerMock } from "../../mocks/HashManagerMock";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock";

describe("Teste de login", () => {
  test("Deve fazer login com sucesso, gerando token ao logar", async () => {
    const userBusiness = new UserBusiness(
      new UserDatabaseMock(),
      new IdGeneratorMock(),
      new TokenManagerMock(),
      new HashManagerMock()
    );
    const input = LoginSchema.parse({
      email: "maneskin@email.com",
      password: "maneskin",
    });
    const output = await userBusiness.login(input);

    expect(output).toEqual({
      token: "token-mock",
    });
  });
});
