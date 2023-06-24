import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../../../db';
import ReactDatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import './expense.css';

const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ExpenseReport = (props) => {



    const [currentDate, setCurrentDate] = useState(new Date());
    const [monthlyExpenses, setMonthlyExpense] = useState([]);
    const [monthlyExpensesCategorized, setMonthlyExpensesCategorized] = useState([]);
    const allExpenses = useLiveQuery(async () => {
        let allExpenses = await db.expense.toArray();
        filterExpensesByMonthYear(allExpenses, currentDate);

        return allExpenses;
    })

    const filterExpensesByMonthYear = (allExpenses, currentDate) => {
        console.log(currentDate);
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        console.log(currentMonth);
        console.log(currentYear);
        let monthlyExpenses = [];
        allExpenses.forEach(expense => {
            const expenseMonth = expense.date.getMonth();
            const expenseYear = expense.date.getFullYear();

            if (expenseMonth == currentMonth && expenseYear == currentYear) {
                monthlyExpenses.push(expense);
            }
        })

        const groupedExpenses = monthlyExpenses.reduce((result, transaction) => {
            const { amount, category } = transaction;
            if (!result[category]) {
                result[category] = 0;
            }
            result[category] += parseFloat(amount);
            return result;
        }, {});

        setMonthlyExpense(monthlyExpenses);
        setMonthlyExpensesCategorized(Object.entries(groupedExpenses));
    }



    useEffect(() => {
        if (allExpenses) {
            filterExpensesByMonthYear(allExpenses, currentDate);
        }

    }, [currentDate])

    return (
        <>
            <div class="px-4 my-5 text-center border-bottom">
                <h1 class="display-4 fw-bold text-body-emphasis">Expense Report</h1>
                <div class="col-lg-6 mx-auto">
                    <p class="lead fw-bold mb-4">View all your expense reports at a single glance</p>
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="inputPassword6" className="col-form-label">DATE</label>
                        </div>
                        <div className="col-auto">
                            <ReactDatePicker
                                selected={currentDate}
                                onChange={(date) => setCurrentDate(date)}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                showFullMonthYearPicker
                            />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Choose the month/year to view expense report for
                            </span>
                        </div>
                    </div>
                    <div class="expense-report-month">
                        <h1 class="table-title ">Expense Report for {monthsArray[currentDate.getMonth()]} - {currentDate.getFullYear()}</h1>
                        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        monthlyExpenses && monthlyExpenses.map((expense, index) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td> RS {expense.amount}</td>
                                                    <td>{expense.category}</td>
                                                    <td>{expense.description}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="expense-report-category">
                        <h1 class="table-title ">Categorized Expense Report for {monthsArray[currentDate.getMonth()]} - {currentDate.getFullYear()}</h1>
                        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        monthlyExpensesCategorized && monthlyExpensesCategorized.map((expense, index) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{expense[0]}</td>
                                                    <td>{expense[1]}</td>
                                                </tr>

                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExpenseReport;