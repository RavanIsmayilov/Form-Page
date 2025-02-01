    import React, { useState } from "react";
    import { useNavigate, useSearchParams } from "react-router-dom";
    import { confirmPasswordReset, getAuth } from "firebase/auth";

    const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const oobCode = searchParams.get("oobCode");
    const auth = getAuth();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!oobCode) {
            setError("Invalid reset link.");
            return;
        }

        try {
            await confirmPasswordReset(auth, oobCode, password);
            setMessage("Your password has been successfully reset.");
            setError("");
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error) {
            console.error("Reset Password Error:", error);
            setMessage("");
            setError("Failed to reset password. Please try again.");
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-6 py-12 rounded-lg shadow-lg max-w-[550px] w-full">
            <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
            <form onSubmit={handleResetPassword} className="space-y-4">
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
