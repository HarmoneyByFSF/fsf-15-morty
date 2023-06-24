import React, { useState, useEffect } from "react";
import register from "../../images/register.png";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const navigateToLogin = () => {
        navigate("/login");
    };

    useEffect(() => {
        setErrors({});
    }, []);

    const validate = () => {
        const errors = {};
        // First Name validation
        if (!firstName) {
            errors.firstName = 'First Name is required';
        } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(firstName)) {
            errors.firstName = 'Please enter a valid first name';
        }

        // Last Name validation
        if (!lastName) {
            errors.lastName = 'Last Name is required';
        } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(lastName)) {
            errors.lastName = 'Please enter a valid last name';
        }

        // Email validation
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Please enter a valid email address (e.g. johndoe@example.com)';
        }
        setErrors(errors);
        return errors;
    };

    async function registerIndividual() {
        console.log('registerIndividual');   
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            registerIndividual();
        }
      }

    return (
        <div className="u-body u-xl-mode">
            <section
                className="u-align-center u-clearfix u-section-login"
                id="sec-05d1"
            >
                <div className="u-clearfix u-sheet u-sheet-1">
                    <div className="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
                        <div className="u-layout">
                            <div className="u-layout-row">
                                <div className="u-align-center u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                                    <div className="u-container-layout u-valign-middle u-container-layout-1">
                                        <img
                                            className="u-image u-image-contain u-image-default u-image-1"
                                            src={register}
                                            alt="login"
                                            data-image-width="473"
                                            data-image-height="464"
                                        />
                                    </div>
                                </div>
                                <div className="u-align-center u-container-style u-layout-cell u-palette-1-base u-radius-50 u-shape-round u-size-30 u-layout-cell-2">
                                    <div className="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-container-layout-2">
                                        <div className="u-form u-login-control u-radius-50 u-white u-form-1">
                                            <form
                                                className="u-clearfix u-form-custom-backend u-form-spacing-29 u-form-vertical u-inner-form"
                                                name="form"
                                                style={{ padding: "30px" }}
                                                onSubmit={handleSubmit}
                                            >
                                                <>
                                                    <div className="u-form-group u-form-name">
                                                        <label htmlFor="firstName" className="u-label">
                                                            First Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter your first name"
                                                            id="firstName"
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                            value={firstName}
                                                            className="u-input u-input-rectangle u-input-2"
                                                            required=""
                                                        />
                                                        {errors.firstName && <label className="u-label" style={{"color": "red"}}>{errors.firstName}</label>}

                                                    </div>
                                                    <div className="u-form-group u-form-name">
                                                        <label htmlFor="lastName" className="u-label">
                                                            Last Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter your last name"
                                                            id="lastName"
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            value={lastName}
                                                            className="u-input u-input-rectangle u-input-2"
                                                            required=""
                                                        />
                                                        {errors.lastName  && <label className="u-label" style={{"color": "red"}}>{errors.lastName }</label>}
                                                    </div>
                                                    <div className="u-form-group u-form-name">
                                                        <label htmlFor="email" className="u-label">
                                                            Email *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter your email"
                                                            id="email"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            value={email}
                                                            className="u-input u-input-rectangle u-input-2"
                                                            required=""
                                                        />
                                                        {errors.email && <label className="u-label" style={{"color": "red"}}>{errors.email}</label>}
                                                    </div>
                                                </>
                                                <div className="u-align-right u-form-group u-form-submit">
                                                    <button
                                                        href="#"
                                                        className="u-border u-btn u-btn-submit u-button-style u-palette-3-base u-btn-2"
                                                    >
                                                        Register
                                                    </button>
                                                    <input
                                                        type="submit"
                                                        value="submit"
                                                        className="u-form-control-hidden"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                        <button
                                            style={{ alignSelf: "center" }}
                                            onClick={navigateToLogin}
                                            className="u-border-active-palette-2-base u-border-hover-palette-1-base u-btn u-button-style u-login-control u-login-create-account u-none u-text-hover-white u-text-palette-3-base u-btn-4"
                                        >
                                            Have an account?
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterForm;
