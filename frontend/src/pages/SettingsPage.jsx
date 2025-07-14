import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        {/* Theme section */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-gray-500">Choose a theme for your chat interface</p>
        </div>

        {/* Theme grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`p-2 rounded-lg border text-sm font-medium capitalize transition-colors ${theme === t ? "bg-gray-200 border-black" : "hover:bg-gray-100 border-gray-300"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Preview header */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>

        {/* Preview chat box */}
        <div className="rounded-xl border overflow-hidden shadow-lg bg-[var(--bg-color)] text-[var(--text-color)]">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center font-bold">
                J
              </div>
              <div>
                <h3 className="font-medium text-sm">Rishi</h3>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto">
            {PREVIEW_MESSAGES.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-xs shadow ${msg.isSent
                      ? "bg-[var(--primary-color)] text-white"
                      : "bg-gray-200 text-black"
                    }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-[10px] mt-1 text-gray-400">12:00 PM</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border rounded text-sm"
                placeholder="Type a message..."
                value="This is a preview"
                readOnly
              />
              <button
                className="px-3 py-2 rounded text-white"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;