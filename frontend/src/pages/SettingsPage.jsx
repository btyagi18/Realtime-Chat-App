import { useState } from "react";
import { Send, ImageIcon, Trash2 } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { wallpaper, setWallpaper } = useChatStore();
  const [localWallpaper, setLocalWallpaper] = useState(wallpaper);

  const handleWallpaperChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalWallpaper(imageUrl);
      setWallpaper(imageUrl); // Save globally
      localStorage.setItem("chatWallpaper", imageUrl); // Persist
    }
  };

  const handleRemoveWallpaper = () => {
    setLocalWallpaper("");
    setWallpaper("");
    localStorage.removeItem("chatWallpaper");
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-red-700 text-black-400">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-serif text-center"> Customize Your Chat Wallpaper</h1>

        <div className=" shadow-xl rounded-xl p-6 border border-purple-100">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-3xl">Upload Wallpaper</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleWallpaperChange}
              className="file-input file-input-bordered w-full max-w-md"
            />

            <button
              onClick={handleRemoveWallpaper}
              className="flex items-center gap-2 text-sm text-black-500 hover:text-black-700 mt-2"
            >
              <Trash2 size={16} />
              Remove Wallpaper
            </button>
          </div>
        </div>

        <div
          className="rounded-xl border border-purple-200 overflow-hidden shadow-md"
          style={{
            backgroundImage: localWallpaper ? `url(${localWallpaper})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-6 bg-white bg-opacity-80">
            <h2 className="text-xl font-semibold mb-4">Live Chat Preview</h2>
            <div className="space-y-3 min-h-[200px]">
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="w-8 h-8 rounded-full bg-yellow-600 text-white flex items-center justify-center font-medium">
                  B
                </div>
                <div>
                  <p className="font-medium text-sm">Bhumika Tyagi</p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>

              {PREVIEW_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-xl shadow-md ${
                      msg.isSent ? "bg-yellow-600 text-white" : "bg-gray-200"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-[10px] mt-1 text-opacity-70">12:00 PM</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  placeholder="Type a message..."
                  value="This is a preview"
                  readOnly
                />
                <button className="bg-yellow-600 text-white px-4 py-2 rounded">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
