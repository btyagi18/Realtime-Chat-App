import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const filtered = showOnlineOnly ? users.filter(u => onlineUsers.includes(u._id)) : users;

  return (
    <aside className="bg-red-500 w-20 lg:w-72 bg-lavender-50 border-r border-lavender-200 p-4 flex flex-col">
      <div className="flex items-center mb-4">
        <Users className="w-5 h-5 text-black" />
        <span className=" hidden lg:inline font-semibold text-lavender-900 ml-2">Contacts</span>
      </div>

      <div className="mb-4 hidden lg:block items-center gap-2">
        <input
          type="checkbox"
          checked={showOnlineOnly}
          onChange={e => setShowOnlineOnly(e.target.checked)}
          className="checkbox checkbox-sm checkbox-primary"
        />
        <span className="text-sm text-lavender-500">Show online only</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {isUsersLoading ? (
          <p className="text-center text-lavender-500">Loading...</p>
        ) : filtered.length > 0 ? (
          filtered.map(user => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-100 transition ${
                selectedUser?._id === user._id ? "bg-yellow-200" : ""
              }`}
            >
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="hidden lg:block text-left">
                <p className="font-medium text-lavender-900 truncate">{user.fullName}</p>
                <p className="text-xs text-lavender-500">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          ))
        ) : (
          <p className="text-center text-lavender-500">No users found</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
