import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
        const userAccount = await this.account.create(
            ID.unique(),
            email,
            password,
            name
        );

        if (userAccount) {
            console.log(userAccount);
            this.login({ email, password });
        } else {
            console.log("signup error");
        }
        } catch (error) {
        throw error;
        }
    }
    async login({email, password}) {
        try {
            const session = await this.account.createEmailPasswordSession(email , password);
            
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
        return await this.account.get();
        } catch (error) {
        console.log("Appwrite service :: currentuser error", error);
        }
        return null;
    }

    async logout() {
        try {
        await this.account.deleteSessions();
        } catch (error) {
        console.log("Appwrite delete Session error", error);
        }
    }
}

const authService = new AuthService();
export default authService;
