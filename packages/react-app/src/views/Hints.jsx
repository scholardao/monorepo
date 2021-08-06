import React from 'react'
import MarketPaperCard from '../components/MarketPaperCard'

let Cardinfo = {
    author:'Bob',
    title:'How to prevent birds',
    type:'Article',
    desc:'Current time now in Time Zone: America Denver (USA Mountain Time) Daylight Saving Time began: March 14, 2021 02:00 local time. Clocks went forward one hour. Daylight'
}

function Hints(props) {
    return (
        <div>
            <MarketPaperCard
            
            author={Cardinfo.author}
            title={Cardinfo.title}
            paperType={Cardinfo.type}
            paperDescription = {Cardinfo.desc}
            
            ></MarketPaperCard>
        </div>
    )
}

export default Hints
