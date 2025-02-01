    import React, { useState } from "react";
    import { useLocation, useNavigate } from "react-router-dom";
    import { confirmPasswordReset } from "firebase/auth";
    import { auth } from "../../config/firebaseConfig";

    const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get("oobCode");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!oobCode) {
        setError("Invalid or expired reset link.");
        return;
        }

        if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
        }

        try {
        await confirmPasswordReset(auth, oobCode, password);
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 3000);
        } catch (error: any) {
        setError("Error resetting password. Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-6 py-12 rounded-lg shadow-lg max-w-[550px] w-full">
            <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-[#000842]">
                <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-[#000842]">
                <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-3 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-[#0C21C1] text-white py-3 rounded-3xl cursor-pointer font-semibold transition-all hover:bg-blue-700"
            >
                Submit
            </button>
            </form>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
        </div>
    );
    };

    export default ResetPassword;
