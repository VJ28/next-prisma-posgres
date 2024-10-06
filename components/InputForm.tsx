import { useState } from "react";
import { Button } from "../components/Button";
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function InputForm(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="space-y-6">
        <div>
            <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
            >
            Email
            </label>
            <div className="relative mt-1">
            <input
                className="block w-full rounded-md border-gray-300 shadow-sm py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500"
                id="email"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            </div>
        </div>
        <div>
            <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
            >
            Password
            </label>
            <div className="relative mt-1">
            <input
                className="block w-full rounded-md border-gray-300 shadow-sm py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500"
                id="password"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
            />
            </div>
        </div>

        <Button onClick={(e) => props.onClick(email, password, e)}>
            {props.btnText} <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-50" />
        </Button>
        </div>

    )
}