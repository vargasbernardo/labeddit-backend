export class HashManagerMock {
    public hash = async(plaintext: string): Promise<string> => {
        return "hash-mock"
    }
    public compare = async(plaintext: string, hash: string): Promise<boolean> => {
        switch(plaintext){
            case "maneskin":
                return hash === "hash-mock"
            
            case "nirvana":
                return hash === "hash-mock2"

            default:
                return false
        }
    }
}