import React, { useState } from 'react';
import Goal from '../../images/goal.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './goal.css';
import "../../components/styles/style.css";
import Swal from "sweetalert2";
import { db } from "../../db";
import { useNavigate, useParams, Link } from "react-router-dom";

const GoalForm = () => {
    const [goal, setGoal] = useState('');
    const [amount, setAmount] = useState('');
    const [goalDescription, setgoalDescription] = useState('');
    const defaultStartDate = new Date();
    defaultStartDate.setMonth(defaultStartDate.getMonth() + 3);
    const [startDate, setStartDate] = useState(defaultStartDate);

    const navigate = useNavigate();

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(goalDescription);
    //     console.log(goal);
    //     console.log(amount);
    //     console.log(startDate);
    // }
    async function saveGoal() {

        
        try {
            const id = await db.goal.add({
                goal,
                amount,
                goalDescription,
                startDate,
            });
      
            Swal.fire("New Goal Added", " ", "success");
      
            navigate("/goal");
          } catch (error) {
            console.log(error);
            Swal.fire("Fail to save Goal", "Fail to save Goal", "error");
          }

    }

    // const handleGoalChange = (e) => {
    //     setGoal(e.target.value);
    //     updateStartDate(e.target.value);
    // };
    const handleGoalChange = (e) => {
        const selectedGoal = e.target.value;
        updateStartDate(selectedGoal);
        setGoal(selectedGoal);
      };

    const updateStartDate = (selectedGoal) => {
        const currentDate = new Date();
        let updatedDate = new Date();

        if (selectedGoal === 'Short Term Goal (3 Years)') {
            updatedDate.setMonth(currentDate.getMonth() + 36);
        } else if (selectedGoal === 'Medium Term Goal (7 Years)') {
            updatedDate.setMonth(currentDate.getMonth() + 84);
        } else if (selectedGoal === 'Long Term Goal (10 Years)') {
            updatedDate.setFullYear(currentDate.getFullYear() + 120);
        }

        setStartDate(updatedDate);
    };

    return (
        <body className="u-body u-xl-mode" data-lang="en">
            <section className="u-clearfix u-grey-5 u-section-goal" id="carousel_aeb4">
                <div className="u-clearfix u-sheet u-sheet-1">
                    <h1 className="u-text u-text-default u-text-palette-1-light-1 u-text-1">Set your Goal<br /></h1>
                    <div className="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
                        <div className="u-layout">
                            <div className="u-layout-row">
                                <div className="u-container-style u-grey-5 u-layout-cell u-right-cell u-size-31 u-layout-cell-1">
                                    <div className="u-container-layout u-valign-middle u-container-layout-1">
                                        <div className="u-expanded-width u-form u-form-1">
                                            <form className="u-clearfix u-form-spacing-19 u-form-vertical u-inner-form" name="form" style={{ padding: 0 }}>
                                                <div className="u-form-group u-form-select u-label-top u-form-group-1">
                                                    <label htmlFor="select" className="u-custom-font u-font-montserrat u-label">Goal Type</label>
                                                    <div className="u-form-select-wrapper">
                                                        <select id="select" value={goal} onChange={handleGoalChange} name="select" className="u-border-2 u-border-white u-input u-input-rectangle u-radius-12">
                                                            <option value="" selected="selected">Select a Financial Term Goal</option>
                                                            <option value="Short Term Goal (3 Years)">Short Term Goal (3 Years)</option>
                                                            <option value="Medium Term Goal (7 Years)" >Medium Term Goal (7 Years)</option>
                                                            <option value="Long Term Goal (10 Years)" >Long Term Goal (10 Years)</option>
                                                            <option value="CustomGoal" selected="selected">Custom Goal</option>
                                                        </select>
                                                        <svg className="u-caret u-caret-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" style={{ fill: 'currentColor' }} xmlSpace="preserve">
                                                            <polygon className="st0" points="8,12 2,4 14,4 " />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="u-form-email u-form-group u-label-top u-form-group-2">
                                                    <label htmlFor="amount" className="u-custom-font u-font-montserrat u-label">Amount</label>
                                                    <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" id="amount" name="amount" min={0} className="u-border-2 u-border-white u-input u-input-rectangle u-radius-12" required="" />
                                                </div>
                                                <div className="u-form-date u-form-group u-label-top u-form-group-3" >
                                                    <label htmlFor="date" className="u-custom-font u-font-montserrat u-label">Date (Optional)</label>
                                                    <br />
                                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} id="date" name="date" className="u-border-2 u-border-white u-input u-input-rectangle u-radius-12" />
                                                </div>
                                                <div className="u-form-group u-form-message u-label-top u-form-group-3">
                                                    <label htmlFor="message-daf4" className="u-custom-font u-font-montserrat u-label">Goal Description</label>
                                                    <textarea value={goalDescription} onChange={(e) => setgoalDescription(e.target.value)} placeholder="" rows="4" cols="50" id="message-daf4" name="message" className="u-border-2 u-border-white u-input u-input-rectangle u-radius-12" required=""></textarea>
                                                </div>
                                                <div className="u-align-right u-form-group u-form-submit u-label-top u-form-group-4">
                                                    <button className="u-active-grey-70 u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-grey-70 u-palette-4-base u-radius-12 u-btn-1" type="button" onClick={saveGoal}>Set your goal</button>
                                                    {/* <input type="button" onClick={saveGoal} value="submit" className="u-form-control-hidden" /> */}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="u-align-center u-container-style u-layout-cell u-left-cell u-size-29 u-layout-cell-2">
                                    <div className="u-container-layout u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-container-layout-2">
                                        <img className="u-image u-image-contain u-image-1" src={Goal} data-image-width="500" data-image-height="500" alt="rocket" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    );
}

export default GoalForm;
