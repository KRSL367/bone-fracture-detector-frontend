import RegisterForm from '../components/RegisterForm';

const RegisterPage: React.FC = () => {
    const handleRegister = async (formData: { username: string; email: string; password: string; }) => {
        // Make an API call to register the user
        try {
            const response = await fetch('/api/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle successful registration (e.g., redirect to login page)
                console.log('User registered successfully');
            } else {
                // Handle registration errors
                console.error('Failed to register user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Register a new account
                    </h2>
                </div>
                <RegisterForm onSubmit={handleRegister} />
            </div>
        </div>
    );
};

export default RegisterPage;
