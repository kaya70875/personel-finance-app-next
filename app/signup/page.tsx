import './_global.scss';
import Image from 'next/image';

import logo from '@public/assets/images/logo-large.svg';

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
                        <h2>Sign Up</h2>
                    </header>

                    <form className='auth-form'>
                        <div className="form-input-wrapper">
                            <label htmlFor="name">Name</label>
                            <input className='modal-input-item' type="text" id='name' />
                        </div>

                        <div className="form-input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input className='modal-input-item' type="text" id='email' />
                        </div>

                        <div className="form-input-wrapper">
                            <label htmlFor="pass">Create Password</label>
                            <input className='modal-input-item' type="text" id='pass' />
                        </div>

                    </form>
                </section>
            </div>

        </div>
    )
}
