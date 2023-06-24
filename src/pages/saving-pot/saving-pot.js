import React from "react";
import Saving from '../../images/saving.gif';
import { ReactComponent as PlusSvg } from "../../images/plus-svgrepo-com.svg";
const SavingPot = () => {

    return (
        <div className="container my-5">
            <div className="p-1 text-center bg-body-tertiary rounded-3">
                <img className="bi mt-4 mb-1" src={Saving} alt="Bootstrap Icon" width="500" height="250" />
                <h1 className="text-body-emphasis" style={{ fontFamily: 'Courier New' }}>Saving Pot</h1>
                <p className="col-lg-8 mx-auto fs-5 text-muted">
                    <code> "Saving money is like planting a seed for your future. With each contribution, you nurture your financial well-being,
                        allowing your savings to grow and blossom into a bountiful pot of possibilities"</code>
                </p>
                <div className="d-inline-flex gap-2 mb-3">
                    <div className="input-group mb-0" style={{ width: '160px' }}>
                        <span className="input-group-text">Rs</span>
                        <input type="number" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
                    </div>
                </div>
                <br />
                <div className="d-inline-flex gap-2 mb-5">
                    <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button" style={{ backgroundColor: '#A1C2F1', fontFamily: 'Courier New', transition: 'background-color 0.3s' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#145e8e'} onMouseLeave={(e) => e.target.style.backgroundColor = '#0A6EBD'}>
                        SAVE
                    </button>

                    <button className="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button" style={{ fontFamily: 'Courier New' }}>
                        WITHDRAW
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SavingPot;