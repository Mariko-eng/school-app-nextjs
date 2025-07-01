"use client"

import { signup } from '@/actions/auth'
import { useFormState, useFormStatus } from "react-dom";

const page = () => {
    const [state, formAction] = useFormState(signup, undefined);

    return (
        <form action={formAction}>
            <div className='flex flex-col items-start mb-2 w-[300px]'>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" placeholder="Name"
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                />
            </div>
            {state?.errors?.name && <p>{state.errors.name}</p>}

            <div className='flex flex-col items-start mb-2'>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" placeholder="Email"
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div className='flex flex-col items-start mb-2'>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password"
                    className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"

                />
            </div>
            {state?.errors?.password && (
                <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <SubmitButton />
        </form>
    )
}

export default page


function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending ? true : false}
            className="bg-green-600 text-white font-semibold px-3 py-2 rounded-lg"
        >
            {pending ? (
                <span>
                    Submitting...
                </span>
            ) : (
                "Submit"
            )}
        </button>
    );
}