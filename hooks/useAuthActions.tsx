interface Form {
    name: string;
    email: string;
    password: string;
}

export const useAuthActions = () => {

    const handleSignUp = async (form: Form) => {
        try {
            const response = await fetch('/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return { handleSignUp }
}
