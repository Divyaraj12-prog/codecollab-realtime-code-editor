import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!roomId.trim()) return;

    navigate(`/room/${roomId}`, { state: { username } });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <nav className="relative z-10 flex items-center justify-between border-b border-white/10 bg-slate-900/70 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-lg shadow-blue-700/30">
            CC
          </div>
          <span className="text-lg font-semibold tracking-wide">CodeCollab</span>
        </div>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
          Live Collaboration
        </span>
      </nav>

      <main className="relative z-10 flex min-h-[calc(100vh-74px)] items-center justify-center p-6">
        <section className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl md:p-12">
          <p className="mb-4 inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            Developer Workspace
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-6xl">
            Collaborate on Code in Real-Time
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            Build, debug, and ship together in a live coding room designed for modern teams.
            Fast syncing, seamless chat, and an IDE-first experience in one place.
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4 md:grid-cols-[1fr_1fr_auto] md:p-5">
            <input
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/30"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/30"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleJoin();
              }}
            />

            <button
              onClick={handleJoin}
              className="rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:scale-[1.01] hover:from-blue-400 hover:to-indigo-500"
            >
              Join Room
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;