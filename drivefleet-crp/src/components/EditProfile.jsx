"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";

export function EditProfile({ user }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const { name, image } = Object.fromEntries(formData.entries());

    try {
      const res = await authClient.user.update({
        name: name.trim(),
        image: image.trim(),
      });

      if (res.error) {
        throw new Error(res.error.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "An error occurred while updating your profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="absolute top-1 -right-1 z-10 w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-orange-500 hover:scale-105 active:scale-95 transition-all duration-200"
        title="Edit Profile"
      >
        <FiEdit2 className="text-sm" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white shadow-2xl overflow-hidden">
            <div className="h-1 w-full bg-orange-500" />

            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest block mb-1 text-orange-500">
                    USER PROFILE
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 hover:border-gray-400 transition-colors"
                >
                  <span className="text-gray-500 font-light text-xl">✕</span>
                </button>
              </div>

              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    defaultValue={user?.name || ""}
                    placeholder="Your Name"
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    defaultValue={user?.image || ""}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 text-xs font-bold uppercase tracking-widest border border-gray-300 text-gray-700 hover:border-gray-500 transition-colors"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:opacity-50 bg-orange-500"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
