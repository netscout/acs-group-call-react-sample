import { useState, useRef, useEffect } from "react";
import { initializeIcons, registerIcons } from "@fluentui/react";
import {
  DEFAULT_COMPONENT_ICONS,
  StatefulCallClient,
  createStatefulCallClient,
  FluentThemeProvider,
  CallClientProvider,
  CallAgentProvider,
  CallProvider,
} from "@azure/communication-react";
import { Call, CallAgent } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import axios from "axios";
import CallingComponents from "./CallingComponents";
import { useSelector } from "react-redux";
import { RootState } from "../store";

initializeIcons();
registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

const getRandomNumber = () => {
  return Math.floor(Math.random() * 1000);
};

const VideoChat = () => {
  const { onCall } = useSelector((state: RootState) => state.communications);

  const groupId = "6bf9f7d7-89f4-4ff2-8974-a3468f282a1c"; //v4();
  const displayName = `user ${getRandomNumber()}`;

  // Low-level call library client.
  const [statefulCallClient, setStatefulCallClient] =
    useState<StatefulCallClient>();
  // Low-level call agent for calling client.
  const callAgent = useRef<CallAgent>();
  // Low-level call object for calling client
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    // Dispose of call agent when unmounting this App component
    return () => {
      setCall(undefined);
      if (callAgent.current) {
        console.log("Disposing call agent on unmount");
        callAgent.current
          .dispose()
          .then(() => console.log("Call agent disposed"));
      }
    };
  }, []);

  useEffect(() => {
    if (onCall) {
      const handleStartCall = async () => {
        if (!statefulCallClient) {
          // get ACS userId and token
          const response = await axios.get("http://localhost:3002");

          const { userId, token } = response.data;

          // create statefulCallClient
          const statefulCallClient = createStatefulCallClient({
            userId: { communicationUserId: userId },
          });

          statefulCallClient.getDeviceManager().then((deviceManager) => {
            deviceManager.askDevicePermission({ video: true, audio: true });
          });

          setStatefulCallClient(statefulCallClient);

          // create callAgent
          const tokenCredential = new AzureCommunicationTokenCredential(token);

          callAgent.current = await statefulCallClient.createCallAgent(
            tokenCredential,
            {
              displayName: displayName,
            }
          );
        }

        if (callAgent.current) {
          setCall(
            callAgent.current.join(
              { groupId },
              {
                audioOptions: { muted: true },
                videoOptions: { localVideoStreams: undefined },
              }
            )
          );
        }
      };

      handleStartCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onCall]);

  return (
    <>
      <FluentThemeProvider>
        {statefulCallClient && (
          <CallClientProvider callClient={statefulCallClient}>
            {callAgent && (
              <CallAgentProvider callAgent={callAgent.current}>
                {call && (
                  <CallProvider call={call}>
                    <CallingComponents />
                  </CallProvider>
                )}
              </CallAgentProvider>
            )}
          </CallClientProvider>
        )}
      </FluentThemeProvider>
    </>
  );
};

export default VideoChat;
