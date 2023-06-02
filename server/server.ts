import { CommunicationIdentityClient } from "@azure/communication-identity";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(morgan("short"));

app.get("/", async (req, res) => {
  const connString = "<replace here to your ACS connection string>";

  let tokenClient = new CommunicationIdentityClient(connString);
  const user = await tokenClient.createUser();
  const userToken = await tokenClient.getToken(user, ["voip"]);

  console.log(`${user.communicationUserId}`);

  res.json({
    userId: user.communicationUserId,
    token: userToken.token,
    expiresOn: userToken.expiresOn,
  });
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("500 Internal Server Error");
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down service...");

  // do something before exit

  process.exit(0);
});
