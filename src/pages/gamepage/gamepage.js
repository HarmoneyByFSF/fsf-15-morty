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
import './gamepage.css';
import LineChart from "../../components/dashboard/linechart/LineChart";
import InvestmentPhoto from '../../images/investment.png';
import RetirementPhoto from '../../images/Retirement.png';
import SmallbusinessPhoto from '../../images/smallBusiness.png';
import YouthPhoto from '../../images/Youth.png';
import YouthJson from './youth.json';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";

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

const GamePage = () => {
    const monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const allExpenses = useLiveQuery(async ()=>{
        
        let allExpenses = await db.expenseGame.toArray();
        let monthlyExpenses = getCurrentMonthExpensesByUser(allExpenses, '', 'June', 2023);
        console.log(monthlyExpenses);
        let total = monthlyExpenses.datasets[0].data.reduce((a, b) => a + b, 0);
        setMonthlyExpensesDataCategorized(monthlyExpenses);
        setLoadingMonthlyExpense(false);
        setTotalExpenseAmount(total);
        return allExpenses;
    })

    const allIncomes = useLiveQuery(async ()=>{
        let allIncomes = await db.incomeGame.toArray();
        let monthlyIncomes = getCurrentMonthIncomeByUser(allIncomes, '', 'June', 2023);
        let total = monthlyIncomes.datasets[0].data.reduce((a, b)=>a+b, 0);
        setMonthlyIncomeDataCategorized(monthlyIncomes);
        setLoadingMonthlyIncome(false);
        setTotalIncomeAmount(total);
        return allIncomes;
    })

    const allBudgets = useLiveQuery(async () => {
        let allExpenses = await db.expense.toArray();
        let allIncomes = await db.income.toArray();

        const groupedExpenses = allExpenses.reduce((result, transaction)=> {
            const {amount, category, date} = transaction;
            const expenseMonth = monthsArray[date.getMonth()];
            const expenseYear = date.getFullYear();
            if (!result[`${expenseMonth} ${expenseYear}`]) {
                result[`${expenseMonth} ${expenseYear}`] = 0;
            }
            result[`${expenseMonth} ${expenseYear}`] += parseFloat(amount);
            return result;
        }, {});

        const groupedIncomes = allIncomes.reduce((result, transaction)=> {
            const {amount, category, date} = transaction;
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
    const [ExpStAmount,setExpStAmount] = useState('');
    const[shortTermGoalAmt,setShortTermGoalAmt] = useState('');
    const[shortTermGoalAmtPercentage,setShortTermGoalAmtPercentage] = useState('');

    const [ExpMtAmount,setExpMtAmount] = useState('');
    const[mediumTermGoalAmt,setmediumTermGoalAmt] = useState('');
    const[mediumTermGoalAmtPercentage,setmediumTermGoalAmtPercentage] = useState('');

    const [ExpLtAmount,setExpLtAmount] = useState('');
    const[longTermGoalAmt,setLongTermGoalAmt] = useState('');
    const[longTermGoalAmtPercentage,setLongTermGoalAmtPercentage] = useState('');

    console.log(YouthJson);


    const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [otherExpenseDetail, setOtherExpenseDetail] = useState("");
  const [userId, setUserId] = useState("");
    
    const [showModal, setShowModal] = useState(false);
    const [selectedTopic,setSelectedTopic] = useState('');

    const openModal = (topic) => {
        setSelectedTopic(topic);
        setShowModal(true);
      };
      const handleClose = () => setShowModal(false);

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
            if (allExpenses)
            {
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
        if (allIncomes)
        {
            updateIncomePieChartMonth(); 
        }
        getExpensesByShortTerm();
    }, [currentMonthForIncome, currentYearForIncome])


    //sort all expenses and incomes by date added descending
    const allTransactions = useLiveQuery(async ()=>{
        let allExpenses = (await db.expenseGame.toArray()).map(expense=>{expense.type='Expense'; return expense});
        let allIncomes = (await db.incomeGame.toArray()).map(income=>{income.type='Income'; return income});;
        return allExpenses.concat(allIncomes).sort((a, b)=>b.date-a.date).slice(0, 8)
    })

   
    

    const [currentTopicJson, setCurrentTopicJson] = useState(YouthJson);
    const [currentScenario, setCurrentScenario] = useState({});
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);

    const [correctAnswer,setCorrectAnswer] = useState(currentScenario.correct);

    // const [wrongAnswerExplain,setWrongAnswerExplain] = useState(currentScenario.detail);
    

    useEffect(() => {
        if (currentScenario) {
          setCorrectAnswer(currentScenario.correct);
        }

        // if(currentScenario){
        //     setWrongAnswerExplain(currentScenario.answer2.detail);
        // }
          
      }, [currentScenario]);

      console.log(currentScenario);
      
    
      async function handleFormSubmitAnswer(type,scenario) {
        console.log(type);
        console.log(scenario);

        console.log(correctAnswer);
        // setCategory('Investment');
        // setAmount('60');
        // setDate('24/06/2023');
        // setDescription();
        

        if(type == correctAnswer){
            
            if (scenario == 'Scenario 1') {
                try {
                    const id = await db.incomeGame.add({
                        category: 'Investment',
                        amount: '60',
                        date: new Date(),
                        description: 'Investment From Game',
                        otherExpenseDetail,
                        userId,
                    });
                    Swal.fire("Good Answer", " ", "success");
                   console.log("Data save");
              
                    
                  } catch (error) {
                    console.log(error);
                    console.log("data not save");
                    
                  }
            } else if (scenario == 'Scenario 2') {
                try {
                    const id = await db.expenseGame.add({
                        category: 'Expenditure',
                        amount: '25',
                        date: new Date(),
                        description: 'A personalized photo album',
                        otherExpenseDetail,
                        userId,
                    });
                    Swal.fire("Good Answer", "A personalized photo album that costs $25 ", "success");
                   console.log("Data save");
              
                    
                  } catch (error) {
                    console.log(error);
                    console.log("data not save");
                    
                  }            }

           
        }else{

            if (scenario == 'Scenario 1') {
                Swal.fire("Wrong Answer", "Explanation - Save your money for the future and delay buying the video game", "error");
            } else if (scenario == 'Scenario 2') {
                Swal.fire("Wrong Answer", "Explanation - A personalized photo album that costs $25", "error");
            }
        }

      }



    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <Card>
                                <Card.Header as="h5">Monthly Expenses</Card.Header>
                                    <Form.Select onChange={(e)=>{setCurrentMonthForExpense(e.target.value); console.log(currentMonthForExpense)}} aria-label="Default select example">
                                    <option value="March">March</option>
                                    <option value="June">June</option>
                                    <option value="May">May</option>
                                    </Form.Select>
                                    <Form.Select onChange={(e)=>{setCurrentYearForExpense(parseInt(e.target.value)); console.log(currentYearForExpense)}} aria-label="Default select example">
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    </Form.Select>
                                <Card.Body>
                                {
                                    !loadingMonthlyExpense &&  <PieChart data={monthlyExpensesDataCategorized}/>
                                }
                                </Card.Body>
                                <Card.Footer>Total Expense: Rs{totalExpenseAmount}</Card.Footer>

                                </Card>
                    </Col>
                    <Col>
                        <Card>
                            <h1>Recent Transactions</h1>
                        <Accordion>
                            {
                                allTransactions && allTransactions.map((transaction, index) => {
                                    return (
                                        
                                        <Accordion.Item eventKey={index}>
                                            <Accordion.Header className={transaction.type == 'Income' ? 'incomelisting' : 'expenselisting'}>{transaction.category} - Rs {transaction.amount}</Accordion.Header>
                                            <Accordion.Body>
                                                <ul>
                                                    <li>Category: {transaction.category}</li>
                                                    <li>Amount: Rs {transaction.amount}</li>
                                                    <li>Description: {transaction.description}</li>
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })
                            }
                            </Accordion>
                        </Card>
                    </Col>
                    <Col>
                    
                    <Card>
                            <Card.Header as="h5">Monthly Income</Card.Header>
                                <Form.Select onChange={(e)=>{setCurrentMonthForIncome(e.target.value); console.log(currentMonthForIncome)}} aria-label="Default select example">
                                <option value="March">March</option>
                                <option value="June">June</option>
                                <option value="May">May</option>
                                </Form.Select>
                                <Form.Select onChange={(e)=>{setCurrentYearForIncome(parseInt(e.target.value)); console.log(currentYearForIncome)}} aria-label="Default select example">
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                </Form.Select>
                            <Card.Body>
                            {
                                !loadingMonthlyIncome &&  <PieChart data={monthlyIncomeDataCategorized}/>
                            }
                            </Card.Body>
                            <Card.Footer>Total Income: Rs{totalIncomeAmount}</Card.Footer>
                    </Card>

                </Col>
                </Row>
                {/* <>{JSON.stringify(currentScenario)}</> */}
                <Row><h1 style={{}}>Choose one of the topics below to start playing</h1></Row>
                <Row>
                    {/* <Col onClick={()=>{
                        setCurrentScenario(currentTopicJson[currentScenarioIndex]);
                        setCurrentScenarioIndex(currentScenarioIndex+1);
                    }}> */}
                    <Col onClick={() => {setCurrentScenario(currentTopicJson[currentScenarioIndex]);openModal("Investment")}}>
                    <img className="imgdimension" src={InvestmentPhoto}></img>
                    <br></br>
                    
                    </Col>
                    
                    <Col onClick={() => {setCurrentScenario(currentTopicJson[1]);openModal("Youth")}}>
                    <img className="imgdimension" src={YouthPhoto}></img>
                    </Col>
                    <Col onClick={() => {}}>
                    <img className="imgdimension" src={RetirementPhoto}></img>
                    </Col>
                    <Col onClick={() => openModal("Small Businesses")}>
                    <img className="imgdimension" src={SmallbusinessPhoto}></img>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div><a href="https://harmoney.mu/youth/">More Info...</a></div>
                    </Col>
                    <Col>
                    <a href="https://harmoney.mu/investments/">More Info...</a>
                    </Col>
                    <Col>
                    <a href="https://harmoney.mu/retirement-2/">More Info...</a>
                    </Col>
                    <Col>
                    <a href="https://harmoney.mu/adulthood/small-and-medium-enterprises/">More Info...</a>
                    </Col>
                </Row>
                {/* setCurrentScenario(currentTopicJson[3]);openModal("Retirement") */}

             
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTopic}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    {currentScenario && (
      <div>
        {currentScenario.Title} 
        <br></br>
        {currentScenario.Question}
        {/* {currentScenario.correct}
       
        1. {currentScenario.answer1 && currentScenario.answer1.detail}
        2. {currentScenario.answer2 && currentScenario.answer2.detail} */}
        <br></br>
        <br></br>
        {currentScenario.answer1 && (
        <button type="button" className="btn btn-info" onClick={() => handleFormSubmitAnswer("1",currentScenario.Title)}>
            Answer 1 - {currentScenario.answer1.detail}
        </button>
        )}
        <br></br>
        <br></br>
        {currentScenario.answer2 && (
        <button type="button" className="btn btn-info" onClick={() => handleFormSubmitAnswer("2",currentScenario.Title)}>
            Answer 2 - {currentScenario.answer2.detail}
        </button>
        )}
        
      </div>
    )}
  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(handleClose)}>
            Close
          </Button>
        
        </Modal.Footer>
          
        </Modal>
      
            </Container>
      </>


    );
}

export default GamePage;