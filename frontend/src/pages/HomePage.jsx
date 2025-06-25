import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen pt-16 bg-lavender-50">
      <div className="container mx-auto px-4 h-[calc(100vh-4rem)]">
        <div className="flex h-full bg-white rounded-xl shadow-lg overflow-hidden">
          <Sidebar />
          {selectedUser ? <ChatContainer /> : <NoChatSelected />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
