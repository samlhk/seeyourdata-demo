import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const NavBar = ({ db, highlighted }) => {

  const [showNav, setShowNav] = useState(false);

  const toggleNavigation = () => {
    setShowNav(!showNav);
  }
  
  const navigate = useNavigate();

  return (
    <>
      <FaBars className='nav-btn' onClick={ toggleNavigation }/>
      <navbar className={showNav ? '' : 'display-none'}>  
          <div className={(highlighted === 'home' ? 'highlighted-nav' : '') + ' home-nav nav-item'} onClick={() => navigate('/')}>Home</div>
          {db && db.activity &&<><div className='separator'>|</div>
            <div className={(highlighted === 'activity' ? 'highlighted-nav' : '') + ' nav-item'} onClick={() => navigate('/activity')}>Activity</div></>}
          {db && db.location &&<><div className='separator'>|</div>
            <div className={(highlighted === 'location' ? 'highlighted-nav' : '') + ' nav-item'} onClick={() => navigate('/location')}>Location</div></>}
          {(db && (db.postedTopics || db.postedSentiment || db.messagedTopics || db.messagedSentiment || db.advertisers || db.recommendedTopics || db.searchedTopics || db.viewedTopics)) &&<><div className='separator'>|</div>
            <div className={(highlighted === 'interests' ? 'highlighted-nav' : '') + ' nav-item'} onClick={() => navigate('/interests')}>Interests</div></>}
          {(db && (db.piPhone || db.piLocation || db.piIp || db.piDevice)) &&<><div className='separator'>|</div>
            <div className={(highlighted === 'pi' ? 'highlighted-nav' : '') + ' nav-item'} onClick={() => navigate('/pi')}>Personal Information</div></>}
          {((db && ((db.activity && db.activity.find(({app}) => app.includes('instagram'))) || db.instagramCommentedAccounts || db.instagramViewedAccounts || db.instagramLikedAccounts || db.instagramStoryInteractedAccounts))) &&<><div className='separator'>|</div>
            <div className={(highlighted === 'instagram' ? 'highlighted-nav' : '') + ' nav-item'} onClick={() => navigate('/instagram')}>Instagram</div></>}
          {((db && ((db.activity && db.activity.find(({app}) => app.includes('google'))) || db.sites || db.youtubeWatchedChannels || db.youtubeWatchedTopics))) &&<><div className='separator'>|</div>
            <div className={(highlighted === 'google' ? 'highlighted-nav' : '') + ' nav-item'} onClick={() => navigate('/google')}>Google</div></>}
      </navbar>
    </>
  )
}

export default NavBar