import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="bg-red-700 h-screen pt-20 bg-lavender-50 text-lavender-900">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-black rounded-xl shadow-md p-6 space-y-8 border border-purple-100">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-serif text-yellow-500">Profile</h1>
            <p className="mt-2 text-white">Your profile information</p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 bg-yellow-500 hover:bg-purple-700
                  p-2 rounded-full cursor-pointer shadow transition
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-50" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-yellow-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Info Display */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-yellow-500 flex items-center gap-2 font-medium">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-purple-50 rounded-lg border border-purple-200 text-purple-800">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-yellow-500 flex items-center gap-2 font-medium">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-purple-50 rounded-lg border border-purple-200 text-purple-800">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info Box */}
          <div className="mt-6 bg-purple-50 border border-purple-100 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-4">Account Information</h2>
            <div className="space-y-3 text-sm text-yellow-700">
              <div className="flex items-center justify-between py-2 border-b border-purple-200">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
