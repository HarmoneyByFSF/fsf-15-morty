import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../db";

function IncomeShow() {
  const [id, setId] = useState(useParams().id);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [otherExpenseDetail, setOtherExpenseDetail] = useState("");
  const [userId, setUserId] = useState("");

  const [actualIncome, setActualIncome] = useState("");

  async function getIncomeById(id) {
    const income = await db.income.get(parseInt(id));

    setActualIncome(income);
    setCategory(income.category);
    setAmount(income.amount);
    setDate(income.date);
    setDescription(income.description);
    setOtherExpenseDetail(income.otherExpenseDetail);
    setUserId(income.userId);
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    getIncomeById(id);
  }, [id]);

  return (
    <div>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">Show Income</h2>
        <div className="card">
          <div className="card-header">
            <Link className="btn btn-outline-info float-right" to="/income">
              {" "}
              View All Incomes
            </Link>
          </div>
          <div className="card-body">
            <b className="text-muted">Category:</b>
            <p>{category}</p>
            <b className="text-muted">Amount(Rs):</b>
            <p>{amount}</p>
            <b className="text-muted">Date:</b>
            <p>{formatDate(date)}</p>
            <b className="text-muted">Description:</b>
            <p>{description}</p>
            <b className="text-muted">Other Expense Detail:</b>
            <p>{otherExpenseDetail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeShow;
