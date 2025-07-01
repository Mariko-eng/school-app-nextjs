'use server'

import { SigninFormSchema, SignInFormState,  } from "@/lib/definitions"
import { SignupFormSchema, SignUpFormState,  } from "@/lib/definitions"
import { ResetPasswordFormSchema,  } from "@/lib/definitions"
import { ResetPasswordConfirmFormSchema } from "@/lib/definitions"
import prisma from "@/lib/prisma"
import { createSession, deleteSession, getSession } from "@/lib/session"
import { redirect } from "next/navigation"

// It returns a SignInFormState object,
export async function signin(prevState: SignInFormState | undefined, formData: FormData): Promise<SignInFormState> {
// export async function signin(prevState: SignInFormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SigninFormSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        console.log({errors: validatedFields.error.flatten().fieldErrors, message : ""} )

        const err = { message : "" }

        return err
        // return {errors: validatedFields.error.flatten().fieldErrors, message : ""}
        // return {
        //     // errors: validatedFields.error.flatten().fieldErrors,
        //     // message: "Failed"
        // }
    }

    // Simulate an API call with a delay (you can replace this with actual API logic)
    // await new Promise((resolve) => setTimeout(resolve, 2000))  // Simulate 2 seconds delay

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // 2. Find the user by username
    const user = await prisma.user.findUnique({
        where: { username : username },
    });

    // 3. Check if the user exists and if the password matches
    if (!user) {
        console.log("User not found")
        return {
            message : "User not found!"
        };
        return { 
            errors: { username: ['Username not found'] },
            // message : "User not found!"
        };
    }

    // Current steps:
    // 4. Create user session
    await createSession("userrId", "123456", "6578298373")
    // 5. Redirect user
    console.log("heee 123");
    redirect('/admin')
}

export async function signup(prevState: SignUpFormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Simulate an API call with a delay (you can replace this with actual API logic)
    await new Promise((resolve) => setTimeout(resolve, 2000))  // Simulate 2 seconds delay

    // Call the provider or db to create a user...

    // Current steps:
    // 4. Create user session
    await createSession("userrId", "123456", "6578298373")
    // 5. Redirect user
    console.log("heee 123");
    redirect('/admin')
}

export async function logout() {
    deleteSession()
    redirect('/login')
  }

export const handleJWTRefresh = async () => {
    const session = getSession();

    // Simulate an API call with a delay (you can replace this with actual API logic)
    await new Promise((resolve) => setTimeout(resolve, 2000))  // Simulate 2 seconds delay

    return {
        message: "Success"
    }

};


export async function resetPassword(prevState: any, formData: FormData) {
    // Validate form fields
    const validatedFields = ResetPasswordFormSchema.safeParse({
        email: formData.get('email'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Simulate an API call with a delay (you can replace this with actual API logic)
    await new Promise((resolve) => setTimeout(resolve, 2000))  // Simulate 2 seconds delay

    return {
        message: "Success"
    }

    // Call the provider or db to create a user...
}


export async function resetPasswordConfirm(prevState: any, formData: FormData) {
    // Validate form fields
    const validatedFields = ResetPasswordConfirmFormSchema.safeParse({
        password1: formData.get('password1'),
        password2: formData.get('password2password2'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Simulate an API call with a delay (you can replace this with actual API logic)
    await new Promise((resolve) => setTimeout(resolve, 2000))  // Simulate 2 seconds delay

    return {
        message: "Success"
    }

    // Call the provider or db to create a user...
}