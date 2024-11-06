'use client';

import './_global.scss';
import Image from 'next/image';

import logo from '@public/assets/images/logo-large.svg';
import SvgIcon from '@components/reusables/SvgIcon';
import { useState } from 'react';
import { useAuthActions } from '@hooks/useAuthActions';

export default function page() {

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { handleSignUp } = useAuthActions();

    const handleClick = () => {
        handleSignUp(form);
        alert('account created.');
    }

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
                        <h2>Sign Up</h2>
                    </header>

                    <form className='auth-form'>
                        <div className="form-input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input className='modal-input-item' type="text" id='name' onChange={(e) => setForm({ ...form, name: e.currentTarget.value })} />
                        </div>

                        <div className="form-input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input className='modal-input-item' type="text" id='email' onChange={(e) => setForm({ ...form, email: e.currentTarget.value })} />
                        </div>

                        <div className="form-input-wrapper">
                            <label htmlFor="pass">Create Password</label>
                            <div className="password-input-wrapper">
                                <input className='modal-input-item' type="text" id='pass' onChange={(e) => setForm({ ...form, password: e.currentTarget.value })} />
                                <SvgIcon path='show-password' />
                            </div>
                            <p>Password must be at least 8 characters</p>
                        </div>

                        <button className="add-button" onClick={(handleClick)}>Create Account</button>

                        <div className="have-account">
                            <p>Already have an account ?</p>
                            <a href="/login">Login</a>
                        </div>

                    </form>
                </section>
            </div>

        </div>
    )
}
