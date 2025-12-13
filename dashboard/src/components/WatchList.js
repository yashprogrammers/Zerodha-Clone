import React, { useState } from 'react'
import { watchlist } from "../data/data";
import { KeyboardArrowDown, KeyboardArrowUp, BarChartOutlined, MoreHoriz } from "@mui/icons-material"
import { Tooltip, Grow } from "@mui/material";

const WatchList = () => {
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
                {watchlist.map((stock, index) => {
                    return <p><WatchListItem stock={stock} key={index} /></p>
                })}
            </div>
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
            {showWatchListActions && <WatchListActions uid={stock.name} />}
        </li>
    )
}

const WatchListActions = () => {
    return (
        <span className="actions">
            <span>
                <Tooltip
                    title="Buy (B)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button className="buy">Buy</button>
                </Tooltip>
                <Tooltip
                    title="Sell (S)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button className="sell">Sell</button>
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

