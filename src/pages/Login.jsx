import React, { useState } from 'react';
import logo from '../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../slices/authSlice";
import makeRequestWithToken from '../helper/makeRequestWithToken';



function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setSubmitting(true); // Set submitting to true when form is being submitted

        // Email validation
        if (!isValidEmail(email)) {
            setError(true);
            setErrorMessage('Invalid Email');
            setSubmitting(false);
            return;
        }

        // Password validation
        if (password.length < 8) {
            setError(true);
            setErrorMessage('Passlength must be atleast 8 characters');
            setSubmitting(false);
            return;
        }

        // Form submission logic 
        try {
            let response = await makeRequestWithToken(
                "/user/login",
                'POST',
                { email, password } // Sending email and password data
            );
            const { token, data } = response.data; // Assuming your backend returns a JWT token
            dispatch(signIn({ token, data }));
            resetForm(); // Reset form fields
            setError(false);

            navigate('/', { replace: true });

        } catch (error) {
            console.error("Error:", error);
            if (error.response.status === 404 || error.response.status === 401) {
                setError(true);
                setErrorMessage('User does not exist or invalid credentials.'); // Set error message for user not found or invalid credentials
            } else {
                setError(true);
                setErrorMessage('An error occurred while processing your request.');
            }
        } finally {
            setSubmitting(false); // Reset submitting state regardless of success or failure
        }

    };

    const isValidEmail = (email) => {
        // Basic email validation regex
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <>


            <div className="flex flex-col justify-evenly items-center h-screen">

                <div className='flex flex-col items-center justify-center'>
                    <img src={logo} alt="logo" className='h-8 w-8' />
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-md m-2 rounded-xl bg-secondary text-md p-8">

                    <h1 className=' text-3xl text-white mb-8 px-2'>Login</h1>

                    <div className='my-8 px-2'>

                        <div className="my-4 ">
                            <input
                                type="email"
                                id="email"
                                placeholder='Email Address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block text-sm bg-secondary w-full px-2 py-4 text-gray-200 border-b border-gray-500 focus:outline-none focus:text-gray-500  "
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                id="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block text-sm bg-secondary w-full  px-2 py-4 text-gray-200 border-b border-gray-500 focus:outline-none   "
                            />
                        </div>

                    </div>

                    {error && <p className="text-red-500">{errorMessage}</p>}
                    <button type="submit" disabled={submitting} className="w-full px-2 py-3 mt-4 text-white bg-custom-red  rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-600">Sign In</button>
                    <div className='flex items-center justify-center mt-6'>
                        <h1 className=' text-white'>Don't have an account?</h1>
                        <a className='text-custom-red mx-2 cursor-pointer'>Sign Up</a>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignIn;