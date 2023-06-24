import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import { db } from '../../db';


function ExpenseShow() {
    const [id, setId] = useState(useParams().id)
    const [actualExpense,setActualExpense] = useState('');

    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [otherExpenseDetail, setOtherExpenseDetail] = useState("");
    const [userId, setUserId] = useState("");
    
    
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

      const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      };


      useEffect(() => {
        getExpenseById(id);
      }, [id]);

    return (
        <div>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show Expense</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/expense"> View All Expenses
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

export default ExpenseShow;
