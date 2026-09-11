import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
            const response = await fetch(`${backendUrl}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Admin login failed");
            }

            localStorage.setItem("adminToken", data.token);
            toast.success(data.message || "Admin login successful");
            navigate("/admin/dashboard");
        } catch (loginError) {
            const message = loginError.message || "Unable to login as admin";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w-md rounded-xl bg-black p-8 shadow-xl">
                <p className="mb-2 text-center text-sm font-semibold tracking-widest text-orange-500">BUYBOOKS</p>
                <h1 className="mb-2 text-center text-2xl font-semibold text-white">Admin Login</h1>
                <p className="mb-7 text-center text-sm text-gray-400">Sign in to manage your bookstore</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        required
                        placeholder="Enter Admin Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="rounded-lg border-2 border-gray-600 bg-transparent p-3 text-white outline-none placeholder:text-gray-400 focus:border-orange-500"
                    />
                    <input
                        type="password"
                        required
                        placeholder="Enter Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="rounded-lg border-2 border-gray-600 bg-transparent p-3 text-white outline-none placeholder:text-gray-400 focus:border-orange-500"
                    />
                    <button type="submit" className="rounded-lg bg-orange-500 p-3 font-medium text-white hover:bg-orange-600">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    {error && <p className="text-center text-sm text-red-400">{error}</p>}
                    <button type="button" onClick={() => navigate("/login")} className="text-sm text-blue-500 hover:text-blue-400 hover:underline">
                        Back to user login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;