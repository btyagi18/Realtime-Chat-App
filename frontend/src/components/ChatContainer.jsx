import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    wallpaper,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser._id);
    subscribeToMessages();
    return unsubscribeFromMessages;
  }, [selectedUser?._id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-lavender-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-lavender-50">
      <ChatHeader />

      <div className="flex-1 overflow-auto relative p-2"
        style={{
          backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-lavender-50/70 pointer-events-none"></div>
        <div className="relative z-8 space-y-2">.....
          {isMessagesLoading && <MessageSkeleton />}

          {messages.map(msg => (
            <div key={msg._id} className={`flex ${msg.senderId === authUser._id ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] p-3 rounded-xl shadow-md ${
                msg.senderId === authUser._id
                  ? "bg-red-400 text-white"
                  : "bg-white text-lavender-900"
              }`}>
                {msg.image && (
                  <img src={msg.image} className="mb-2 max-w-xs rounded-md" alt="attachment" />
                )}
                <p className="text-sm">{msg.text}</p>
                <p className="text-[10px] mt-1 opacity-70 text-right">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>
            </div>
          ))}

          <div ref={messageEndRef} />
        </div>
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
