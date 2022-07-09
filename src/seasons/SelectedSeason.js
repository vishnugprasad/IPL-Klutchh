import React, { useEffect, useState } from 'react'
import Papa from "papaparse"
import Matches from './Matches'
import "./selectedSeason.css"

function SelectedSeason( props) {

    const [ playerDetails, setPlayerDetails] = useState([])
    
    useEffect(()=>{
        async function getData() {
          const response = await fetch('/data/Player.csv')
          const reader = response.body.getReader()
          const result = await reader.read() // raw array
          const decoder = new TextDecoder('utf-8')
          const csv = decoder.decode(result.value) // the csv text
          const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
          const rows = results.data // array of objects
          const players = [props.data.Man_of_the_Series_Id, props.data.Orange_Cap_Id, props.data.Purple_Cap_Id,]
          const playerInfo = rows.filter((row)=>{
              return players.includes(row.Player_Id)
          })
          console.log(playerInfo);
          setPlayerDetails(playerInfo)
        }
        getData()
    },[])


  return (
    <div className='selectedSeason'>
        
        <button className='button' onClick={props.cancelSelection}>BACK</button>
        <div className='stats'>
        
       
            <h1 className='seasonName'>{`SEASON YEAR ${props.data.Season_Year}`}</h1>
            <h3 className='statFont'>Man Of the Series: {(playerDetails.find((player)=>{return player.Player_Id === props.data.Man_of_the_Series_Id})||{}).Player_Name}</h3>
            <h3 className='statFont'>Orange Cap: {(playerDetails.find((player)=>{return player.Player_Id === props.data.Orange_Cap_Id})||{}).Player_Name}</h3>
            <h3 className='statFont'>Purple Cap: {(playerDetails.find((player)=>{return player.Player_Id === props.data.Purple_Cap_Id})||{}).Player_Name}</h3>
       
        </div>
        <Matches seasonId = {props.data.Season_Id}></Matches>
    </div>
  )
}

export default SelectedSeason