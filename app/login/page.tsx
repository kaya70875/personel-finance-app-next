'use client';

import Image from 'next/image';
import '../signup/_global.scss';
import logo from '@public/assets/images/logo-large.svg';
import SvgIcon from '@components/reusables/SvgIcon';

export default function page() {
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

                    <form className='auth-form'>
                        <div className="form-input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input className='modal-input-item' type="text" id='email' />
                        </div>

                        <div className="form-input-wrapper">
                            <label htmlFor="pass">Create Password</label>
                            <div className="password-input-wrapper">
                                <input className='modal-input-item' type="text" id='pass' />
                                <SvgIcon path='show-password' />
                            </div>
                        </div>

                        <button className="add-button">Login</button>

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