import React, { useEffect, useState } from 'react'
import Papa from "papaparse"
import Matches from './Matches'

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
    <div>
        <h1>{`SEASON YEAR ${props.data.Season_Year}`}</h1>
        <div>
            <h1>Man Of the Series {(playerDetails.find((player)=>{return player.Player_Id === props.data.Man_of_the_Series_Id})||{}).Player_Name}</h1>
            <h1>Orange Cap {(playerDetails.find((player)=>{return player.Player_Id === props.data.Orange_Cap_Id})||{}).Player_Name}</h1>
            <h1>Purple Cap {(playerDetails.find((player)=>{return player.Player_Id === props.data.Purple_Cap_Id})||{}).Player_Name}</h1>
        </div>
        <Matches seasonId = {props.data.Season_Id}></Matches>
    </div>
  )
}

export default SelectedSeason