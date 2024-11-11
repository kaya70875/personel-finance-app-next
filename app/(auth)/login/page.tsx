'use client';

import Image from 'next/image';
import '../signup/_global.scss';
import logo from '@public/assets/images/logo-large.svg';
import SvgIcon from '@components/reusables/SvgIcon';
import { useEffect, useState } from 'react';
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [authResults , setAuthResults] = useState<SignInResponse | undefined>(undefined);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })

        setAuthResults(result);
    }

    useEffect(() => {
        if (authResults && !authResults?.error) {
            router.push('/');
        } else if(authResults?.error){
            alert('invalid credentials');
        }
    } , [authResults])

    return (
        <div className="auth-wrapper">
            <section className="auth-illustration">
                <header className="auth-illustration-header">
                    <Image src={logo} alt="logo" width={150}
                        height={70} />
                </header>

                <article className="auth-illustration-article">
                    <h2>Keep track of your money and save your future</h2>
                    <p>Personal finance app puts you in control of your spending. Track transactions , set budgets , and add to savings pots easily.</p>
                </article>
            </section>
            <div className="auth-form-wrapper">
                <section className="auth-form-section">
                    <header className="form-header">
                        <h2>Login</h2>
                    </header>

                    <form className='auth-form' onSubmit={handleSubmit}>
                        <div className="form-input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input className='modal-input-item' type="text" id='email' onChange={(e) => setEmail(e.currentTarget.value)} />
                        </div>

                        <div className="form-input-wrapper">
                            <label htmlFor="pass">Create Password</label>
                            <div className="password-input-wrapper">
                                <input className='modal-input-item' type="password" id='pass' onChange={(e) => setPassword(e.currentTarget.value)} />
                                <SvgIcon path='show-password' />
                            </div>
                        </div>

                        <button className="add-button" type='submit'>Login</button>

                        <div className="have-account">
                            <p>Need to create an account ?</p>
                            <a href="/signup">Sign Up</a>
                        </div>

                    </form>
                </section>
            </div>

        </div>
    )
}
