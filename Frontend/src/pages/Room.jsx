import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { useLocation } from "react-router-dom";
import CodeEditor from "../components/Editor";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const Room = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const username = location.state?.username || "Anonymous";
    const socket = useSocket();
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState(() => {
        const savedChat = localStorage.getItem(`chat-${roomId}`);
        return savedChat ? JSON.parse(savedChat) : [];
    });
    const [activeUsers, setActiveUsers] = useState([{ id: "You", name: username }]);

    useEffect(() => {
        socket.emit("join-room", { roomId });
        socket.on("code-update", (newCode) => {
            setCode(newCode);
        });
        socket.on("receive-message", (data) => {
            setChat((prevChat) => [...prevChat, data]);
        });
        socket.on("user-joined", (userId) => {
            setActiveUsers((prev) => {
                if (prev.some((user) => user.id === userId)) return prev;
                return [...prev, { id: userId, name: `Guest ${userId.slice(0, 4)}` }];
            });
        });


        return () => {
            socket.off("code-update");
            socket.off("receive-message");
            socket.off("user-joined");
        };
    }, [socket, roomId]);

    useEffect(() => {
        localStorage.setItem(`chat-${roomId}`, JSON.stringify(chat));
    }, [chat, roomId]);

        const runCode = () => {
                setOutput("Running...");

                const logs = [];
                const originalLog = console.log;
                const originalError = console.error;

                console.log = (...args) => {
                        logs.push(args.join(" "));
                };

                console.error = (...args) => {
                        logs.push(args.join(" "));
                };

                try {
                        eval(code);
                        setOutput(logs.join("\n") || "No output");
                } catch (error) {
                    const safeMessage = error?.message || "Error running code";
                    setOutput(`Error: ${safeMessage}`);
                } finally {
                        console.log = originalLog;
                        console.error = originalError;
                }
        };

    const copyRoom = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
        } catch (error) {
            console.error("Failed to copy room ID:", error);
        }
    };

    const sendMessage = () => {
        if (!message.trim()) return;
        socket.emit("send-message", { roomId, message, username });
        setChat((prevChat) => [...prevChat, { message, username }]);
        setMessage("");
    };

    return (
        <div className="relative h-screen overflow-hidden bg-slate-900 p-4 text-slate-100">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/3 top-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
            </div>

            <div className="relative z-10 grid h-full grid-cols-1 gap-4 xl:grid-cols-[260px_1fr_300px]">
                <Sidebar roomId={roomId} users={activeUsers} onCopyRoom={copyRoom} />

                <main className="flex min-h-0 flex-col rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl">
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Workspace</p>
                            <h2 className="text-sm font-semibold text-slate-100">Room: {roomId}</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Connected
                            </span>
                            <button
                                onClick={copyRoom}
                                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-blue-400/40 hover:bg-blue-500/10"
                            >
                                Copy Room
                            </button>
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 p-3">
                        <CodeEditor code={code} setCode={setCode} socket={socket} roomId={roomId} runCode={runCode} loading={loading} output={output} />
                    </div>
                </main>

                <Chat
                    chat={chat}
                    message={message}
                    setMessage={setMessage}
                    onSend={sendMessage}
                />
            </div>
        </div>
    );
};

export default Room;