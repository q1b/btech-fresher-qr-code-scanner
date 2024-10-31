'use client'

import { useState } from "react";
import { validatePassword } from "./action";
import { LoadingSpinner } from "../loading-spinner";

export default function Login() {
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <div className="flex flex-col gap-y-4 items-start">
            {loading ? <LoadingSpinner /> : (
                <>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => setPassword(e.currentTarget.value)} value={password} id="password" name="password" type="password" autoComplete="current-password" required className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                    <button onClick={async () => {
                        setLoading(true);
                        await validatePassword(password);
                        setLoading(false);
                    }} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Login
                    </button>
                </>
            )}
        </div>
    )
}