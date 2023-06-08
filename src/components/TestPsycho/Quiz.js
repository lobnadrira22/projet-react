
import React, { Fragment, useEffect, useState } from 'react'

import "./Quiz.css"
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTimer } from 'react-timer-hook';


//la durée de test
function MyTimer({ expiryTimestamp }) {
    const {
        seconds,
        minutes,
        hours
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '30px' }}>
                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
        </div>
    );
}

//Le Test
function Quiz() {
    const [time, setTime] = useState(new Date())
    const [duree, setDuree] = useState(0);
    const [loading, setLoading] = useState([])
    const [result, setResult] = useState(false)
    const navigate = useNavigate();

    const [test, setTest] = useState({
        test: null,
        questions: [],
        index: 0
    })

    var selection = new Array()

    const { state } = useLocation();
    const id = localStorage.getItem('id');
    const niveauetude = localStorage.getItem('niveauetude');
    const next = () => {
        setTest({ ...test, index: test.index + 1 })
        setCurrentQuestion(currentQuestion + 1)
    }

    const previous = () => {
        setTest({ ...test, index: test.index - 1 })
        setCurrentQuestion(currentQuestion - 1)
    }

    const getResult = () => {
        setTest({ ...test, index: test.index - 1 })
        setResult(true)
    }

    const terminate = async () => {
        await axios.put(`/api/submit-score/${id}`, {
            score: score
        }).then(res => {
            navigate('/');
        })
            .catch(err => {
                console.log(err)
            })

    }
    const loadTest = async () => {
        setLoading(true)
        await axios.get(`/api/randomTest/${niveauetude}`)
            .then(async res => {
                setTime(time.setSeconds(time.getSeconds() + parseInt(res.data.test[0].duree)))
                setTest({ test: res.data.test[0], ...test })
                await axios.get(`/api/questions/${res.data.test[0]._id}`)
                    .then(async res => {
                        setTest({ ...test, questions: res.data.questions })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
        setLoading(false)
    }

    useEffect(() => {
        loadTest()
        console.log(niveauetude)
    }, [])


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answersArray, setAnswersArray] = useState([])


    return (
        <div>
            <Fragment>
         
                <title>
                    Quiz page
                </title>
            
                <div className='questions'>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <span>Question {currentQuestion + 1}/{test.questions.length}</span>
                        <h2 style={{ marginLeft: -65 }}>{result ? 'Résultat' : 'Quiz mode'}</h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <MyTimer expiryTimestamp={time} />
                            <img style={{ width: 30, height: 25, marginLeft: 5 }} src="../../dist/img/time.png" />
                        </div>
                    </div>

                    <hr />


                    {result ? (
                        <div className='score-section' style={{
                            alignSelf: 'center'
                        }}>
                            votre score {score} sur {test.questions.length} questions
                        </div>
                    ) : (
                        <>

                            <div className='questionsection' style={{ marginTop: 30 }}><h3>{test.questions[currentQuestion]?.question}</h3> </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 30,
                                marginBottom: 30,
                            }}>
                                {
                                    loading ?
                                        <center><p>loading...</p></center>
                                        :
                                        test.questions[test.index].réponses.map((rep, index) => {
                                            var arr = new Array()
                                            return (
                                              
                                                <a style={{
                                                    borderRadius: 40,
                                                    marginTop: 10,
                                                    paddingTop: 20,
                                                    paddingBottom: 20,
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    backgroundColor: answersArray[test.index] === rep._id ? '#00b894' : '#0984e3',
                                                    color: 'white',
                                                    fontSize: 18,
                                                    cursor: 'pointer'
                                                }} onClick={() => {
                                                    selection.push(rep._id)
                                                    if (answersArray[test.index] == null) {
                                                        if (rep.repcorrecte === "true")
                                                            setScore(score + parseInt(test.questions[test.index].points))
                                                        setAnswersArray(...answersArray.push(rep._id))
                                                    }
                                                    else if (rep.repcorrecte === "true" && answersArray[test.index] === rep._id) { }
                                                    else if (rep.repcorrecte !== "true" && answersArray[test.index] === rep._id) { }
                                                    else if (answersArray[test.index] !== rep._id) {
                                                        // alert("non choisi and rep correct")
                                                        if (rep.repcorrecte === "true")
                                                            setScore(score + parseInt(test.questions[test.index].points))
                                                        else
                                                            setScore(score - parseInt(test.questions[test.index].points))
                                                        arr = answersArray
                                                        arr[test.index] = rep._id
                                                        setAnswersArray(arr)
                                                    }

                                                }}>{rep.reptext}</a>
                                            )
                                        })
                                }
                            </div>
                        </>
                    )}
                    <div className='button-container' style={{ justifyContent: 'space-between' }}>
                        {
                            test.index === 0 ?
                                <div />
                                : <button onClick={previous}>Précédent</button>
                        }
                        {
                            (test.index === test.questions.length - 1) ?
                                <button onClick={getResult} style={{ backgroundColor: 'green' }}>Résultat</button>
                                : result === false ?
                                    <button onClick={next}>Suivant</button>
                                    :
                                    null
                        }
                        {result && (
                            <button onClick={terminate}>Terminer</button>
                        )}

                    </div>
                </div>
            </Fragment>
        </div>

    )
}

export default Quiz








