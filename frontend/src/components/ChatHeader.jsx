import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const status = onlineUsers.includes(selectedUser._id) ? "Online" : "Offline";

  return (
    <div className="bg-red-700 border-b border-lavender-200 py-3 px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={selectedUser.profilePic || "/avatar.png"}
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full object-cover shadow"
        />
        <div>
          <p className="font-semibold text-lavender-900">{selectedUser.fullName}</p>
          <p className="text-sm text-lavender-500">{status}</p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)} className="text-lavender-500 hover:text-lavender-700">
        <X size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;
