import React, { useState, useEffect } from 'react'
// import { watchlist } from "../data/data";
import { KeyboardArrowDown, KeyboardArrowUp, BarChartOutlined, MoreHoriz } from "@mui/icons-material"
import SellTwoToneIcon from '@mui/icons-material/SellTwoTone';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import { Tooltip, Grow } from "@mui/material";
import { DoughnutChart } from "./DoughnutChart";
import { useNavigate } from 'react-router-dom';
// import BuyActionWindow from './BuyActionWindow';
import axios from 'axios';

// const labels = watchlist.map((subArray) => subArray["name"]);


const WatchList = () => {

    const [allwatchlist, setWatchList] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/allwatchlist").then((res) => {
          setWatchList(res.data)
        })
    }, []);

    const labels = allwatchlist.map((subArray) => subArray["name"]);

    const data = {
        labels,
        datasets: [
            {
                label: "Price",
                data: allwatchlist.map((stock) => stock.price),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='watchlist-container'>
            <div className="search-container">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search stocks here..."
                    className="search"
                />
                <span className="counts"> {12} / 50</span>
            </div>
            <div className="list">
                {allwatchlist.map((stock, index) => {
                    return <p><WatchListItem stock={stock} key={index} /></p>
                })}
            </div>

            <DoughnutChart data={data} />

        </div>
    )
}

export default WatchList;

const WatchListItem = ({ stock }) => {

    const [showWatchListActions, setShowWatchListActions] = useState(false);

    const handlerMouseEnter = () => {
        setShowWatchListActions(true)
    }

    const handlerMouseLeave = () => {
        setShowWatchListActions(false)
    }

    return (
        <li onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave} >

            <div className="item">
                <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
                <div className="itemInfo">
                    <span className='percent'>{stock.percent}</span>
                    {stock.isDown ? (
                        <KeyboardArrowDown className="down" />
                    ) : (
                        <KeyboardArrowUp className="down" />
                    )}
                    <span className="price">{stock.price}</span>
                </div>
            </div>
            {showWatchListActions && <WatchListActions uid={stock} />}
        </li>
    )
}


const WatchListActions = ({ uid }) => {
    const navigate = useNavigate();

    const OpenBuyWindow = (uid) => {
        navigate(`/buy/${uid._id}`);
    };


    return (
        <span className="actions">
            <span>
                <Tooltip
                    title="Buy (B)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button className="buy" onClick={() => { OpenBuyWindow(uid) }}><ShoppingBagTwoToneIcon className="icon" /></button>
                </Tooltip>
                <Tooltip
                    title="Sell (S)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button className="sell"><SellTwoToneIcon className="icon" /></button>
                </Tooltip>
                <Tooltip
                    title="Analytics (A)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button className="action">
                        <BarChartOutlined className="icon" />
                    </button>
                </Tooltip>
                <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
                    <button className="action">
                        <MoreHoriz className="icon" />
                    </button>
                </Tooltip>
            </span>
        </span>
    )
}

