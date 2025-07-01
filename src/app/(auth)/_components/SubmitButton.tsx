"use client"


import { useFormStatus } from "react-dom";


export function SubmitButton() {
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