// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import {Spinner} from "@heroui/spinner";
import { backendUrl } from '../config';
// import { registrationdata } from '../../../backend/controllers/db.controller';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const handleMobileNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Login logic would be implemented here

    try {
      const response = await authService.login({
        email: mobileNumber + '@dailyspend.com',
        password: password
      });
  
      console.log('Login with:', response);
      navigate('/home');
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Registration logic would be implemented here

   try {
    const response = await authService.createAccount({
       email: mobileNumber + '@dailyspend.com',
       password: password,
       name: username
     });
 
     const res = await fetch(`${backendUrl}/registrationdata`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         username: username,
         email: mobileNumber + '@dailyspend.com',
         password: password,
         appwrite_id: response.userId
       })
     });
 
     if (!res.ok) {
       const errorData = await res.json();
       console.error('Error registering user:', errorData);
       setIsLoading(false);
       return;
     }
     const responseData = await res.json();
     console.log('User registered:', responseData);
     // Assuming the registration was successful, navigate to home
 
     console.log('Register with:', response);
     navigate('/home');
     setIsLoading(false);
   } catch (error) {
    setError(error.message);
    setIsLoading(false);
   }
  };

  const getPasswordStrength = () => {
    if (!password) return '';
    if (password.length < 6) return 'Weak';
    if (password.length < 10) return 'Medium';
    return 'Strong';
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength === 'Weak') return 'bg-red-500';
    if (strength === 'Medium') return 'bg-yellow-500';
    if (strength === 'Strong') return 'bg-green-500';
    return '';
  };

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
        try {
            const user = await authService.getCurrentUser();
            if (user) {
                navigate('/home');
                console.log('user', user);
            }
        } catch (error) {
          setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };
    
    checkUser();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
  <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
    <p className="text-gray-700 text-lg">Loading...</p>
  </div>
</div>
    );
  }

  const ErrorPopup = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-red-600">Error</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <p className="text-gray-700 mb-4">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {error && (
      <ErrorPopup 
        message={error}
        onClose={() => setError(null)}
      />
    )}
      {/* Nav Bar */}
      <div className="fixed top-0 w-full bg-white shadow-md z-10 px-4 py-3 flex items-center justify-center">
        <h1 className="text-xl font-semibold text-blue-600">DailySpend</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 mt-14 mb-16 px-4 py-6 max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to DailySpend!</h2>
          <p className="text-gray-600">Track your family expenses with ease</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-center rounded-lg transition-all duration-300 ${
              activeTab === 'login'
                ? 'bg-blue-600 text-white font-medium shadow-md'
                : 'text-gray-600'
            } cursor-pointer !rounded-button`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 text-center rounded-lg transition-all duration-300 ${
              activeTab === 'register'
                ? 'bg-blue-600 text-white font-medium shadow-md'
                : 'text-gray-600'
            } cursor-pointer !rounded-button`}
          >
            Register
          </button>
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Spinner classNames={{label: "text-foreground mt-4"}} variant="wave" color="primary" size="md" label="Processing..." />
          </div>
        )}

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="login-mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fas fa-mobile-alt text-gray-400"></i>
                </div>
                <input
                  id="login-mobile"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  className="block w-full pl-10 pr-3 py-3 border-gray-300 bg-white rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter 10 digit mobile number"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border-gray-300 bg-white rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer !rounded-button"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md cursor-pointer !rounded-button"
            >
              Login
            </button>

            <div className="text-center mt-4">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                Forgot Password?
              </a>
            </div>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="register-mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fas fa-mobile-alt text-gray-400"></i>
                </div>
                <input
                  id="register-mobile"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  className="block w-full pl-10 pr-3 py-3 border-gray-300 bg-white rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter 10 digit mobile number"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-gray-300 bg-white rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter a nickname or short name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border-gray-300 bg-white rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer !rounded-button"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                </button>
              </div>
              {password && (
                <div className="mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`}
                      style={{ width: `${Math.min(100, (password.length / 12) * 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password strength: {getPasswordStrength()}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border-gray-300 bg-white rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={handleConfirmPasswordToggle}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer !rounded-button"
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md cursor-pointer !rounded-button"
            >
              Register
            </button>
          </form>
        )}
      </div>

      {/* Tab Bar */}
      {/* <div className="fixed bottom-0 w-full bg-white shadow-lg border-t border-gray-200 grid grid-cols-4 py-2">
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <i className="fas fa-home text-blue-600"></i>
          <span className="text-xs mt-1 text-gray-600">Home</span>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <i className="fas fa-chart-pie text-gray-400"></i>
          <span className="text-xs mt-1 text-gray-600">Reports</span>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <i className="fas fa-plus-circle text-gray-400"></i>
          <span className="text-xs mt-1 text-gray-600">Add</span>
        </div>
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <i className="fas fa-user text-gray-400"></i>
          <span className="text-xs mt-1 text-gray-600">Profile</span>
        </div>
      </div> */}
    </div>
  );
};

export default Auth;
