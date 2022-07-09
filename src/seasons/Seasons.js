import React, { useEffect, useState } from 'react'
import "./seasons.css"
// import csvFile from "../data/Season.csv"
import Papa from 'papaparse'
import SelectedSeason from './SelectedSeason'
// import { readFile, readFileSync } from 'fs';


function Seasons() {
    const [seasonData, setSeasonData] = useState([])
    const[selectedSeason, setSelectedSeason] = useState(null)
    useEffect(()=>{
        async function getData() {
          const response = await fetch('/data/Season.csv')
          const reader = response.body.getReader()
          const result = await reader.read() // raw array
          const decoder = new TextDecoder('utf-8')
          const csv = decoder.decode(result.value) // the csv text
          const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
          const rows = results.data // array of objects
          setSeasonData(rows);
          console.log(rows);
        }
        getData()
    },[])
     

    //function to go back
    const cancelSelection = ()=>{
        setSelectedSeason(null)
    }
    
  return( selectedSeason ? <SelectedSeason data = {selectedSeason} cancelSelection = {cancelSelection}></SelectedSeason> : (
    <div className='background'>
        <h1 className='seasonHeading'>IPL SEASONS</h1>
        <div className='seasonBlock'>
        <div className='seasonTable'>    
          {seasonData.map((season)=>{
              
              return( 
              season.Season_Id ? 
              <button  key = {season.Season_Id} onClick={()=>{
                  setSelectedSeason(season)
              }} className='seasonNum'>
                  {`Season ${season.Season_Id} `}
              </button> : null) 
          })}
        </div>
        </div>


    </div>
  ))
}

export default Seasons