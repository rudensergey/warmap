import { connect } from "mongoose";
import { UserModel } from "src/server/models/user";

class MongoAPI {
  private _user: string;
  private _password: string;
  private _cluster: string;

  constructor(user: string, password: string, cluster: string) {
    this._user = user;
    this._password = password;
    this._cluster = cluster;
  }

  connectMongoDB(): Promise<boolean> {
    return new Promise((resolve) => {
      connect(`mongodb+srv://${this._user}:${this._password}@${this._cluster}`)
        .then(() => {
          this.log("Database connected!");
          resolve(true);
        })
        .catch((error) => {
          this.logError(`Error while connection: ${error}`);
          resolve(false);
        });
    });
  }

  addUser(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) =>
      new UserModel({ username, password })
        .save()
        .then(() => {
          this.log(`User ${username} added!`);
          resolve(true);
        })
        .catch((error: string) => {
          this.logError(`Error while adding user: ${error}`);
          resolve(false);
        })
    );
  }

  log = (test: string) => console.log("\x1b[36m%s\x1b[0m", `MongoAPI: ${test}`);
  logError = (test: string) => console.log("\x1b[31m%s\x1b[0m", `MongoAPI: ${test}`);
}

export default new MongoAPI(
  process.env.MONGODB_USER,
  process.env.MONGODB_PASSWORD,
  process.env.MONGODB_CLUSTER
);
