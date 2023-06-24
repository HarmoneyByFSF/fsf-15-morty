import logo from './logo.svg';
import './App.css';
import LoginForm from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navbar/navbar';
import 'bootstrap/dist/css/bootstrap.css';
import RegisterForm from './pages/register/register';
import Home from './pages/home/home';
import GoalPage from './pages/goal/goal';
import { useEffect } from 'react';
import "../src/db";
import Category from './components/Category/category';
import Expense from './pages/expense/expensePage';
import ExpensePage from './pages/expense/expensePage';
import AddExpensePage from './pages/expense/addExpense';
import EditExpensePage from './pages/expense/editExpense';
import IncomeListPage from './pages/Income/IncomeListPage';
import AddIncomePage from './pages/Income/addIncomePage';
import EditIncomePage from './pages/Income/editIncomePage';

import ExpenseReport from './pages/report/expense/ExpenseReport';

import ShowExpense from './pages/expense/showExpense';
import ShowIncome from './pages/Income/showIncome';
import SavingPot from './pages/saving-pot/saving-pot';
import GamePage from './pages/gamepage/gamepage';
import ChatBotPage from './pages/chatbot/ChatBotPage';

function App() {

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/goal" element={<GoalPage />} />

        <Route path="/expense" element={<ExpensePage/>}/>
        <Route path="/add-expense" element={<AddExpensePage/>}/>
        <Route path="/edit-expense/:id?" element={<EditExpensePage/>}/>
        <Route path="/show-expense/:id?" element={<ShowExpense/>}/>

        <Route path="/income" element={<IncomeListPage/>}/>
        <Route path="/add-income" element={<AddIncomePage/>}/>
        <Route path="/edit-income/:id?" element={<EditIncomePage/>}/>
        <Route path="/show-income/:id?" element={<ShowIncome/>}/>

        <Route path="/reports/expense" element={<ExpenseReport />}/>
        <Route path="/saving-pot" element={<SavingPot/>}/>
        <Route path="/gamepage" element={<GamePage />} />
        <Route path="/chatbot" element={<ChatBotPage/>} />


      </Routes>
    </Router>

    
    
  );
}

export default App;
