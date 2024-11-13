'use client';

import './_global.scss';
import Image from 'next/image';
import logo from '@public/assets/images/logo-large.svg';
import SvgIcon from '@components/reusables/SvgIcon';
import { useEffect, useReducer, useState } from 'react';
import { useAuthActions } from '@hooks/useAuthActions';
import { useRouter } from 'next/navigation';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)[A-Za-z\d]{8,}$/;

const initialState = {
    name: '',
    email: '',
    password: '',
    validEmail: false,
    validatePassword: false,
    error: '',
    loading: false,
};

const enum REDUCER_ACTION_TYPE {
    SET_NAME,
    SET_EMAIL,
    SET_PASSWORD,
    SET_VALID_EMAIL,
    SET_VALID_PASSWORD,
    SET_ERROR,
    SET_LOADING,
}

type ReducerAction =
    | {
        type: REDUCER_ACTION_TYPE.SET_NAME,
        payload: string,
    }
    | {
        type: REDUCER_ACTION_TYPE.SET_EMAIL,
        payload: string,
    }
    | {
        type: REDUCER_ACTION_TYPE.SET_PASSWORD,
        payload: string,
    }
    | {
        type: REDUCER_ACTION_TYPE.SET_VALID_EMAIL,
        payload: boolean,
    }
    | {
        type: REDUCER_ACTION_TYPE.SET_VALID_PASSWORD,
        payload: boolean,
    }
    | {
        type: REDUCER_ACTION_TYPE.SET_ERROR,
        payload: string,
    }
    | {
        type: REDUCER_ACTION_TYPE.SET_LOADING,
        payload: boolean,
    }

const reducer = (state: typeof initialState, action: ReducerAction): typeof initialState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.SET_NAME:
            return { ...state, name: action.payload };
        case REDUCER_ACTION_TYPE.SET_EMAIL:
            return { ...state, email: action.payload, error: '' };
        case REDUCER_ACTION_TYPE.SET_PASSWORD:
            return { ...state, password: action.payload, error: '' };
        case REDUCER_ACTION_TYPE.SET_VALID_EMAIL:
            return { ...state, validEmail: action.payload };
        case REDUCER_ACTION_TYPE.SET_VALID_PASSWORD:
            return { ...state, validatePassword: action.payload };
        case REDUCER_ACTION_TYPE.SET_ERROR:
            return { ...state, error: action.payload };
        case REDUCER_ACTION_TYPE.SET_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}

export default function page() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();

    const { handleSignUp } = useAuthActions();

    useEffect(() => {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_VALID_EMAIL, payload: emailRegex.test(state.email) });
    }, [state.email]);

    useEffect(() => {
        dispatch({ type: REDUCER_ACTION_TYPE.SET_VALID_PASSWORD, payload: passwordRegex.test(state.password) });
    }, [state.password]);

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!state.name || !state.email || !state.password) {
            return dispatch({ type: REDUCER_ACTION_TYPE.SET_ERROR, payload: 'Please fill all forms!' });
        }

        if (state.validEmail && state.validatePassword) {
            dispatch({ type: REDUCER_ACTION_TYPE.SET_LOADING, payload: true }); // Start Loading State.
            await handleSignUp({ name: state.name, email: state.email, password: state.password });
            dispatch({ type: REDUCER_ACTION_TYPE.SET_LOADING, payload: false });
            alert('account created redirecting...');
            router.push('/login');
        }


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
                            <input className='modal-input-item' type="text" id='name' onChange={(e) => dispatch({ type: REDUCER_ACTION_TYPE.SET_NAME, payload: e.target.value })} />
                        </div>

                        <div className="form-input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input className='modal-input-item' type="text" id='email' onChange={(e) => dispatch({ type: REDUCER_ACTION_TYPE.SET_EMAIL, payload: e.target.value })} />
                            {state.email && !state.validEmail && <div className='error-message'>Invalid Email</div>}
                        </div>

                        <div className="form-input-wrapper">
                            <label htmlFor="pass">Create Password</label>
                            <div className="password-input-wrapper">
                                <input className='modal-input-item' type="password" id='pass' onChange={(e) => dispatch({ type: REDUCER_ACTION_TYPE.SET_PASSWORD, payload: e.target.value })} />
                                <SvgIcon path='show-password' />
                            </div>
                            <p>Password must be at least 8 characters</p>
                            {state.password && !state.validatePassword && <div className='error-message'>Invalid Password</div>}
                        </div>

                        <button type='button' className="add-button" onClick={handleClick} disabled={state.loading}>{state.loading ? 'Loading...' : 'Sign Up'}</button>

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
