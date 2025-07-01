

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='h-screen w-screen flex justify-center items-center p-4'>
            {children}
        </div>
    );
}
