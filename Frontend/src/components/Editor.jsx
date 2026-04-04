import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode, socket, roomId, runCode, loading, output }) => {
  const handleChange = (value) => {
    if (value === undefined) return;
    setCode(value);

    socket.emit("code-change", {
      roomId,
      code: value,
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-inner shadow-black/40">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          <span className="ml-2 text-xs font-medium tracking-[0.2em] text-slate-400">main.js</span>
        </div>

        <button
          onClick={runCode}
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-400 hover:to-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Running..." : "Run Code"}
        </button>
      </div>

      <div className="min-h-0 flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={handleChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            smoothScrolling: true,
            scrollBeyondLastLine: false,
            padding: { top: 14 },
            roundedSelection: true,
            cursorBlinking: "phase",
          }}
        />
      </div>

      <div className="border-t border-white/10 bg-slate-950/95 px-4 py-3 flex flex-col">
        <div className="flex items-center justify-between pb-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Execution Output</p>
          <span className="text-[11px] text-slate-500">Browser sandbox</span>
        </div>
        <div className="max-h-40 overflow-auto rounded-xl border border-emerald-400/20 bg-black/70 p-3 font-mono text-sm text-emerald-300">
          <pre className="whitespace-pre-wrap wrap-break-word">{output || "Run code to see output here."}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;