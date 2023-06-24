import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { monthOptions } from "../../months";


const ExpenseList = () => {
  const expenses = useLiveQuery(() => db.expense.toArray());

  const [selectedMonth, setSelectedMonth] = useState("");

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleMonthSelection = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredExpenses = selectedMonth
    ? expenses.filter(
      (expense) =>
        new Date(expense.date).toLocaleString("default", { month: "long" }) ===
        selectedMonth
    )
    : expenses || [];

  const totalExpense = filteredExpenses
    ? filteredExpenses
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0)
      .toFixed(2)
    : 0;



  async function handleDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          db.expense.delete(parseInt(id));
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your expense has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your expense is safe :)",
            "error"
          );
        }
      });
  }

  return (
    <div>
      <div className="container">
        <div className="card">
        <h5 class="display-4 text-body-emphasis" style={{ fontSize: '2rem', textAlign: 'center'}}>New Expense</h5>
          <div className="card-header">
            <Link className="btn btn-outline-primary" to="/add-expense">
              Add New Expense
            </Link>
            <br></br>
            <label>Filter by Month:</label>
            <select
              className="form-select"
              value={selectedMonth}
              onChange={handleMonthSelection}
            >
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <table className="table table-responsive">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Amount(Rs)</th>
                <th scope="col">Date</th>
                <th scope="col">Details</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses &&
                filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.category}</td>
                    <td>{parseFloat(expense.amount).toFixed(2)}</td>
                    <td>{formatDate(expense.date)}</td>
                    <td>{expense.description}</td>
                    <td>
                      <Link
                        to={`/show-expense/${expense.id}`}
                        className="btn btn-outline-info mx-1"
                      >
                        Show
                      </Link>
                      <Link
                        className="btn btn-outline-success mx-1"
                        to={`/edit-expense/${expense.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="btn btn-outline-danger mx-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <th>Total Expense:</th>
              <th>{totalExpense}</th>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
