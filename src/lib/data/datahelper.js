import { liveQuery } from 'dexie';
import { db } from '../../db';

export const getAllIncomeByUser = async (email) => {
    return []
}

export const getCurrentMonthIncomeByUser = (allIncomes, email, month, year) => {
    const monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let monthlyIncomes = [];
    allIncomes.forEach((income)=> {
        let incomeDate = new Date(income.date);
        let incomeMonth = monthsArray[incomeDate.getMonth()];
        let incomeYear = incomeDate.getFullYear();
        if (incomeMonth == month && incomeYear == year) {
            monthlyIncomes.push(income);
        }
    })

    const groupedIncomes = monthlyIncomes.reduce((result, transaction)=> {
        const {amount, category} = transaction;
        if (!result[category]) {
            result[category] = 0;
        }
        result[category] += parseFloat(amount);
        return result;
    }, {});

    let labels = [];
    let values = [];
    //covert grouped incomes in to format for piechart
    Object.entries(groupedIncomes).forEach(groupedIncome => {
        labels.push(groupedIncome[0]);
        values.push(groupedIncome[1]);
    })


    return {
        labels: labels,
        datasets: [{
            label: labels,
            data: values,
            borderWidth: 1,
            backgroundColor: [
                '#001C30',
                '#176B87',
                '#64CCC5',
                '#DAFFFB',
                '#3AA6B9',
                '#C1ECE4'
            ]
        }]
    }
}

export const getAllExpensesByUser = async (email) => {
    return [];
}

export const getCurrentMonthExpensesByUser = (allExpenses, email, month, year) => {
    //get only the month concerned
    const monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let monthlyExpenses = [];
    allExpenses.forEach((expense)=> {
        let expenseDate = new Date(expense.date);
        let expenseMonth = monthsArray[expenseDate.getMonth()];
        let expenseYear = expenseDate.getFullYear();
        if (monthsArray[expenseDate.getMonth()] == month && expenseYear == year) {
            monthlyExpenses.push(expense);
        }
    })

    const groupedExpenses = monthlyExpenses.reduce((result, transaction)=> {
        const {amount, category} = transaction;
        if (!result[category]) {
            result[category] = 0;
        }
        result[category] += parseFloat(amount);
        return result;
    }, {});


    let labels = [];
    let values = [];
    //covert grouped expenses in to format for piechart
    Object.entries(groupedExpenses).forEach(groupedExpense => {
        labels.push(groupedExpense[0]);
        values.push(groupedExpense[1]);
    })


    return {
        labels: labels,
        datasets: [{
            label: labels,
            data: values,
            borderWidth: 1,
            backgroundColor: [
                '#001C30',
                '#176B87',
                '#64CCC5',
                '#DAFFFB',
                '#3AA6B9',
                '#C1ECE4'
            ]
        }]
    }
}




