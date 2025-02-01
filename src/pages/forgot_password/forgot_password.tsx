import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../../config/firebaseConfig"; 

const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
});

const ForgotPassword: React.FC = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: { email: string }) => {
        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, data.email);
            console.log("Sign-in methods:", signInMethods);

            if (signInMethods.length === 0) {
                setError("This email is not registered. Please check and try again.");
                setMessage("");
                return;
            }

            await sendPasswordResetEmail(auth, data.email);
            setMessage("A password reset link has been sent to your email.");
            setError("");
        } catch (error) {
            console.error("Error:", error);
            setMessage("");
            setError("Failed to send reset email. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-[550px] w-full">
                <div className="w-full md:w-full sm:flex flex-col justify-center">
                    <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-[#999999] font-medium text-[13px]">Email</label>
                            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-[#000842]">
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full p-3 focus:outline-none"
                                />
                            </div>
                            <p className="text-red-500 text-sm mt-1 font-medium">{errors.email?.message}</p>
                        </div>

                        {/* Reset Password Button */}
                        <button type="submit" className="w-full bg-[#0C21C1] text-white py-3 rounded-3xl cursor-pointer font-semibold transition-all hover:bg-blue-700">
                            Reset Password
                        </button>
                    </form>
                    {message && <p className="mt-4 text-green-500">{message}</p>}
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
