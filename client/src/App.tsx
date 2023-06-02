import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { callStarted } from "./features/communicationsSlice";
import VideoChat from "./components/VideoChat";

const App = () => {
  const dispatch = useDispatch();

  const { onCall } = useSelector((state: RootState) => state.communications);

  const handleStartCall = async () => {
    dispatch(callStarted());
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="flex w-screen">
        <button onClick={handleStartCall} disabled={onCall}>
          Start new call
        </button>
      </div>
      <VideoChat />
    </div>
  );
};

export default App;
