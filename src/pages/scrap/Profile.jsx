const Profile = () => {
  return (
    <div className="space-y-6 ">
      <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
      <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 w-full max-w-md">
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 text-sm mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-orange-500 focus:outline-none"
              id="name"
              type="text"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-orange-500 focus:outline-none"
              id="email"
              type="text"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm mb-2" htmlFor="bio">
              Bio
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:ring-2 focus:ring-orange-500 focus:outline-none"
              id="bio"
              placeholder="Tell us about yourself"
              rows="3"
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg"
              type="button"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
