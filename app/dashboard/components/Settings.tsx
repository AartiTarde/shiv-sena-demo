export default function Settings() {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-carrot capitalize">
          Settings
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">
          Manage your account and application settings
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        {/* Profile Settings */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-border-light">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
            Profile Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-4 py-2 border border-border-light rounded-lg focus:ring-2 focus:ring-carrot focus:border-carrot outline-none transition bg-white text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full px-4 py-2 border border-border-light rounded-lg focus:ring-2 focus:ring-carrot focus:border-carrot outline-none transition bg-white text-slate-900"
              />
            </div>
            <button className="bg-carrot hover:bg-burnt text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-border-light">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
            Notification Settings
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                <p className="text-xs text-slate-500">Receive email updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-carrot-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-carrot"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Push Notifications</p>
                <p className="text-xs text-slate-500">Receive push updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-carrot-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-carrot"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-border-light">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
            Security Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-border-light rounded-lg focus:ring-2 focus:ring-carrot focus:border-carrot outline-none transition bg-white text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-border-light rounded-lg focus:ring-2 focus:ring-carrot focus:border-carrot outline-none transition bg-white text-slate-900"
              />
            </div>
            <button className="bg-carrot hover:bg-burnt text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

