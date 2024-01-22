import { TokenPayload } from "../../src/models/User";

export class TokenManagerMock {
  public createToken = (payload: TokenPayload): string => {
    if (payload.id === "id-mock") {
      return "token-mock";
    } else if (payload.id === "id-mock-2") {
      return "token-mock-2";
    } else {
      return "token-mock-astrodev";
    }
  };

  public getPayload = (token: string): TokenPayload | null => {
    if (token === "token-mock") {
      return {
        id: "id-mock",
        name: "Maneskin",
      };
    } else if (token === "token-mock-2") {
      return {
        id: "id-mock-2",
        name: "Nirvana",
      };
    } else {
      return null;
    }
  };
}
