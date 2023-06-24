import React, { useEffect } from "react";
import PieChart from "../../components/dashboard/piechart/PieChart";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { getCurrentMonthExpensesByUser, getCurrentMonthIncomeByUser } from "../../lib/data/datahelper";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { db } from '../../db';
import { useLiveQuery } from "dexie-react-hooks";
import './dashboard.css';
import LineChart from "../../components/dashboard/linechart/LineChart";
import CardPng from "../../images/card.png";
import Features from "../../images/features.png";
import Expenses from "../../images/expenses.png";
import Income from "../../images/income.png";
import { useNavigate } from "react-router";

function calculateDifference(obj1, obj2) {
    const difference = {};

    // Loop through the keys of obj1
    for (let key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            // Calculate the difference between the values of the corresponding keys
            difference[key] = obj2[key] - obj1[key];
        } else if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
            // Include keys that are present in obj1 but missing in obj2
            difference[key] = obj1[key];
        }
    }

    // Include keys that are present in obj2 but missing in obj1
    for (let key in obj2) {
        if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
            difference[key] = obj2[key];
        }
    }

    return difference;
}

const Dashboard = () => {
    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const allExpenses = useLiveQuery(async () => {

        let allExpenses = await db.expense.toArray();
        let monthlyExpenses = getCurrentMonthExpensesByUser(allExpenses, '', 'June', 2023);
        console.log(monthlyExpenses);
        let total = monthlyExpenses.datasets[0].data.reduce((a, b) => a + b, 0);
        setMonthlyExpensesDataCategorized(monthlyExpenses);
        setLoadingMonthlyExpense(false);
        setTotalExpenseAmount(total);
        return allExpenses;
    })

    const allIncomes = useLiveQuery(async () => {
        let allIncomes = await db.income.toArray();
        let monthlyIncomes = getCurrentMonthIncomeByUser(allIncomes, '', 'June', 2023);
        let total = monthlyIncomes.datasets[0].data.reduce((a, b) => a + b, 0);
        setMonthlyIncomeDataCategorized(monthlyIncomes);
        setLoadingMonthlyIncome(false);
        setTotalIncomeAmount(total);
        return allIncomes;
    })

    const allBudgets = useLiveQuery(async () => {
        let allExpenses = await db.expense.toArray();
        let allIncomes = await db.income.toArray();

        const groupedExpenses = allExpenses.reduce((result, transaction) => {
            const { amount, category, date } = transaction;
            const expenseMonth = monthsArray[date.getMonth()];
            const expenseYear = date.getFullYear();
            if (!result[`${expenseMonth} ${expenseYear}`]) {
                result[`${expenseMonth} ${expenseYear}`] = 0;
            }
            result[`${expenseMonth} ${expenseYear}`] += parseFloat(amount);
            return result;
        }, {});

        const groupedIncomes = allIncomes.reduce((result, transaction) => {
            const { amount, category, date } = transaction;
            const incomeMonth = monthsArray[date.getMonth()];
            const incomeYear = date.getFullYear();
            if (!result[`${incomeMonth} ${incomeYear}`]) {
                result[`${incomeMonth} ${incomeYear}`] = 0;
            }
            result[`${incomeMonth} ${incomeYear}`] += parseFloat(amount);
            return result;
        }, {});

        console.log(groupedExpenses);
        console.log(groupedIncomes)

        const budget = calculateDifference(groupedExpenses, groupedIncomes);
        setBudgetData(budget);
    });
    const [ExpStAmount, setExpStAmount] = useState('');
    const [shortTermGoalAmt, setShortTermGoalAmt] = useState('');
    const [shortTermGoalAmtPercentage, setShortTermGoalAmtPercentage] = useState('');

    const [ExpMtAmount, setExpMtAmount] = useState('');
    const [mediumTermGoalAmt, setmediumTermGoalAmt] = useState('');
    const [mediumTermGoalAmtPercentage, setmediumTermGoalAmtPercentage] = useState('');

    const [ExpLtAmount, setExpLtAmount] = useState('');
    const [longTermGoalAmt, setLongTermGoalAmt] = useState('');
    const [longTermGoalAmtPercentage, setLongTermGoalAmtPercentage] = useState('');

    const navigate = useNavigate('');

    async function getExpensesByShortTerm() {
        // Short Term Goal
        const ExpSt = await db.expense.where('category').equals('Short Term Goal (3 Years)').toArray();

        const totalAmount = ExpSt.reduce((accumulator, expense) => accumulator + parseInt(expense.amount), 0);

        const shortTermGoal = await db.goal.where('goal').equals('Short Term Goal (3 Years)').toArray();
        const shortTermGoalAmt = parseInt(shortTermGoal[0]?.amount);
        setShortTermGoalAmt(shortTermGoalAmt);

        const progressPercentage = (totalAmount / shortTermGoalAmt) * 100;
        setShortTermGoalAmtPercentage(progressPercentage);

        // Medium Term Goal
        const ExpMt = await db.expense.where('category').equals('Medium Term Goal (7 Years)').toArray();
        console.log(ExpMt);
        const totalAmountMt = ExpMt.reduce((accumulatorMt, expenseMt) => accumulatorMt + parseInt(expenseMt.amount), 0);

        const mediumTermGoal = await db.goal.where('goal').equals('Medium Term Goal (7 Years)').toArray();
        let mediumTermGoalAmt; // Use let instead of const
        if (mediumTermGoal.length > 0) {
            mediumTermGoalAmt = parseInt(mediumTermGoal[0].amount);
            setmediumTermGoalAmt(mediumTermGoalAmt);

            const progressPercentageMt = (totalAmountMt / mediumTermGoalAmt) * 100;
            console.log(progressPercentageMt);
            setmediumTermGoalAmtPercentage(progressPercentageMt);

        } else {
            // Handle the case when no matching record is found
            console.log("No medium-term goal found for 'Medium Term Goal (7 Years)'");
            mediumTermGoalAmt = 0;
        }

        // Long Term Goal
        const ExpLt = await db.expense.where('category').equals('Long Term Goal (10 Years)').toArray();
        console.log(ExpLt);
        const totalAmountLt = ExpLt.reduce((accumulatorLt, expenseLt) => accumulatorLt + parseInt(expenseLt.amount), 0);

        const longTermGoal = await db.goal.where('goal').equals('Long Term Goal (10 Years)').toArray();
        if (longTermGoal.length > 0) {
            const longTermGoalAmt = parseInt(longTermGoal[0].amount);
            setLongTermGoalAmt(longTermGoalAmt);

        } else {
            // Handle the case when no matching record is found
            console.log("No long-term goal found for 'Long Term Goal (10 Years)'");
        }


    }


    // States for monthly expenses
    const [monthlyExpensesDataCategorized, setMonthlyExpensesDataCategorized] = useState();
    const [currentMonthForExpense, setCurrentMonthForExpense] = useState("June");
    const [currentYearForExpense, setCurrentYearForExpense] = useState(2023);
    const [loadingMonthlyExpense, setLoadingMonthlyExpense] = useState(true);
    const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);

    //States for monthly incomes
    const [monthlyIncomeDataCategorized, setMonthlyIncomeDataCategorized] = useState();
    const [currentMonthForIncome, setCurrentMonthForIncome] = useState('June');
    const [currentYearForIncome, setCurrentYearForIncome] = useState(2023);
    const [loadingMonthlyIncome, setLoadingMonthlyIncome] = useState(true);
    const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);

    //States for budget data
    const [budgetData, setBudgetData] = useState([]);




    useEffect(() => {
        const updateExpensePieChartMonth = () => {
            let monthlyExpenses = getCurrentMonthExpensesByUser(allExpenses, '', currentMonthForExpense, currentYearForExpense);
            setMonthlyExpensesDataCategorized(monthlyExpenses);
            setLoadingMonthlyExpense(false);
            return allExpenses;
        }
        if (allExpenses) {
            updateExpensePieChartMonth();
        }

    }, [currentMonthForExpense, currentYearForExpense])

    useEffect(() => {
        const updateIncomePieChartMonth = () => {
            let monthlyIncomes = getCurrentMonthIncomeByUser(allIncomes, '', currentMonthForIncome, currentYearForIncome);
            setMonthlyIncomeDataCategorized(monthlyIncomes);
            setLoadingMonthlyIncome(false);
            return allIncomes;
        }
        if (allIncomes) {
            updateIncomePieChartMonth();
        }
        getExpensesByShortTerm();
    }, [currentMonthForIncome, currentYearForIncome])


    //sort all expenses and incomes by date added descending
    const allTransactions = useLiveQuery(async () => {
        let allExpenses = (await db.expense.toArray()).map(expense => { expense.type = 'Expense'; return expense });
        let allIncomes = (await db.income.toArray()).map(income => { income.type = 'Income'; return income });;
        return allExpenses.concat(allIncomes).sort((a, b) => b.date - a.date).slice(0, 8)
    })

    const navigateExpense = () => {
        navigate('/add-expense');
    }

    const navigateIncome = () => {
        navigate('/add-income');
    }

    const options = {
        plugins: {
          datalabels: {
            color: '#fff',
            formatter: (value, ctx) => {
              let sum = 0;
              let dataArr = ctx.chart.data.datasets[0].data;
              dataArr.map((data) => {
                sum += data;
              });
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
          },
        }
    };

    return (
        <div class="dashboard-main">
            <section className="u-align-center u-clearfix u-gradient u-section-dashboard" id="sec-c72f">
                <div className="u-clearfix u-sheet u-sheet-1">
                    <div className="u-clearfix u-expanded-width u-gutter-20 u-layout-wrap u-layout-wrap-1">
                        <div className="u-layout">
                            <div className="u-layout-col">
                                <div className="u-size-40">
                                    <div className="u-layout-row">
                                        <div className="u-size-33">
                                            <div className="u-layout-col">
                                                <div className="u-align-left u-container-style u-gradient u-layout-cell u-opacity u-opacity-70 u-radius-20 u-size-60 u-layout-cell-1">
                                                    <div className="u-container-layout u-container-layout-1">
                                                        <h3 className="u-custom-font u-font-pt-sans u-text u-text-palette-4-dark-2 u-text-1">DASHBOARD</h3>
                                                        <p className="u-text u-text-palette-4-dark-3 u-text-2">Track and manage your financial transactions with ease on the Dashboard.</p>
                                                        <img className="u-image u-image-contain u-image-round u-radius-10 u-image-1" src={CardPng} alt="" data-image-width="1280" data-image-height="865" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="u-size-27">
                                            <div className="u-layout-col">
                                                <div className="u-container-style u-layout-cell u-opacity u-opacity-70 u-palette-5-light-3 u-radius-20 u-size-60 u-layout-cell-2">
                                                    <div className="u-container-layout u-container-layout-2">
                                                        <span className="u-border-2 u-border-palette-1-base u-file-icon u-icon u-icon-circle u-icon-1"><img src={Features} alt="" /></span>
                                                        <h3 className="u-align-center u-custom-font u-font-pt-sans u-text u-text-palette-1-dark-1 u-text-3">Recent Transactions</h3>
                                                        <ul>
                                                            <Accordion>
                                                                {allTransactions &&
                                                                    allTransactions.map((transaction, index) => {
                                                                        const isIncome = transaction.type === 'Income';
                                                                        const headerClassName = isIncome ? 'incomeListing' : 'expenseListing';

                                                                        return (
                                                                            <Accordion.Item eventKey={index} key={index}>
                                                                                <Accordion.Header className={headerClassName}>
                                                                                    {transaction.category} - Rs {transaction.amount}
                                                                                </Accordion.Header>
                                                                                <Accordion.Body>
                                                                                    <ul>
                                                                                        <li>Category: {transaction.category}</li>
                                                                                        <li>Amount: Rs {transaction.amount}</li>
                                                                                        <li>Description: {transaction.description}</li>
                                                                                    </ul>
                                                                                </Accordion.Body>
                                                                            </Accordion.Item>
                                                                        );
                                                                    })}
                                                            </Accordion>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="u-size-20">
                                    <div className="u-layout-row">
                                        <div className="u-align-center u-container-style u-layout-cell u-opacity u-opacity-70 u-palette-2-light-2 u-radius-47 u-size-30 u-layout-cell-3">
                                            <div className="u-container-layout u-container-layout-3">
                                                <span className="u-file-icon u-icon u-icon-2"><img src={Expenses} alt="" /></span>
                                                <h3 className="u-custom-font u-font-pt-sans u-text u-text-palette-2-base u-text-5">&nbsp;Total Expenses</h3>
                                                <h3 className="u-text u-text-palette-2-dark-2 u-text-6">
                                                    <span style={{ fontWeight: 700 }}>Rs.</span> {totalExpenseAmount}<br />
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="u-align-center u-container-style u-layout-cell u-opacity u-opacity-70 u-palette-1-light-2 u-radius-47 u-shape-round u-size-30 u-layout-cell-4">
                                            <div className="u-container-layout u-container-layout-4">
                                                <span className="u-file-icon u-icon u-icon-3"><img src={Income} alt="" /></span>
                                                <h3 className="u-custom-font u-font-pt-sans u-text u-text-palette-1-base u-text-7">Total Income</h3>
                                                <h3 className="u-text u-text-palette-1-dark-2 u-text-8">
                                                    <span style={{ fontWeight: 700 }}>Rs.</span> {totalIncomeAmount}<br />
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="u-clearfix u-expanded-width u-gutter-44 u-layout-wrap u-layout-wrap-2">
                        <div className="u-layout">
                            <div className="u-layout-row">
                                <div className="u-container-style u-layout-cell u-palette-2-light-3 u-radius-47 u-shape-round u-size-30 u-layout-cell-5">
                                    <div className="u-container-layout u-container-layout-5">
                                        <div className="u-expanded-width u-form u-form-1">
                                            <form action="https://forms.nicepagesrv.com/v2/form/process" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="email" name="form" style={{ padding: '10px' }}>
                                                <input type="hidden" id="siteId" name="siteId" value="4595954" />
                                                <input type="hidden" id="pageId" name="pageId" value="5234750" />
                                                <div className="u-form-group u-form-select u-form-group-1">
                                                    <label htmlFor="select-26ba" className="u-label">Month</label>
                                                    <div className="u-form-select-wrapper">
                                                        <select onChange={(e) => { setCurrentMonthForExpense(e.target.value); console.log(currentMonthForExpense) }} id="select-26ba" name="select" className="u-input u-input-rectangle">
                                                            <option value="Jan">Jan</option>
                                                            <option value="Feb">February</option>
                                                            <option value="March" selected="selected">March</option>
                                                            <option value="April">April</option>
                                                            <option value="May">May</option>
                                                            <option value="June">June</option>
                                                            <option value="July">July</option>
                                                            <option value="August">August</option>
                                                            <option value="September">September</option>
                                                            <option value="October">October</option>
                                                            <option value="November">November</option>
                                                            <option value="December">December</option>
                                                        </select>
                                                        <svg className="u-caret u-caret-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" style={{ fill: 'currentColor' }} xmlSpace="preserve"><polygon className="st0" points="8,12 2,4 14,4 " /></svg>
                                                    </div>
                                                </div>
                                                <div className="u-form-group u-form-select u-form-group-2">
                                                    <label htmlFor="select-b8de" className="u-label">Year</label>
                                                    <div className="u-form-select-wrapper">
                                                        <select onChange={(e) => { setCurrentYearForExpense(parseInt(e.target.value)); console.log(currentYearForExpense) }} id="select-b8de" name="select-1" className="u-input u-input-rectangle">
                                                            <option value="2023" selected="selected">2023</option>
                                                            <option value="2024">2024</option>
                                                            <option value="2025">2025</option>
                                                        </select>
                                                        <svg className="u-caret u-caret-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" style={{ fill: 'currentColor' }} xmlSpace="preserve"><polygon className="st0" points="8,12 2,4 14,4 " /></svg>
                                                    </div>
                                                </div>
                                                <div class="pie-chart-container">
                                                    {
                                                        !loadingMonthlyExpense && <PieChart data={monthlyExpensesDataCategorized} />
                                                    }

                                                </div>

                                                <button onClick={navigateExpense} className="dashboard-btn u-active-palette-1-base u-border-active-palette-2-light-2 u-border-hover-palette-2-light-2 u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-palette-1-dark-2 u-palette-1-light-1 u-radius-8 u-btn-2">ADD EXPENSE</button>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="u-container-style u-layout-cell u-palette-1-light-3 u-radius-47 u-shape-round u-size-30 u-layout-cell-6">
                                    <div className="u-container-layout u-valign-top u-container-layout-6">
                                        <div className="u-form u-form-2">
                                            <form action="https://forms.nicepagesrv.com/v2/form/process" className="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="email" name="form" style={{ padding: '10px' }}>
                                                <input type="hidden" id="siteId" name="siteId" value="4595954" />
                                                <input type="hidden" id="pageId" name="pageId" value="5234750" />
                                                <div className="u-form-group u-form-select u-form-group-4">
                                                    <label htmlFor="select-26ba" className="u-label">Month</label>
                                                    <div className="u-form-select-wrapper">
                                                        <select onChange={(e) => { setCurrentMonthForIncome(e.target.value); console.log(currentMonthForIncome) }} id="select-26ba" name="select" className="u-input u-input-rectangle">
                                                        <option value="Jan">Jan</option>
                                                            <option value="Feb">February</option>
                                                            <option value="March" selected="selected">March</option>
                                                            <option value="April">April</option>
                                                            <option value="May">May</option>
                                                            <option value="June">June</option>
                                                            <option value="July">July</option>
                                                            <option value="August">August</option>
                                                            <option value="September">September</option>
                                                            <option value="October">October</option>
                                                            <option value="November">November</option>
                                                            <option value="December">December</option>
                                                        </select>
                                                        <svg className="u-caret u-caret-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" style={{ fill: 'currentColor' }} xmlSpace="preserve"><polygon className="st0" points="8,12 2,4 14,4 " /></svg>
                                                    </div>
                                                </div>
                                                <div className="u-form-group u-form-select u-form-group-5">
                                                    <label htmlFor="select-b8de" className="u-label">Year</label>
                                                    <div className="u-form-select-wrapper">
                                                        <select onChange={(e) => { setCurrentYearForIncome(parseInt(e.target.value)); console.log(currentYearForIncome) }} id="select-b8de" name="select-1" className="u-input u-input-rectangle">
                                                            <option value="2023" selected="selected">2023</option>
                                                            <option value="2024">2024</option>
                                                            <option value="2025">2025</option>
                                                        </select>
                                                        <svg className="u-caret u-caret-svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 16 16" style={{ fill: 'currentColor' }} xmlSpace="preserve"><polygon className="st0" points="8,12 2,4 14,4 " /></svg>
                                                    </div>
                                                </div>

                                                <div class="pie-chart-container">
                                                    {
                                                        !loadingMonthlyIncome && <PieChart data={monthlyIncomeDataCategorized}/>
                                                    }
                                                </div>
                                                <button onClick={navigateIncome} className="dashboard-btn u-active-palette-1-base u-border-active-palette-2-light-2 u-border-hover-palette-2-light-2 u-border-none u-btn u-btn-round u-btn-submit u-button-style u-hover-palette-1-dark-2 u-palette-1-light-1 u-radius-8 u-btn-2">ADD INCOME</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="u-align-center u-clearfix u-grey-15 u-section-dashboard-2" id="sec-992a">
                <div className="u-clearfix u-sheet u-sheet-1">
                    <h1 className="u-text u-text-default u-text-1">Budget Chart</h1>
                    <div className="u-text-2">
                        <LineChart budgetData={budgetData} />
                    </div>
                </div>
            </section>
        </div>


    );
}

export default Dashboard;