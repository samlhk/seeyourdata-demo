import React, { useEffect, useState } from 'react'
import Activity from '../components/activity/Activity';
import Location from '../components/location/Location';
import Interests from '../components/interests/Interests';
import { useNavigate } from 'react-router-dom';
import Instagram from '../components/instagram/Instagram';
import Pi from '../components/pi/Pi';
import Google from '../components/google/Google';
import { readDB } from '../backend';
import Banner from '../components/Banner';
import NavBar from '../components/NavBar';

const Page = ({ category }) => {

  const [db, setDB] = useState();

  useEffect(() => {
    fetchDB();
  }, []);

  const fetchDB = async () => {
    const db = await readDB();
    setDB(db);
  }

  return (
    <div>
      <Banner/>
      {<div id='demo-warning' className='important'>Function disabled in demo</div>}
      <NavBar db = { db } highlighted = {category}/>
      <div className='home-container'>
        <div className='panel-container'>
          {category === 'activity' && <Activity db={ db }/> }
          {category === 'location' && <Location db={ db }/> }
          {category === 'interests' && <Interests db={ db }/> }
          {category === 'pi' && <Pi db={ db }/> }
          {category === 'instagram' && <Instagram db={ db }/> }
          {category === 'google' && <Google db={ db }/> }
        </div>
      </div>
    </div>
  )
}

export default Page