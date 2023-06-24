import React, { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { CATEGORY } from "../../categoryList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditExpense = () => {
  const [id, setId] = useState(useParams().id);
  const [currentExpense, setCurrentExpense] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [otherExpenseDetail, setOtherExpenseDetail] = useState("");
  const [userId, setUserId] = useState("");

  const [actualExpense, setActualExpense] = useState("");

  const navigate = useNavigate();

  const categories = CATEGORY;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  async function getExpenseById(id) {
    const expense = await db.expense.get(parseInt(id));

    setActualExpense(expense);
    setCategory(expense.category);
    setAmount(expense.amount);
    setDate(expense.date);
    setDescription(expense.description);
    setOtherExpenseDetail(expense.otherExpenseDetail);
    setUserId(expense.userId);
  }

  async function saveExpense() {
    try {
      await db.expense.update(parseInt(id), {
        category: category,
        amount: amount,
        date: date,
        description: description,
        otherExpenseDetail: otherExpenseDetail,
        userId: userId,
      });

      Swal.fire("Expense Updated", " ", "success");

      navigate("/expense");
    } catch (error) {
      console.log(error);
      Swal.fire("Fail to save", "Fail to save", "error");
    }
  }

  useEffect(() => {
    getExpenseById(id);
  }, [id]);

  return (
    <div>
      <div className="container">
        <h2>Edit Expense</h2>

        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/expense">
              {" "}
              View All Expenses
            </Link>
          </div>

          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  className="form-select"
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category.id} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <DatePicker
                  className="form-control"
                  id="date"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy" // Customize the date format as per your needs
                  placeholderText="Select a date"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  type="textarea"
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="otherExpenseDetail">
                  Other Expense Detail:
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="otherExpenseDetail"
                  value={otherExpenseDetail}
                  onChange={(e) => setOtherExpenseDetail(e.target.value)}
                />
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
              <br></br>
              <button
                type="button"
                onClick={saveExpense}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
