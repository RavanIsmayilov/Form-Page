    import React, { useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import { useForm } from "react-hook-form";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    import messageIcon from "../../assets/message 1.svg";
    import passwordIcon from "../../assets/padlock 1.svg";
    import userIcon from "../../assets/user 1.svg";
    import FaceBookIcon from "../../assets/Facebook (1).svg";
    import AppleIcon from "../../assets/apple.svg";
    import GoogleIcon from "../../assets/google.svg";
    import RightSide from "../../assets/Saly-10.svg";
    import ShowEye from "../../assets/eye-show.svg";
    import HideEye from "../../assets/eye-hide.svg";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

    // ✅ YUP Validation Şeması
    const schema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("Email is required"),
        username: yup.string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be at most 20 characters")
            .required("Username is required"),
        password: yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password")], "Passwords do not match")
            .required("Confirm Password is required"),
    });

    interface FormData {
        email: string;
        password: string;
        username: string; 
        confirmPassword: string; 
    }

    const RegisterPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

        const { register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(schema),
        });

        const onSubmit = async (data: FormData) => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
                
                if (userCredential.user) {
                    await sendEmailVerification(userCredential.user);
                    alert("Registration successful! A verification email has been sent. Please verify your email before logging in.");
                }
                navigate("/");
        
            } catch (error) {
                console.error("Registration error:", error);
                setError("Registration failed. Please try again.");
            }
        };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg flex flex-col max-w-7xl md:flex-row w-full">
            {/* Left Side: Login Form */}
            <div className="w-full  md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-6">Sign up</h1>
            <p className="mb-4 text-gray-900">
                If you already have an account register,{" "}
                <Link to="/" className="text-[#0C21C1] font-semibold ">
                Login here!
                </Link>
            </p>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Input */}
                <div>
                <label className="block text-[#999999] font-medium text-[13px]">
                    Email
                </label>
                <div className="flex items-center border-b-2 border-gray-300 focus-within:border-[#000842]">
                    <img
                    src={messageIcon}
                    alt="Email Icon"
                    className="w-5 h-5 mx-2"
                    />
                    <input
                    {...register("email")} 
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full p-3 focus:outline-none"
                    />
                </div>
                    <p className="text-red-500 text-sm mt-1 font-medium">{errors.email?.message}</p>
                </div>

                {/* UserName Input */}
                <div>
                <label className="block text-[#999999] font-medium text-[13px]">
                    Username
                </label>
                <div className="flex items-center border-b-2 border-gray-300 focus-within:border-[#000842]">
                    <img src={userIcon} alt="User Icon" className="w-5 h-5 mx-2" />
                    <input
                    {...register("username")} 
                    type="username"
                    placeholder="Enter your User Name"
                    className="w-full p-3 focus:outline-none"
                    />
                </div>
                    <p className="text-red-500 text-sm mt-1 font-medium">{errors.username?.message}</p>
                </div>

                {/*Password Input */}
                <div>
                <label className="block text-[#999999] font-medium text-[13px]">
                    Password
                </label>
                <div className="flex items-center border-b-2 border-gray-300 focus-within:border-[#000842]">
                    <img
                    src={passwordIcon}
                    alt="Password Icon"
                    className="w-5 h-5 mx-2"
                    />
                    <input
                    {...register("password")} 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full p-3 focus:outline-none"
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="right-3 cursor-pointer text-gray-500"
                    >
                    <img
                        className="w-8"
                        src={showPassword ? ShowEye : HideEye}
                        alt=""
                    />
                    </button>
                </div>
                    <p className="text-red-500 text-sm mt-1 font-medium">{errors.password?.message}</p>
                </div>

                {/* Confirm Password Input */}
                <div>
                <label className="block text-[#999999] font-medium text-[13px]">
                    Confirm Password
                </label>
                <div className="flex items-center border-b-2 border-gray-300 focus-within:border-[#000842]">
                    <img
                    src={passwordIcon}
                    alt="Password Icon"
                    className="w-5 h-5 mx-2"
                    />
                    <input
                    {...register("confirmPassword")} 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full p-3 focus:outline-none"
                    />
                    <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="right-3 cursor-pointer text-gray-500"
                    >
                    <img
                        className="w-8"
                        src={showConfirmPassword ? ShowEye : HideEye}
                        alt=""
                    />
                    </button>
                </div>
                    <p className="text-red-500 text-sm mt-1 font-medium">{errors.confirmPassword?.message}</p>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-[12px] font-light text-[#000000] ">
                    Remember me
                    </span>
                </label>
                <Link to="/forgotpassword" className="text-[#4D4D4D] text-[12px] font-semibold">
                    Forgot Password?
                </Link>
                </div>

                {/* Register Button */}
                <button
                type="submit"
                className="w-full bg-[#0C21C1] text-white py-3 rounded-3xl cursor-pointer font-semibold transition-all hover:bg-blue-700"
                >
                Register
                </button>
            </form>

            {/* Social Login */}
            <p className="mt-8 text-center text-[16px] font-medium text-[#B5B5B5]">
                or continue with
            </p>
            <div className="flex justify-center space-x-7 mt-5">
                <button className="cursor-pointer">
                <img src={FaceBookIcon} alt="Facebook" className="w-11" />
                </button>
                <button className="cursor-pointer">
                <img src={AppleIcon} alt="Apple" className="w-11" />
                </button>
                <button className="cursor-pointer">
                <img src={GoogleIcon} alt="Google" className="w-11" />
                </button>
            </div>
            </div>

            {/* Right Side: Illustration */}
            <div className="hidden md:flex w-full md:w-1/2 text-white  flex-col items-start justify-center p-5 rounded-3xl">
            <div className=" bg-[#000842] text-white flex flex-col items-start justify-center pt-5 pb-15 pl-15 pr-15 rounded-4xl">
                <p className="self-end">📞 +994 70 304 14 10</p>
                <img src={RightSide} alt="Illustration" className="w-full mb-15" />
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default RegisterPage;
