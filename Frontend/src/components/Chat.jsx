const Chat = ({ chat, message, setMessage, onSend }) => {
	return (
		<aside className="flex h-full w-full flex-col rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/30 backdrop-blur-xl overflow-auto">
			<div className="border-b border-white/10 px-4 py-4">
				<p className="text-xs uppercase tracking-[0.15em] text-slate-400">Team Chat</p>
				<h3 className="mt-1 text-base font-semibold text-slate-100">Live Conversation</h3>
			</div>

			<div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
				{chat.length === 0 ? (
					<div className="rounded-xl border border-dashed border-white/10 bg-slate-950/30 p-4 text-sm text-slate-400">
						No messages yet. Start the conversation.
					</div>
				) : (
					chat.map((msg, index) => (
						<div key={`${msg.username}-${index}`} className="rounded-2xl border border-white/10 bg-slate-950/40 p-3">
							<p className="text-xs font-semibold text-blue-300">{msg.username || "Anonymous"}</p>
							<p className="mt-1 text-sm leading-relaxed text-slate-100">{msg.message}</p>
						</div>
					))
				)}
			</div>

			<div className="sticky bottom-0 border-t border-white/10 bg-slate-900/80 p-3 backdrop-blur-xl">
				<div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5">
					<input
						className="w-full bg-transparent px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400"
						placeholder="Type a message..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								onSend();
							}
						}}
					/>
					<button
						onClick={onSend}
						className="rounded-lg bg-linear-to-r from-blue-500 to-indigo-600 p-2 text-white transition hover:from-blue-400 hover:to-indigo-500"
						aria-label="Send message"
					>
						<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M22 2L11 13" />
							<path d="M22 2L15 22L11 13L2 9L22 2Z" />
						</svg>
					</button>
				</div>
			</div>
		</aside>
	);
};

export default Chat;
