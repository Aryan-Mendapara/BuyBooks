import { useState } from "react";
import { FiBell, FiCheck, FiLock, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";

function Settings() {
  const [storeName, setStoreName] = useState("BuyBooks");
  const [notifications, setNotifications] = useState(true);
  const saveSettings = (event) => {
    event.preventDefault();
    toast.success("Settings saved successfully");
  };

  return <div><div className="mb-7"><p className="text-[10px] font-bold tracking-[2px] text-orange-600">WORKSPACE PREFERENCES</p><h2 className="font-serif text-4xl font-bold">Settings</h2><p className="mt-2 text-sm text-gray-500">Manage your admin workspace preferences.</p></div><form onSubmit={saveSettings} className="max-w-2xl rounded-xl border border-[#e5dfd8] bg-[#fffdf9] p-6"><label className="block text-sm font-semibold text-gray-600">Store name<input value={storeName} onChange={(event) => setStoreName(event.target.value)} className="admin-book-input" /></label><div className="mt-6 flex items-center justify-between border-t border-[#eee8e1] pt-5"><div className="flex items-center gap-3"><FiBell className="text-orange-500" /><div><strong className="block text-sm">Admin notifications</strong><small className="text-xs text-gray-500">Show important store updates</small></div></div><button type="button" onClick={() => setNotifications(!notifications)} className={`h-6 w-11 rounded-full p-1 transition ${notifications ? "bg-orange-500" : "bg-gray-300"}`}><span className={`block h-4 w-4 rounded-full bg-white transition ${notifications ? "translate-x-5" : "translate-x-0"}`} /></button></div><div className="mt-5 flex items-center gap-3 border-t border-[#eee8e1] pt-5 text-sm text-gray-600"><FiLock className="text-orange-500" /> Admin access is protected by your server credentials.</div><button type="submit" className="mt-6 flex items-center gap-2 rounded-md bg-orange-500 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-600"><FiSave /> Save settings</button></form></div>;
}

export default Settings;
