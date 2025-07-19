import React, { useEffect, useRef } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FileText } from 'lucide-react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const popupRef = useRef<Window | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // useEffect for auth validation
  useEffect(() => {
    const isAuthenticated = !!Cookies.get('user.id') && !!Cookies.get('user.email');
    if (isAuthenticated) {
      navigate('/templates', { replace: true });
    }
  })

  // Cleanup function to clear polling interval
  const cleanupPolling = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  // Handle successful login
  const handleSuccessfulLogin = (userData: any) => {
    Cookies.set('user.id', userData.id, { secure: true });
    Cookies.set('user.email', userData.email, { secure: true });
    navigate('/templates');
  };

  // Listen for messages from the popup window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify the origin for security
      if (event.origin !== 'http://localhost:8080') {
        return;
      }

      if (event.data.type === 'LOGIN_SUCCESS') {
        handleSuccessfulLogin(event.data.user);
        if (popupRef.current) {
          popupRef.current.close();
        }
        cleanupPolling();
      } else if (event.data.type === 'LOGIN_ERROR') {
        console.error('Login failed:', event.data.error);
        if (popupRef.current) {
          popupRef.current.close();
        }
        cleanupPolling();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      cleanupPolling();
    };
  }, []);

  const googleLogin = () => {
    // Close any existing popup
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
    }

    // Open new popup
    popupRef.current = window.open(
      `${API_URL}/auth/google`, // Your backend OAuth URL
      'Google Login', // Window name
      'width=500,height=600,menubar=no,toolbar=no,location=no,status=no'
    );

    if (popupRef.current) {
      // Poll to check if popup is closed manually
      pollIntervalRef.current = setInterval(() => {
        if (popupRef.current && popupRef.current.closed) {
          console.log('Popup was closed manually');
          cleanupPolling();
        }
      }, 1000); // Check every second
    }
  };

  const githubLogin = () => {
    // Close any existing popup
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
    }

    // Open new popup
    popupRef.current = window.open(
      'http://localhost:8080/auth/github', // Your backend GitHub OAuth URL
      'GitHub Login', // Window name
      'width=500,height=600,menubar=no,toolbar=no,location=no,status=no'
    );

    if (popupRef.current) {
      // Poll to check if popup is closed manually
      pollIntervalRef.current = setInterval(() => {
        if (popupRef.current && popupRef.current.closed) {
          console.log('Popup was closed manually');
          cleanupPolling();
        }
      }, 1000); // Check every second
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        {/* Logo/Title */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg flex items-center justify-center mb-2">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in to ResumeForge</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back! Please login to your account.</p>
        </div>

        {/* Social Login Buttons */}
        <div className="flex w-full gap-4">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            onClick={googleLogin}
          >
            <FcGoogle className="text-xl" />
            Google
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            onClick={githubLogin}
          >
            <FaGithub className="text-xl" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;