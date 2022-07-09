import React, { useEffect, useState } from 'react'
import Papa from "papaparse"
import "./matches.css"

function Matches(props) {
    const [matches,setMatches] = useState([])
    const[teamNames, setTeamNames] = useState({})
    useEffect(()=>{
        async function getData() {
          const response = await fetch('/data/Match.csv')
          const teamResponse = await fetch('/data/Team.csv')
          const teamReader = teamResponse.body.getReader()
          const teamResult = await teamReader.read()
          const teamDecoder = new TextDecoder('utf-8')
          const teamCsv = teamDecoder.decode(teamResult.value)
          const teamResults = Papa.parse(teamCsv, {header: true})
          const teamRows = teamResults.data
          console.log(teamRows);
          const teamObject = teamRows.reduce((acc,team)=>{
            console.log(team);
            acc[team.Team_Id ] = team.Team_Short_Code
            return acc
          },{})
          setTeamNames(teamObject)



          const reader = response.body.getReader()
          const result = await reader.read() // raw array
          const decoder = new TextDecoder('utf-8')
          const csv = decoder.decode(result.value) // the csv text
          const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
          const rows = results.data // array of objects
         const seasonMatches = rows.filter((match)=>{
             return match.Season_Id === props.seasonId
         })
         
         setMatches(seasonMatches)
         
          
        }
        getData()
    },[props.seasonId])
  return (
    <div className='matches'>
        <table className='matchTable'>
            <tr>
                <th className='tableHeader'>Date</th>
                <th className='tableHeader'>team</th>
                <th className='tableHeader'>team</th>
                <th className='tableHeader'>venue</th>
                <th className='tableHeader'>result/draw</th>
            </tr>
            {matches.map((match)=>{
                return(
                    <tr key = {match.Match_Id}>
                        <td >{match.Match_Date}</td>
                        <td>{teamNames[match.Team_Name_Id]}</td>
                        <td>{teamNames[match.Opponent_Team_Id]}</td>
                        <td>{match.Venue_Name}</td>
                        <td>{match.IS_Result ? "normal" : "Tie"}</td>

                    </tr>
                )
            })}
        </table>
    </div>
  )
}

export default Matches