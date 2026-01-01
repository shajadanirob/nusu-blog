/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import image from '@/assests/Login.jpg';
import { toast, Toaster } from 'sonner'
import { loginUser, registerUser } from '@/services/AuthService';
import { useRouter } from "next/navigation";
import { useUser } from '@/context/user.provider';
const Page = () => {
 const router = useRouter();
    const { setIsLoading: userLoading } = useUser();

    // login
    const handleLogin = async (event) => {
        const toastId = toast.loading('Logging in');
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        const userData = { email, password };

        try {
            await loginUser(userData);
            userLoading(true);
            toast.success('Login successful', { id: toastId, duration: 2000 });
            router.push('/dashboard');
        } catch (error) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }
    };
    return (
        <div>
            <div>
            <Toaster />
            <div className="w-80 md:w-96 lg:w-96 lg:my-40 mx-auto bg-white flex items-center relative overflow-hidden shadow-xl">
                {/* login form */}
                <form onSubmit={handleLogin} className="p-8 w-full">
                    <h1 className="backdrop-blur-sm text-2xl lg:text-4xl pb-4">Login</h1>
                    <div className="space-y-5">
                        <label htmlFor="_email" className="block">Email</label>
                        <input id="_email" name="email" type="email" placeholder="example@example.com" className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                        <label htmlFor="_password" className="block">Password</label>
                        <input id="_password" name="password" type="password" placeholder=".............." min={5} className="p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black" />
                    </div>
                    <button type="submit" className="py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block">Submit</button>
                </form>

                {/* img */}
                
            </div>
        </div>
        </div>
    );
};

export default Page;
