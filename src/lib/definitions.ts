import { z } from 'zod'

export const SigninFormSchema = z.object({
    username: z
        .string()
        .min(2, { message: 'Username must be at least 2 characters long.' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        // .regex(/[0-9]/, { message: 'Contain at least one number.' })
        // .regex(/[^a-zA-Z0-9]/, {
        //     message: 'Contain at least one special character.',
        // })
        .trim(),
})

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
    password2: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
}).refine((data) => data.password === data.password2, {
    message: "Passwords must match",
    path: ['password2'], // This will associate the error with the `password2` field
})

export const ResetPasswordFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
})

export const ResetPasswordConfirmFormSchema = z.object({
    password1: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
    password2: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
}).refine((data) => data.password1 === data.password2, {
    message: "Passwords must match",
    path: ['password2'], // This will associate the error with the `password2` field
})

export type SignInFormState = {
    errors? : {
        username?: string[]
        password?: string[]
    }
    message?: string};

export type SignInFormState2 =
    | {
        errors?: {
            username?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined;


export type SignUpFormState =
    | {
        errors?: {
            name?: string[]
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined;

export type ResetPasswordFormState =
    | {
        errors?: {
            email?: string[]
        }
        message?: string
    }
    | undefined;