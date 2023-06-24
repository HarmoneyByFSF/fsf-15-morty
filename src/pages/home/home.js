import React, { useState } from "react";
import { Carousel } from 'react-bootstrap';
import videoSource1 from '../../video/video1.mp4';
import videoSource2 from '../../video/video2.mp4';
import videoSource3 from '../../video/video3.mp4';
import moneyTalk from '../../images/MoneyTalk.png';
import Card from 'react-bootstrap/Card';
import Budget from '../../images/budget.png';
import Credit from '../../images/credit.webp';
import Planning from '../../images/planning.png';
import Decision from '../../images/decision.avif';
import './home.css';
import { useNavigate } from "react-router";

const Home = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const navigate = useNavigate();

    const navigateToGame = () => {
        navigate('/gamepage');
    }

    return (
        <>
            <div>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item interval={750}>
                        <video className="d-block w-100 carousel-video" autoPlay loop controls>
                            <source src={videoSource1} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Carousel.Item>
                    <Carousel.Item interval={750}>
                        <video className="d-block w-100 carousel-video" autoPlay loop controls>
                            <source src={videoSource2} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Carousel.Item>
                    <Carousel.Item interval={250}>
                        <video className="d-block w-100 carousel-video" autoPlay loop controls>
                            <source src={videoSource3} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div>
            <div className="px-3 py-1 my-3 text-center">
                    <img className="d-block mx-auto mb-4 moneyTalk" src={moneyTalk} alt="" width="150" height="125" style={{ borderRadius: '10px' }} />
                    <h1 className="display-5 fw-bold text-body-emphasis">Financial Literacy Game</h1>
                    <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Create a monthly budget plan to track your expenses and savings.</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button onClick={navigateToGame} type="button" className="btn btn-primary btn-lg px-4 gap-3" width="250" style={{ fontFamily: 'Courier New' }} >Play Game</button>
                    </div>
                </div>
                </div>
            </div>
            <div className="card-container row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <div className="card" >
                        <img src={Budget}  className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Understanding Personal Budgeting</h5>
                            <p className="card-text">
                            Financial literacy involves having a solid understanding of personal budgeting. 
                        This includes being able to create and stick to a budget, track income and expenses, 
                        and make informed decisions about saving and spending money. 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img src={Credit} height="350" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Building and Maintaining Credit</h5>
                            <p className="card-text">
                            Credit plays a crucial role in financial matters, such as obtaining loans, 
                            renting an apartment, or even getting a job. Financial literacy includes understanding how credit works, 
                            establishing good credit habits, and managing debt responsibly. 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img src={Planning} height="350"  className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Planning for the Future</h5>
                            <p className="card-text">
                            Financial literacy encompasses planning for the future and setting long-term financial goals. 
                            It involves understanding concepts like retirement savings, investment strategies, and risk management. 
                            By planning for the future, individuals can secure their financial well-being and work towards achieving 
                            financial independence and stability.

                            </p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <img src={Decision}  height="350" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Making Informed Financial Decisions</h5>
                            <p className="card-text">
                            Financial literacy empowers individuals to make informed financial decisions. 
                            It involves understanding concepts such as interest rates, loans, credit scores, and investments. 
                            With this knowledge, individuals can evaluate different options, compare financial products, and
                             choose the best course of action that aligns with their goals and circumstances.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Card className="quote">
                <Card.Header>Quote</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            Financial illiteracy is like a disease that cripples individuals and communities,
                            while financial literacy is the antidote that empowers and transforms lives.{' '}
                        </p>
                        <footer className="blockquote-footer">
                            Someone famous in <cite title="Source Title">Mauritius</cite>
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </>


    );
}

export default Home;