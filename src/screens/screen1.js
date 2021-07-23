import React, { useState, useEffect, Fragment } from "react";
import TopIco from "../assets/Frame.svg";
import ConnectIco from "../assets/Connect.svg";
import ProfilePic from "../assets/Ellipse 2236.png";
import LeftRock from "../assets/Left Rock.svg";
import LeftRockCloud from "../assets/cloud and rock.svg";
import GroupIco from "../assets/Group.png";
import Cloud from "../assets/Group (1).png";
import topLineIco from "../assets/Intersect.png";
import audio1 from "../assets/clcik1.mp3";
import audio2 from "../assets/clcik2.mp3";
import winAudio from '../assets/JKL83NH-video-game-win.mp3'
import "./screen1.scss";
import Modal from "../Modal";
import Web3 from "web3";
import Web3Modal from "./Web3Modal";
import { Checkbox, useModal } from "@geist-ui/react";
import {UseWalletProvider, useWallet} from 'use-wallet'
import { BscConnector } from '@binance-chain/bsc-connector'
import BigNumber from "bignumber.js";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {tokenAddress, contractAddress, tokenAbi, contractAbi, chainIdConf} from '../config'
import RealChart from "./RealChart";

if(!localStorage.getItem('bettingAmount')) {
  localStorage.setItem('bettingAmount', 0)
}
if(!localStorage.getItem('price')) {
  localStorage.setItem('price', 0)
}
if(!localStorage.getItem('nextBettingAmount')) {
  localStorage.setItem('nextBettingAmount', 0)
}

function Winner() {
    return (
      <svg version="1.1" id="Capa_1"  x="0px" y="0px"
      viewBox="0 0 489.4 489.4" width="400">
        <g>
          <path d="M369.75,0h-250.2v44.3h-85.6V110c0,47.2,38.4,85.6,85.6,85.6h1.5c7.9,51.3,47,92.2,97.2,103v70.9h-30.7
            c-9.5,0-17.1,7.7-17.1,17.1v22.5h-26.2v80.3h200.9v-80.3h-26.2v-22.5c0-9.5-7.7-17.1-17.1-17.1h-30.7v-70.9
            c50.3-10.8,89.3-51.8,97.2-103h1.5c47.2,0,85.6-38.4,85.6-85.6V44.3h-85.6V0H369.75z M119.55,152.3c-23.3,0-42.3-19-42.3-42.3V87.6
            h42.3V152.3z M301.45,121.7l-25.7,21.7l8,32.7c1.5,6.1-5.2,11-10.6,7.7l-28.5-17.8l-28.6,17.7c-5.4,3.3-12.1-1.5-10.6-7.7l8-32.7
            l-25.6-21.6c-4.8-4.1-2.3-12,4-12.4l33.5-2.4l12.8-31.2c2.4-5.9,10.7-5.9,13.1,0l12.7,31.1l33.5,2.4
            C303.75,109.7,306.25,117.6,301.45,121.7z M411.95,87.6V110c0,23.3-18.9,42.3-42.2,42.3V87.6H411.95z"/>
            </g>
      </svg>
    );
}

function Loser() {
  return (
    <svg version="1.1" x="0px" y="0px"
      viewBox="0 0 415.188 415.188" width="400">
      <path d="M412.861,78.976c3.404-6.636,2.831-14.159-0.15-20.404c0.84-7.106-1.02-14.321-7.746-19.855
        c-6.262-5.151-12.523-10.305-18.781-15.457c-11.005-9.055-28.237-11.913-38.941,0c-48.619,54.103-99.461,105.856-152.167,155.725
        c-39.185-36.605-78.846-72.713-118.223-108.868c-13.82-12.693-33.824-8.71-42.519,6.411c-12.665,6.286-22.931,14.481-31.42,28.468
        c-4.042,6.664-3.727,15.076,0,21.764c25.421,45.578,74.557,85.651,114.957,122.529c-5.406,4.839-10.772,9.724-16.287,14.461
        c-54.43,46.742-91.144,76.399-23.029,124.325c0.919,0.647,1.856,0.504,2.789,0.882c1.305,0.602,2.557,1.026,4.004,1.264
        c0.45,0.017,0.87,0.093,1.313,0.058c1.402,0.114,2.774,0.471,4.195,0.192c36.621-7.18,70.677-35.878,101.576-67.48
        c30.1,29.669,62.151,58.013,97.395,74.831c8.391,4.005,18.395,1.671,24.855-3.931c10.832,0.818,20.708-5.913,25.665-15.586
        c0.734-0.454,1.207-0.713,2.002-1.21c15.748-9.838,17.187-29.431,5.534-42.936c-26.313-30.492-54.284-59.478-82.798-87.95
        C316.426,196.043,380.533,141.939,412.861,78.976z"/>
    </svg>
  );
}

function Draw() {
    return (
      <svg version="1.1" id="L7" x="0px" y="0px"
        viewBox="0 0 100 100" width="50">
      <path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
        c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="2s" 
              from="0 50 50"
              to="360 50 50" 
              repeatCount="indefinite" />
        </path>
      <path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
        c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="1s" 
              from="0 50 50"
              to="-360 50 50" 
              repeatCount="indefinite" />
        </path>
      <path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
        L82,35.7z">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="2s" 
              from="0 50 50"
              to="360 50 50" 
              repeatCount="indefinite" />
        </path>
      </svg>
    );
}

function play() {
  var audio = new Audio(audio2);
  audio.loop = false;
  audio.play();
}

function playWin() {
  var audio = new Audio(winAudio);
  audio.loop = false;
  audio.play();
}

const Screen1 = () => {
  const { setVisible, bindings } = useModal();
  const TopItems = ["Cashier", "Stats", "Leaderboard", "Help"]; //"Bankroll",
  const [modal, setModal] = useState(false);
  const [account, setAccount] = useState('')
  const [tokenContract, setTokenContract] = useState({})
  const [bnbContract, setBnbContract] = useState({})
  const [providerTitle, setProviderTitle] = useState('')
  const [mybalance, setMyBalance] = useState(0)
  const [ownerOfToken, setOwnerOfToken] = useState(0)
  const [allowance, setAllowance] = useState(0)
  const [bscAccount, setBscAccount] = useState('')
  const [myEth, setMyEth] = useState(0)
  const [bettingAmount, setBettingAmount] = useState(0)
  const [toAllowance, setToAllowance] = useState(0)
  const [networkStatus, setNetworkStatus] = useState(true)
  const [positionValue, setPositionValue] = useState('0')
  const [positionText, setPositionText] = useState('LONG')
  const [roundStatus, setRoundStatus] = useState(false)
  const [endTime, setEndTime] = useState(0)
  let [roundTime, setRoundTime] = useState(0)
  const [roundResult, setRoundResult] = useState('')
  const [startPrice, setStartPrice] = useState(0)
  const [roundStatusTitle, setRoundStatusTitle] = useState('Stop')
  const [roundStausEnabled, setRoundStatusEnabled] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [statsInfo, setStatsInfo] = useState([])
  const [leaderboardInfo, setLeaderboardInfo] = useState([])
  const [bitsValue, setBitsValue] = useState(0)
  const [chartData, setChartData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [chartColor, setChartColor] = useState('#00FF00')
  const [chartStartPrice, setChartStartPrice] = useState([])

  useEffect(()=>{
    if(positionValue == 0) {
      setPositionText('LONG')
    } else if (positionValue == 1){
      if(positionText == 'LONG') {
        setPositionText('UP')
      } else {
        setPositionText('DOWN & UP')
      }
    } else if (positionValue == 2){
      if(positionText == 'LONG') {
        setPositionText('DOWN')
      } else {
        setPositionText('UP & DOWN')
      }
    }
  }, [positionValue]);

  useEffect(async () => {
    await loadWeb3()
    await loadBlockchainData()
  },[tokenContract._address, account, providerTitle])

  useEffect(() => {
    window.ethereum.on('chainChanged', (chainId) => {
      if(chainId === chainIdConf) {
        setNetworkStatus(true)
      } else {
        toast.dark('Wrong Network!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        })
        setNetworkStatus(false)
      }
    });
  }, [window.ethereum])
  
  useEffect(() => {
    window.web3 = new Web3(window.ethereum)
    const Tcontract = new window.web3.eth.Contract(tokenAbi, tokenAddress)
    setTokenContract(Tcontract)
    const BContract = new window.web3.eth.Contract(contractAbi, contractAddress)
    setBnbContract(BContract)
    BContract.events.StartRound({toblock: 'latest'}, (error, event) => {
      setRoundStatusEnabled(false)
      setRoundTime(75)
      BContract.methods.getStatus().call() .then((res) => {
        setEndTime(res[6])
        setStartPrice(res[4])
        })
    })

      BContract.events.EndRound({toblock: 'latest'}, (error, event) => {
        setPositionValue(0);
        if(parseInt(localStorage.bettingAmount) || parseInt(localStorage.price) ) {
          if((parseInt(event.returnValues.price) < parseFloat(localStorage.price) && parseFloat(localStorage.bettingAmount) > 0) || (parseInt(event.returnValues.price) > parseInt(localStorage.price) && parseFloat(localStorage.bettingAmount) < 0)) {
            setRoundResult('Win')
            onClickTopItem('Win')
            playWin()
          } else if(parseFloat(localStorage.bettingAmount) == 0 && parseInt(event.returnValues.price) == parseInt(localStorage.price)) {
            setRoundResult('Draw')
            playWin()
          } else {
            setRoundResult('Lose')
            onClickTopItem('Lose')
            playWin()
          }
        } else {
          setRoundResult('')
        }
  
        localStorage.setItem('bettingAmount', localStorage.nextBettingAmount)
        localStorage.setItem('price', 0)
        localStorage.setItem('nextBettingAmount', 0)
      })

      BContract.events.RunRound({toblock: 'latest'}, (error, event) => {
          setEndTime(event.returnValues.endTime)
          var currentTime = new Date()
          setRoundTime(parseInt(event.returnValues.endTime) - parseInt(currentTime.getTime()/1000))
          setRoundStatusEnabled(true)
        })
      }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      roundTime  > 0 && roundStausEnabled ?  setRoundTime(roundTime -1) : clearInterval()
      roundTime > 60 ? setRoundStatusTitle('Betting Time') : setRoundStatusTitle('Running')
    }, 1000);
    return () => clearInterval(interval);
  }, [roundTime, roundStausEnabled]);

  useEffect(() => { 
    if(roundStatus) {const interval = setInterval(() => {
      bnbContract.methods.getStatus().call() .then((res) => {
        var chartDataTemp = chartData
        var chartStartPriceTemp = chartStartPrice
        if(roundStatusTitle == "Betting Time") {
          chartStartPriceTemp = []
        } else {
          chartStartPriceTemp.push(parseFloat(parseInt(res[4])/1e8).toFixed(2))
        }
        if(chartStartPriceTemp.length > 10) {
          chartStartPriceTemp.shift()
        }
        setChartStartPrice(chartStartPriceTemp)
        if(parseFloat(parseInt(res[3])/1e8).toFixed(2) > parseFloat(parseInt(res[4])/1e8).toFixed(2)) {
          var col = '#FFD580'
          setChartColor(col)
        } else {
          var colr = '#00FF00'
          setChartColor(colr)
        }
        chartDataTemp.push(parseFloat(parseInt(res[3])/1e8).toFixed(2)) //parseFloat(parseInt(res[3])/1e8).toFixed(2)
        if(chartDataTemp.length > 10) {
          chartDataTemp.shift()
        }
        setChartData(chartDataTemp)
      })
      var date = new Date()
      setCategoryData([('0'+date.getHours()).slice(-2) + "'" + ('0'+date.getMinutes()).slice(-2)+ '"' + ('0'+date.getSeconds()).slice(-2)])
      var categoryDataTemp = categoryData
      categoryDataTemp.push(('0'+date.getHours()).slice(-2) + "'" + ('0'+date.getMinutes()).slice(-2)+ '"' + ('0'+date.getSeconds()).slice(-2))
      if(categoryDataTemp.length > 10) {
        categoryDataTemp.shift()
      }
      setCategoryData(categoryDataTemp)
    }, 1000);
    return () => clearInterval(interval);}
  }, [bnbContract, roundStatus, roundStatusTitle]);

  const loadWeb3 = async () => {
   
    if (window.ethereum) {
      if(providerTitle === "Wallet Connect") {
        // const provider = new WalletConnectProvider({
        //   infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
        // });
        // window.web3 = new Web3(provider)
        // await provider.enable().catch(reject => {
        //   setProviderTitle('')
        // })
        wallet.connect('walletconnect')
      } else if(providerTitle === "BSC Wallet") {
        const bsc = new BscConnector({
          supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
        })
        
        await bsc.activate();
        bsc.getAccount() .then(res => {
          setBscAccount(res)
        })
        await bsc.getChainId();

      } else if(providerTitle === "Metamask") {
        wallet.connect('injected')
        
      }
      await window.ethereum
          .request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chainIdConf }], //bsc 0x38 goerli 0x5
          })
          .then(() => {
          })
          .catch(async (err) => {
              if (err.code === 4902) {
                  // addChain()
              }
          });
      window.web3 = new Web3(window.ethereum)
      
    } 
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } 
    else {
      window.alert("Non-ethereum browser detected. should consider trying MetaMask!")
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    var accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    if(window.ethereum) {
      window.ethereum.on('accountsChanged', () =>  {
          web3.eth.getAccounts((error, accounts) => {
            setAccount(accounts[0])
          });
      });
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if(!account || chainId != chainIdConf) {
          setNetworkStatus(false)
      } else {
        setNetworkStatus(true)
      }
    }
    if(account) {
      web3.eth.getBalance(account) .then(res => {
        setMyEth(res / (10 ** 18))
      })
    }
    if(account) {
      const mybalance = await tokenContract.methods.balanceOf(account).call()
      setMyBalance(mybalance)
      const ownerOfToken = await tokenContract.methods.getOwner().call()
      setOwnerOfToken(ownerOfToken)
      const allowance = await tokenContract.methods.allowance(account, contractAddress).call()
      setAllowance(allowance / 1e18)
      const roundStat = await bnbContract.methods.genesisStartOnce().call()
      setRoundStatus(roundStat)
      if(roundStat) {
        bnbContract.methods.getStatus().call() .then((res) => {
          setEndTime(res[6])
          setStartPrice(res[4])
          var currentTime = new Date()
          if(res[5]) {
            if (parseInt(res[6]) - parseInt(currentTime.getTime()/1000) > 0 ) {
              setRoundStatusEnabled(true)
              setRoundTime(parseInt(res[6]) - parseInt(currentTime.getTime()/1000))
            } else {
              setRoundTime(0)
            }
          } else {
            setRoundTime(75)
            setRoundStatusEnabled(false)
          }
        })
      }
    }
    
  }

  const getAllowance = async (betAction) => {
    if(account) {
      // const calculatedApproveValue = BigNumber(bettingAmount*1e18);
      const num = bettingAmount * 1e18;
      const calculatedApproveValue = "0x" + num.toString(16);
      const gasPrice = window.web3.utils.toWei('6', 'gwei');
      const gasLimit = 800000;
      if(betAction == 'UP') {
        let isBetting = true;
        if(roundStatusTitle == 'Running') isBetting = false
        bnbContract.methods.betUp(calculatedApproveValue).send({from: account, gasPrice, gasLimit}).once('receipt', (receipt) => {
          isBetting ? 
          bnbContract.methods.getStatus().call() .then((res) => {
            localStorage.setItem('bettingAmount', parseFloat(localStorage.bettingAmount) + parseFloat(bettingAmount))
            localStorage.setItem('price', res[4])
            setPositionValue(1)
          }) :
          bnbContract.methods.getStatus().call() .then((res) => {
            localStorage.setItem('nextBettingAmount', parseFloat(localStorage.nextBettingAmount) + parseFloat(bettingAmount))
          })
        })
      } else if (betAction == 'DOWN') {
        let isBetting = true;
        if(roundStatusTitle == 'Running') isBetting = false
        bnbContract.methods.betDown(calculatedApproveValue).send({from: account, gasPrice, gasLimit}).once('receipt', (receipt) => {
          isBetting ? 
          bnbContract.methods.getStatus().call() .then((res) => {
            localStorage.setItem('bettingAmount', parseFloat(localStorage.bettingAmount) - parseFloat(bettingAmount))
            localStorage.setItem('price', res[4])
            setPositionValue(2)
          }) :
          bnbContract.methods.getStatus().call() .then((res) => {
            localStorage.setItem('nextBettingAmount', parseFloat(localStorage.nextBettingAmount) - parseFloat(bettingAmount))
          })
        })
      }
      const allowance = await tokenContract.methods.allowance(account, contractAddress).call()
      setAllowance(allowance / 1e18)
    }
  }

  const TopItem = ({ title, index, onClick }) => {
    return (
      <div
        key={index}
        className="flex flex-column top-item"
        onClick={() => onClick(title)}
      >
        <div>{title}</div>
        <img src={TopIco} />
      </div>
    );
  };

  const statsTableHeaderItems = [
    'Total Rounds Number',
    'Total Bet',
    'Total paid to the infostructure',
    'Your Bet Count',
    'Your Total Bet Amount',
    'Total Won or lost',
  ]

  const leaderboardHeaderItems = [
    'No',
    'Address',
    '+Profit (koins)',
    'Total Wager'
  ]

  const DepositAllowance = () => {
    // const tokenDecimals = 18;
    // const tokenAmountToApprove = 999000000000;
    // const calculatedApproveValue = BigNumber(toAllowance*1e18);
    const num = toAllowance * 1e18;
    const calculatedApproveValue = "0x" + num.toString(16);
    tokenContract.methods.increaseAllowance(contractAddress, calculatedApproveValue).send({from: account}).once('receipt', (receipt) => {
          tokenContract.methods.allowance(account, contractAddress).call() .then((res) =>
            setAllowance(res / 1e18)
          )
        })
  }
  const onClickTopItem = async (item) => {
    if (modal == item) setModal(false);
    else if(item === 'Stats') {
      setModal(item);
      setModalStatus(false)
      const totalRoundNum = await bnbContract.methods.currentEpoch().call()
      const totalBetAmount = parseInt(await bnbContract.methods.totalBetAmount().call()) / 1e18
      const totalPaid = parseFloat(parseInt(totalBetAmount) / 25).toFixed(2)
      const yourAddressInfo = await bnbContract.methods.viewLedgerAddressInfo(account).call()
      const yourTotalBetAmount = parseInt(yourAddressInfo[1]) + parseInt(yourAddressInfo[2]) 
      const yourWonOrLost = parseInt(yourAddressInfo[1]) - parseInt(yourAddressInfo[2]) > 0 ? '+' + (parseInt(yourAddressInfo[1]) - parseInt(yourAddressInfo[2])) : parseInt(yourAddressInfo[1]) - parseInt(yourAddressInfo[2])
      
      const statsInfoArr = [totalRoundNum, totalBetAmount, totalPaid, yourAddressInfo[0], yourTotalBetAmount, yourWonOrLost]
      setStatsInfo(statsInfoArr)
      setModalStatus(true)
    } else if(item === 'Leaderboard') {
      setModal(item);
      setModalStatus(false)
      const AllLedgerInfo = await bnbContract.methods.viewAllLedgerInfo().call()
      var temp = [...AllLedgerInfo]
      temp.sort((a, b) => parseInt(b[4]) - parseInt(a[4]))
      const leaderboardInfoArr = []
      leaderboardInfoArr.push(temp.map(val => ([val[0], parseFloat(parseInt(val[4])/1e18).toFixed(2), parseFloat(parseInt(val[2]) + parseInt(val[3])).toFixed(2)])))
      setLeaderboardInfo(leaderboardInfoArr);
      setModalStatus(true)
    } else if(item === 'Win' || item === 'Lose') {
      setModal(item)
      setTimeout(() => setModal(false), 3000)
    } else {
      setModal(item)
    }
  };

  const getChildren = ({ setModal, modal }) => {
    switch (modal) {
      case "Cashier":
        return (
          <div className="cashier">
            <img src={topLineIco} className={"top-line"} />
            <div className="title">
              Deposit and withdraw Koins from smart contract
            </div>
            <div className="items flex flex-between">
              <div className="left">
                <div>{">> Info"}</div>
                <div>{">> Smart Contract"}</div>
                <div>{">> Docs"}</div>
                <div>{">> Audit"}</div>
              </div>
              <div className="right flex flex-column">
                <div>Your Koins</div>
                <div>{parseFloat(parseInt(mybalance)/1e18).toFixed(2)}</div>
              </div>
            </div>
            <div className="first-block flex">
              <div
                className="button small-btn"
                onClick={() => {
                  play();
                  setModal("Deposit");
                }}
              >
                Deposit
              </div>
              <div
                className="button small-btn"
                onClick={() => {
                  play();
                  setModal("Withdraw");
                }}
              >
                Withdraw
              </div>
            </div>
          </div>
        );
      case "Deposit":
        return (
          <div className="first-block">
            {bettingAmount > allowance ? 
              <label>Deposit needs more {(bettingAmount-allowance)} +</label>
              : ''
            }
            <div className="detail">
              <input placeholder='Amount' onChange={(e) => setToAllowance(parseFloat(e.target.value))}/>
            </div>

            <div
              className="button small-btn"
              onClick={() => {
                play();
                setModal(false);
                DepositAllowance();
              }}
            >
              Deposit
            </div>
          </div>
        );
      case "Withdraw":
        return (
          <div className="first-block">
            {/* <div className="detail">
              <input placeholder="Amount" />
            </div> */}

            <div
              className="button small-btn"
              onClick={() => {
                play();
                setModal(false);
                bnbContract.methods.betUp(0).send({from: account}).once('receipt', (receipt) => {
                })
              }}
            >
              Withdraw
            </div>
          </div>
        );
      case "Stats":
        return (
          <div className="cashier" style={{height: '360px'}}>
            <div className="title">
              STATS
            </div>
            {modalStatus ? 
              <div className="detailfortable flex flex-between" style={{fontSize: '70%'}}>
                <div className="left">
                  {statsTableHeaderItems.map(val => <div>{val}</div>)}
                </div>
                <div className="left" style={{textAlign : "right"}}>
                  {statsInfo.map(val => <div>{val}</div>)}
                </div>
              </div> :
                <div style={{display: 'flex', height:'262px', justifyContent: 'center'}}>
                  <Draw />
                </div>
            }
            
          </div>
        );
      case "Leaderboard":
        return (
          <div className="cashier" style={{height: '600px'}}>
            <div className="title">
              LEADERBOARD
            </div>
            <div className="detailfortable flex">
              <table className="table">
                <thead>
                  <tr>
                  {leaderboardHeaderItems.map((item, key) => (
                    <th key={key}>{item}</th>
                  ))}
                  </tr>
                </thead>
                <tbody>
                  {modalStatus ? 
                     leaderboardInfo.map((val) => (
                       val.map((value, key) => ( key < 10 ?
                         <tr key={key}>
                           <td>{key + 1}</td>
                           <td>{value[0]}</td>
                           <td>{value[1]}</td>
                           <td>{value[2]}</td>
                         </tr> : ''
                       ))
                     ))
                     : <div style={{display: 'flex', height:'262px', justifyContent: 'center', position:'relative', left:'300px'}}>
                        <Draw />
                      </div>
                  }
                </tbody>
              </table>
            </div>
          </div>
        );

      case "Win":
        return (
          <div style={{textAlign: 'center'}} onClick={() => setModal(false)}>
            <Winner />
          </div>
        );

      case "Lose":
        return(
          <div style={{textAlign: 'center'}} onClick={() => setModal(false)}>
            <Loser />
          </div>
        )
      default:
        return null;
    }
  };

  const connect = async () => {
    await window.ethereum.request({method: 'eth_requestAccounts'})
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
  }

  const isMetaMaskInstalled = () => {
    const {ethereum} = window
    return Boolean(ethereum && ethereum.isMetaMask)
  } 
  var options = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
      }
    },
    tooltip : {
      enabled: false,
      followCursor: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: categoryData,
    },
    yaxis: { 
      min : function() {
        if(chartStartPrice[0])
          return parseInt(chartStartPrice[0]) - 200
        else 
          return parseInt(chartData[0]) - 200
      },
      max : function() {
        if(chartStartPrice[0])
          return parseInt(chartStartPrice[0]) + 200
        else 
          return parseInt(chartData[0]) + 200
      }
    },
   colors: ['#5C3ED5', chartColor],
  }

  var series = [
      {
        name: "Start Price",
        data: chartStartPrice
      },
      {
        name: "Current Price",
        data: chartData
      }
  ]

  const wallet = useWallet()
  return (
    <div>
      <Modal
        showModal={modal && true}
        handleOpenModal={() => setModal(false)}
        className="screen1-modal"
        style={{ width: modal == "Cashier" ? "55%" : "45%" }}
      >
        {getChildren({ modal, setModal })}
      </Modal>
      <div className="clouds">
        <div className="x1">
          <img src={Cloud} className="cloud cloud1" />
        </div>

        <div className="x2">
          <img src={Cloud} className="cloud cloud1" />
        </div>

        <div className="x3">
          <img src={Cloud} className="cloud cloud1" />
        </div>

        <div className="x4">
          <img src={Cloud} className="cloud cloud1" />
        </div>
      </div>

      <div className="top-bar flex flex-between">
        <div className="app-title"><label style={{color: '#5C3ED5'}}>KOI</label>'n'<label style={{color: 'orange'}}>Games</label>: Price Battle</div>
        <div className="top-items flex">
          {TopItems.map((i, k) => (
            <TopItem title={i} index={k} onClick={onClickTopItem} />
          ))}
        </div>
        <div className="connect">
          <img src={ConnectIco} />
          {(account && networkStatus) ? 
            <span>{account.substr(0, 6) + '...' + account.substr(account.length-4, account.length)}</span>
            : (bscAccount && networkStatus) ? 
                <span>{bscAccount.substr(0, 6) + '...' + bscAccount.substr(bscAccount.length-4, bscAccount.length)}</span> 
                :<span onClick={() => setVisible(true)}>Connect</span>
          }
        </div>
        <div className="flex profile">
          {/* <img src={ProfilePic} /> */}
          <div>Bits : {allowance || <span className="small-btn" style={{cursor: 'pointer'}} onClick={() => {setModal('Deposit')}}>Deposit</span>}</div>
        </div>
      </div>
      <div className="flex flex-between main-body">
        <div className="left-rock">
          <img src={LeftRockCloud} />
        </div>

        <div className="panel">
          {/* <div className="profit-title">Max Profit : 25.00</div> */}
          <img src={GroupIco} className="panel-icon1" />
          <img src={GroupIco} className="panel-icon2" />
          <img src={GroupIco} className="panel-icon3" />
          {/* <div className="vertical-axis">
            <div>
              {vericalAxis.map((i, k) => (
                <div key={k}>{i.label}</div>
              ))}
            </div>
            <div className="line"></div>
          </div>
          <div className="horizantal-axis">
            <div className="line"></div>

            <div>
              {horizantalAxis.map((i, k) => (
                <div key={k}>{i.label}</div>
              ))}
            </div>
          </div> */}
          <RealChart options={options} series={series}/>
        </div>
        <div className="details-block">
          <div className="first-block">
            {/* <div className="button small-btn" onClick={() => play()}>
              Manual
            </div>
            <div className="button small-btn" onClick={() => play()}>
              Auto
            </div> */}
              <div className="detail">
                <input placeholder="Enter Betting Amount" disabled={!networkStatus} onChange={(e) => {
                  if(networkStatus && account) {
                    setBettingAmount(parseFloat(e.target.value))
                  }
                }} 
                style={{fontFamily: 'AlfaSlabOne', fontSize: '125%'}}
                />
              </div>
              {bettingAmount && roundStatus ? allowance >= bettingAmount ?
                <Fragment>
                  <div className="button small-btn" onClick={() => {play() 
                    getAllowance('UP')
                  }}>
                    UP
                  </div>
                  <div className="button small-btn" onClick={() => {play()
                    getAllowance('DOWN')
                  }}>
                    DOWN
                  </div>
                </Fragment>
                : 
                  <Fragment>
                      <div className="button small-btn" onClick={() => {setModal('Deposit')}}>
                        Deposit
                      </div>
                    </Fragment>
                : <Fragment>
                <div className="button small-btn disable-btn">
                  UP
                </div>
                <div className="button small-btn disable-btn">
                  DOWN
                </div>
              </Fragment>
              }
              
              
            <div className="detail detail2" style={{ marginTop: "10px" }}>
              Round Status:<p>&nbsp;&nbsp;{roundStatus ? roundStatusTitle : 'Stop'}</p>
            </div>
            <div className="detail detail2">
              Start Price:<p>&nbsp;&nbsp;{parseFloat(startPrice / 1e8).toFixed(2)}$</p>
            </div>
            <div className="detail detail2">Position:<p>&nbsp;&nbsp;{positionText}</p></div>
          </div>
          <div className="second-block">
            <div className="w-100">Your Result</div>
            <div className="detail detail3">
              {/* Etc:1000<div className="button extra-small-btn">Bits</div> */}
              <p>{roundResult}</p>
            </div>
          </div>
          <div className="third-block">
            <div>Timer End in:</div>
            <div>{roundTime} Seconds</div>
          </div>
        </div>
        <div className="footer-img"></div>
      </div>
      <Web3Modal setVisible={setVisible} {...bindings} setProviderTitle={setProviderTitle} />
      <ToastContainer pauseOnFocusLoss={false} />
    </div>
  );
};

export default () => (
  <UseWalletProvider
    chainId={1}
    connectors={{
      fortmatic: { apiKey: '' },
      portis: { dAppId: '' },
      walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
      walletlink: { url: 'https://mainnet.eth.aragon.network/' },
    }}
  >
      <Screen1 />
    </UseWalletProvider>
)
