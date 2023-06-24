import React from 'react';
import loginPicture from '../../images/login.png'
import { useNavigate  } from "react-router-dom";
import './login.css';

const LoginForm = () => {

    const navigate = useNavigate();
    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="u-body u-xl-mode">
            <section className="u-align-center u-clearfix u-section-login" id="sec-05d1">
                <div className="u-clearfix u-sheet u-sheet-1">
                    <div className="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
                        <div className="u-layout">
                            <div className="u-layout-row">
                                <div className="u-align-center u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                                    <div className="u-container-layout u-valign-middle u-container-layout-1">
                                        <img className="u-image u-image-contain u-image-default u-image-1" src={loginPicture}
                                            alt="login" data-image-width="473" data-image-height="464" />
                                    </div>
                                </div>
                                <div className="u-align-center u-container-style u-layout-cell u-palette-1-base u-radius-50 u-shape-round u-size-30 u-layout-cell-2">
                                    <div className="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-container-layout-2">
                                        <>
                                            <div className="u-form padder u-login-control u-radius-50 u-white u-form-1">
                                                <form className="u-clearfix u-form-custom-backend u-form-spacing-29 u-form-vertical u-inner-form" name="form" style={{ padding: "30px" }}>
                                                    <div className="u-form-group u-form-name">
                                                        <label htmlFor="email" className="u-label">Email *</label>
                                                        <input
                                                            type="text" placeholder="Enter your Email"
                                                            id="email" name="email"
                                                            className="u-input u-input-rectangle u-input-2"
                                                            required=""
                                                        />
                                                    </div>
                                                    <div className="u-form-group u-form-name">
                                                        <label htmlFor="password" className="u-label">Password *</label>
                                                        <input
                                                            type="text" placeholder="Enter your Password"
                                                            id="password" name="password"
                                                            className="u-input u-input-rectangle u-input-2"
                                                            required=""
                                                        />
                                                    </div>
                                                    <div className="u-align-right u-form-group u-form-submit"
                                                        id='login-container'
                                                    >
                                                        <button href="#" className="u-border-none u-btn u-btn-submit u-button-style u-palette-3-base u-btn-2">Login</button>
                                                        <input type="submit" value="submit" className="u-form-control-hidden" />
                                                    </div>
                                                </form>
                                            </div>
                                            <button style={{ alignSelf: 'center' }} onClick={navigateToRegister} className="u-border-active-palette-2-base u-border-hover-palette-1-base u-border-none u-btn u-button-style u-login-control u-login-create-account u-none u-text-hover-white u-text-palette-3-base u-btn-4">
                                                Don't have an account?
                                            </button>
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LoginForm;