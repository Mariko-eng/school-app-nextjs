"use client"

import { useFormState } from "react-dom";
import { SubmitButton } from "./_components/SubmitButton"
import { signin } from '@/actions/auth'
import { SignInFormState } from "@/lib/definitions";

const initialState : SignInFormState = { errors: undefined, message: undefined };

function SignInPage() {

  // const [state, formAction] = useFormState(signin, init);

  const [state, formAction] = useFormState(signin, undefined);


  return (
    <form action={formAction}>
      <div className='flex flex-col items-start mb-2 w-[300px]'>
        <label htmlFor="name">Username</label>
        <input id="username" name="username" placeholder="Username"
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        />
      </div>
      {state?.errors?.username && <p className="text-red-500">{state.errors.username}</p>}

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
              <li className="text-red-500" key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}

      <SubmitButton />
    </form>
  )
}

export default SignInPage