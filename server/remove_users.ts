import { CommunicationIdentityClient } from "@azure/communication-identity";
import {
  CommunicationUserIdentifier,
  createIdentifierFromRawId,
} from "@azure/communication-common";

const userIdsToRemove = [
  "8:acs:93300247-8265-4180-a7f6-82a87124a0ec_00000019-148a-2e83-aa60-c93a0d0034ad",
  "<replace here to ACS user id>",
];
const connString = "<replace here to your ACS connection string>";

userIdsToRemove.forEach(async (userId) => {
  const tokenClient = new CommunicationIdentityClient(connString);
  const user = createIdentifierFromRawId(userId);
  await tokenClient.deleteUser(user as CommunicationUserIdentifier);
  console.log(`Deleted user: ${userId}`);
});
