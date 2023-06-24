import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { CATEGORY } from "../../categoryList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate,Link } from "react-router-dom";
import './expense.css';

const Expense = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [otherExpenseDetail, setOtherExpenseDetail] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const categories = CATEGORY;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

   const handleSubmit = async (event) =>  {
    event.preventDefault();
    try {
      const id = await db.expense.add({
        category,
        amount,
        date,
        description,
        otherExpenseDetail,
        userId,
      });

      Swal.fire("New Expense Added", " ", "success");

      navigate("/expense");
    } catch (error) {
      console.log(error);
      Swal.fire("Fail to save", "Fail to save", "error");
    }
  }

  return (
    <div>
      <section className="u-align-center u-clearfix u-gradient u-section-expense" src="" id="sec-6a60">
      <div className="u-clearfix u-sheet u-sheet-1">
        <div className="u-clearfix u-layout-wrap u-layout-wrap-1">
          <div className="u-gutter-0 u-layout">
            <div className="u-layout-row">
              <div className="u-container-style u-image u-layout-cell u-shape-rectangle u-size-28 u-image-1" data-image-width="1000" data-image-height="979">
                <div className="u-container-layout u-valign-middle u-container-layout-1"></div>
              </div>
              <div className="u-align-center u-container-style u-layout-cell u-size-32 u-white u-layout-cell-2">
                <div className="u-container-layout u-container-layout-2">
                  <Link className="u-border-2 u-border-grey-75 u-btn u-button-style u-none u-btn-1" to="/expense">
                    View All Expenses
                  </Link>
                  <div className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-form u-form-1">
                    <form onSubmit={handleSubmit} className="u-clearfix u-form-spacing-15 u-form-vertical u-inner-form" style={{ padding: '0px' }} name="form">
                      <div className="u-form-group u-form-select u-label-none u-form-group-1">
                        <label htmlFor="select" className="u-label">Select a category</label>
                        <div className="u-form-select-wrapper">
                          <select  
                          value={category}
                                    onChange={handleCategoryChange}
                                     id="select" name="select" className="u-border-2 u-border-grey-10 u-grey-10 u-input u-input-rectangle u-input-1">
                                      <option value="">Select a category</option>
                            {categories &&
                              categories.map((category) => (
                                <option key={category.id} value={category.category}>
                                  {category.category}
                                </option>
                              ))}
                          </select>
                          <svg className="u-caret u-caret-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" style={{ fill: 'currentColor' }} xmlSpace="preserve">
                            <polygon className="st0" points="8,12 2,4 14,4 "></polygon>
                          </svg>
                        </div>
                      </div>
                      <div className="u-form-group u-form-name u-label-none u-form-group-2">
                        <input value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type="number" min={0} placeholder="Amount" id="amount" name="amount" className="u-border-2 u-border-grey-10 u-grey-10 u-input u-input-rectangle u-input-2" required="" />
                      </div>
                      <div className="u-form-group u-form-name u-label-none u-form-group-2">
                        <DatePicker selected={date}
                                    onChange={(date) => setDate(date)}
                                    placeholderText="Select a date"
                                    className="u-border-2 u-border-grey-10 u-grey-10 u-input u-input-rectangle u-input-2" required="" />
                      </div>
                      <div className="u-form-group u-form-textarea u-label-none u-form-group-3">
                        <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description" rows="2" cols="50" id="description" className="u-border-2 u-border-grey-10 u-grey-10 u-input u-input-rectangle u-input-3">

                        </textarea>
                      </div>
                      <div className="u-form-group u-form-textarea u-label-none u-form-group-3">
                        <textarea 
                        value={otherExpenseDetail}
                        onChange={(e) => setOtherExpenseDetail(e.target.value)}
                        placeholder="Other Expense Detail" rows="2" cols="50" id="otherExpenseDetail" className="u-border-2 u-border-grey-10 u-grey-10 u-input u-input-rectangle u-input-3">
                        </textarea>
                      </div>
                      <div className="form-group" style={{ display: "none" }}>
                        <label htmlFor="userId">User ID:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="userId"
                          value={userId}
                          onChange={(e) => setUserId(e.target.value)}
                        />
                      </div>
                      <div className="u-align-right u-form-group u-form-submit u-label-none u-form-group-4">
                        <button className="u-active-palette-1-base u-border-active-palette-2-light-2 u-border-hover-palette-2-light-2 u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-palette-1-dark-2 u-palette-1-light-1 u-radius-8 u-btn-2">ADD EXPENSE</button>
                        <input type="submit" value="submit" className="u-form-control-hidden" data-wfd-invisible="true" />
                      </div>
                    </form>
                  </div>
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

export default Expense;
