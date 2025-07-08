import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";


const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    {
      if (isLogin) {
        try {
            // Log pre-login cookies
            console.log("Cookies before login:", document.cookie);

            const response = await fetch(
                "https://view-verse.onrender.com/api/v1/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                    credentials: "include",
                }
            );

            // Log response headers to check for Set-Cookie
            console.log("Response headers:", Object.fromEntries(response.headers));
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Login failed:", errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Server response:", result);

            // Log cookies after login
            console.log("Cookies after login:", document.cookie);

            // Add a small delay before navigation to ensure logs are visible
            setTimeout(() => {
                navigate("/main");
            }, 1000);

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }
  }
    {
      if (!isLogin) {
        try {
          const response = await fetch(
            "https://view-verse.onrender.com/api/v1/users/register",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          const result = await response.json();
          console.log("Server response:", result);

          navigate("/main");
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  return (
    
    <div className="h-screen w-screen">
      <div className="min-h-screen relative flex items-center justify-center p-4 bg-black">
        <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-lg shadow-xl relative z-10 border border-white">
          <div className="text-center">
            <span className="flex items-center justify-center space-x-2 mb-4">
            <p className="text-[rgba(211,255,97,1)] text-3xl font-spaceMono">View</p>
            <p className="text-white text-3xl font-spaceMono">Verse</p>
            </span>
            <h2 className="text-lg text-white">
              {isLogin ? "Sign in to continue with ViewVerse" : "Create Account to continue with ViewVerse"}
            </h2>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* fullname */}
            {!isLogin && (
              <div className="transition-all duration-300 ease-in-out">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-white"
                >
                  Fullname
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* username  */}
            {!isLogin && (
              <div className="transition-all duration-300 ease-in-out">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* email */}
            <div className="transition-all duration-300 ease-in-out">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* password */}
            <div className="transition-all duration-300 ease-in-out">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-200" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-200" />
                  )}
                </button>
              </div>
            </div>

            {/* avatar */}
            {!isLogin && (
              <div className="transition-all duration-300 ease-in-out">
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-white"
                >
                  Avatar
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  value={formData.avatar}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* coverimage */}
            {!isLogin && (
              <div className="transition-all duration-300 ease-in-out">
                <label
                  htmlFor="coverimage"
                  className="block text-sm font-medium text-white"
                >
                  Cover Image
                </label>
                <input
                  id="coverimage"
                  name="coverimage"
                  type="file"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  value={formData.coverimage}
                  onChange={handleInputChange}
                />
              </div>
            )}

            {/* remember me */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
            )}

            {/* signin / create */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[rgba(211,255,97,1)] hover:bg-[#e7ffa9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isLogin ? "Sign in" : "Create Account"}
              </button>
            </div>
          </form>

          {/* Toggle between login and register */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[rgba(211,255,97,1)] hover:text-blue-300 transition-colors duration-200"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;