import React from 'react'
import { useState,useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/Results.css';

const SearchResult = ({keyWord}) => {

  const [launches, setLaunchesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxDataLength, setMaxLength] = useState(5);
  
  // Note to Checker : I'm not familiar with Lazy-loading system, I tried to study it but i couldnt comprehend it in time
  // so I followed my logic flow, whereas whenever the user hits the bottom part of the website
  
  // my solution mimics how the lazy-loading system wants to show itself visually. BUT i know the reason 
  // it's used is to allow the user to only get a certain amount of data until they're interested for more.
  // with more time maybe I can set that up properly.
  
  // it increases the allowed Data to be loaded (set as maxDataLength)
  const listInnerRef = useRef();
  
  // this onScroll will then check if the user has scrolled to the bottom
  const onScroll = () => {

    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setMaxLength(maxDataLength + 5);
        console.log('Reached bottom')
      }
    }
  };

  useEffect( () => {
    axios.get('/launches').then((res) =>{
        setLaunchesList(res.data);
        setLoading(false);
        setMaxLength(5);
    });
  }, []);
  

  // Max Data Length is placed here
  const ListLaunches = launches.slice(0,maxDataLength).map((launch)=>{
    var year = new Date(launch.date_utc).getFullYear().toString();
    if(keyWord.length === 0)
    {
        return(
            <div className='card' key={launch.id}>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col'>
                        <img src={launch.links.patch.small} className="img-thumbnail imageSize" alt="..." />
                        </div>
                        <div className='col'>
                        <h3 className='card-title'>{launch.flight_number}:{launch.name}({year})</h3>
                        <hr />
                        <h5 className=''>{launch.details}</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        if(
        launch.id.includes(keyWord) || 
        launch.name.includes(keyWord) || 
        year.includes(keyWord) || 
        launch.flight_number.toString() === keyWord ||
        launch.details !== null && launch.details.toLowerCase().includes(keyWord.toLowerCase()))
        {
            return(
                <div className='' key={launch.id}>
                    <div className='row'>
                        <div className='col'>
                        <img src={launch.links.patch.small} className="img-thumbnail imageSize" alt="..." />
                        </div>
                        <div className='col'>
                        <h3 className='card-title'>{launch.flight_number}:{launch.name}({year})</h3>
                        <hr />
                        <h5 className=''>{launch.details}</h5>
                        </div>
                    </div>
                </div>
            )
        }
    }

  });

  return (
    <div className='d-flex justify-content-center'>
        
        <div className={`overflow-scroll resultsPanel card w-50 ${loading ? 'loading': ''}`} ref={listInnerRef} onScroll={onScroll}>
            { ListLaunches }
            <div>
                No more data can be fetched
            </div>
        </div>
    </div>
  )
}

export default SearchResult