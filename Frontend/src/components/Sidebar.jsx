const getInitials = (name) => {
  if (!name) return "AN";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const Sidebar = ({ roomId, users, onCopyRoom }) => {
  return (
    <aside className="flex h-full w-full flex-col rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-lg shadow-blue-800/40">
          CC
        </div>
        <div>
          <p className="text-sm text-slate-400">Realtime Workspace</p>
          <h1 className="text-lg font-semibold tracking-wide text-slate-100">CodeCollab</h1>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Room ID</p>
        <p className="mt-2 truncate text-sm font-medium text-slate-100">{roomId}</p>
        <button
          onClick={onCopyRoom}
          className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-blue-400/40 hover:bg-blue-500/10"
        >
          Copy Room ID
        </button>
      </div>

      <div className="mt-6 flex min-h-0 flex-1 flex-col rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Active Users</p>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-300">
            {users.length}
          </span>
        </div>

        <div className="space-y-2 overflow-y-auto pr-1">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 rounded-xl border border-transparent bg-white/5 px-3 py-2 transition hover:border-white/10 hover:bg-white/10"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-blue-500/80 to-indigo-600/80 text-xs font-semibold text-white">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-100">{user.name}</p>
                <p className="truncate text-xs text-slate-400">{user.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;