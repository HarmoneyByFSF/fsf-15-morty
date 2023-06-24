import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { monthOptions } from "../../months";
import './incomeList.css';

const IncomeList = () => {
  const incomes = useLiveQuery(() => db.income.toArray());

  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthSelection = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredIncomes = selectedMonth
    ? incomes.filter(
      (income) =>
        new Date(income.date).toLocaleString("default", { month: "long" }) ===
        selectedMonth
    )
    : incomes || [];

  const totalIncomeForMonth = filteredIncomes
    ? filteredIncomes
      .reduce((sum, income) => sum + parseFloat(income.amount), 0)
      .toFixed(2)
    : 0;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const totalIncome = incomes
    ? incomes
      .reduce((sum, income) => sum + parseFloat(income.amount), 0)
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
          db.income.delete(parseInt(id));
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your income has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your income is safe :)",
            "error"
          );
        }
      });
  }

  return (
    <div>
      <div className="container">
        <div className="card">
          <h5 class="display-4 text-body-emphasis" style={{ fontSize: '2rem', textAlign: 'center'}}>New Income</h5>
          <div className="card-header">
            <Link className="btn btn-primary" to="/add-income">
              Add Income
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
              {filteredIncomes &&
                filteredIncomes.map((income) => (
                  <tr key={income.id}>
                    <td>{income.category}</td>
                    <td>{parseFloat(income.amount).toFixed(2)}</td>
                    <td>{formatDate(income.date)}</td>
                    <td>{income.description}</td>
                    <td>
                      <Link
                        to={`/show-income/${income.id}`}
                        className="btn btn-outline-info mx-1"
                      >
                        Show
                      </Link>
                      <Link
                        className="btn btn-outline-success mx-1"
                        to={`/edit-income/${income.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(income.id)}
                        className="btn btn-outline-danger mx-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Total Income:</th>
                <th>{totalIncomeForMonth}</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncomeList;
