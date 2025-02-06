import React, { useEffect, useState } from 'react'
import Activity from '../components/activity/Activity';
import Location from '../components/location/Location';
import Interests from '../components/interests/Interests';
import JSZip from 'jszip';
import { FaInfoCircle } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import Dialogue from '../components/ai/Dialogue';
import Instagram from '../components/instagram/Instagram';
import Pi from '../components/pi/Pi';
import Card from '../components/Card';
import Google from '../components/google/Google';
import InfoCard from '../components/InfoCard';
import { getDBPath, readDB } from '../backend';
const { parse } = require('node-html-parser');
const lda = require('lda');
const Sentiment = require('sentiment');

const Home = () => {
  const [fileUploadStatus, setFileUploadStatus] = useState("");
  const [file, setFile] = useState();
  const [downloadFiles, setDownloadFiles] = useState([]);
  const [dbPath, setDBPath] = useState('');
  const [instructionCard, setInstructionCard] = useState('');
  const [deleteCard, setDeleteCard] = useState('');
  const [db, setDB] = useState({});

  const warningStatusPrefix = 'Warning: ';
  const loadingStatus = 'Loading';

  useEffect(() => {
    fetchDB();
    findDBPath();
  }, []);
  
  useEffect(() => {
    listFiles();
  }, [db]);

  const fetchDB = async () => {
    const db = await readDB();
    setDB(db || {});
  }

  const findDBPath = async () => {
    const dbPath = await getDBPath();
    setDBPath(dbPath);
  }

  const listFiles = async () => {
    if (db && db.files) setDownloadFiles(db.files);
    else setDownloadFiles([]);
  }

  return (
    <div>
      <h1>Home</h1>
      <div className='home-container'>

        <div>
          <InfoCard 
            title='How it Works'
            content={
              <>
                <h5>Local App</h5>
                  <div>
                    <strong>Your data is processed completely locally and does not leave your computer</strong><br/>
                    This is a desktop app run directly on your computer and can be run completely offline, with the exception of the map component<br/>
                    When scrolling through the map, the app fetches the tile (background) from OpenStreetMap through the URL "https://s.tile.openstreetmap.org/z/x/y.png"<br/>
                    Below is a sample of a fetched tile, which only contains information about where you are currently zoomed in on the map and <strong>none of your locations</strong> (markers)<br/>
                    You may verify there is no other internet access through the network tab in dev tools (Ctrl + Shift + I)<br/>
                    <img src={require('../img/sample-tile.png')} />
                  </div>
                <h5>Data Accuracy</h5>
                  <div>
                    While we aim to interperate your data downloads accurately, its lack of documentation and evolving format has made this difficult<br/>
                    Therefore, information presented in this app, including any description of the data, may not be entirely accurate or interpreted accurately and should not be taken completely at face value<br/>
                  </div>
                <h5>Bugs and Issues</h5>
                  <div>
                    This app is developed for research purposes with limited resources, so there are likely bugs present, if you encounter any issues or have any suggestions, feel free to message the us at s2157573@ed.ac.uk<br/>
                    We apologies for any inconvenience caused and wll be grateful for your contribution to improve the app
                  </div>
              </>
            }
          />
          <ol>
            <h5><li>Obtain data downloads from online platforms</li></h5>
            See below for instructions and supported platforms: <br/>
            <button onClick={() => {setInstructionCard(instructionCard === 'google' ? '' : 'google')}} className={instructionCard === 'google' ? 'highlighted' : ''}>Google</button>&nbsp;
            <button onClick={() => {setInstructionCard(instructionCard === 'instagram' ? '' : 'instagram')}} className={instructionCard === 'instagram' ? 'highlighted' : ''}>Instagram</button>&nbsp;
            <button disabled onClick={() => {setInstructionCard(instructionCard === 'facebook' ? '' : 'facebook')}} className={instructionCard === 'facebook' ? 'highlighted' : ''}>Facebook (coming soon)</button>&nbsp;
            <button disabled onClick={() => {setInstructionCard(instructionCard === 'x' ? '' : 'x')}} className={instructionCard === 'x' ? 'highlighted' : ''}>X (Twitter) (coming soon)</button>&nbsp;
            <button disabled onClick={() => {setInstructionCard(instructionCard === 'linkedin' ? '' : 'linkedin')}} className={instructionCard === 'linkedin' ? 'highlighted' : ''}>LinkedIn (coming soon)</button>&nbsp;
            {
              instructionCard === 'google' &&
              <Card toggleCard={() => {setInstructionCard('')}} title='Download your data from Google' content=
              {
                <ol>
                  <li>Go to <a href='https://takeout.google.com/' target='_blank'>Google Takeout (https://takeout.google.com/)</a> while logged in to your Google account</li>

                  <li>Select data you want to download (select all for a comprehensive review), then deselect <i>Drive</i> to reduce download size<br/><img src={require('../img/google1.png')} /></li>
                  <li>Click <i>Next Step</i><br/><img src={require('../img/google2.png')} /></li>
                  <li>Select <i>Transfer to: Send download link via email</i> and <i>Frequency: Export once</i><br/><img src={require('../img/google3.png')} /></li>
                  <li>Select <i>File type: .zip</i>, <i>File size: 1 GB</i> and click <i>Create export</i><br/><img src={require('../img/google4.png')} /></li>
                  <li>Your request has been sent and it might take a couple of hours or days<br/><img src={require('../img/google5.png')} /></li>
                  <li>Download your data when you have received this email from Google, your data downloads should be (multiple) files in the form of <strong>takeout-xxxx-xxx.zip</strong><br/><img src={require('../img/google6.png')} /></li>
                </ol>
              }/>
            }
            {
              instructionCard === 'instagram' &&
              <Card toggleCard={() => {setInstructionCard('')}} title='Download your data from Instagram' content=
              {
                <ol>
                  <li>Follow the instructions on <a href='https://help.instagram.com/181231772500920' target='_blank'>https://help.instagram.com/181231772500920</a>, these steps are written with reference to it</li>
                  <li>Go to <a href='https://accountscenter.instagram.com/info_and_permissions/' target='_blank'>https://accountscenter.instagram.com/info_and_permissions/</a> while logged in to your Instagram/Meta account</li>
                  <li>Click <i>Download your information</i><br/><img src={require('../img/instagram1.png')} /></li>
                  <li>Click <i>Download or transfer information</i><br/><img src={require('../img/instagram2.png')} /></li>
                  <li>Select your Instagram account<br/><img src={require('../img/instagram3.png')} /></li>
                  <li>Click <i>All available information</i><br/><img src={require('../img/instagram4.png')} /></li>
                  <li>Click <i>Download to device</i><br/><img src={require('../img/instagram5.png')} /></li>
                  <li>Select <i>Format: JSON</i> and the <i>Date range</i> and <i>Media quality</i> you desire<br/><img src={require('../img/instagram6.png')} /></li>
                  <li>Your request has been sent and it might take a couple of hours or days<br/><img src={require('../img/instagram7.png')} /></li>
                  <li>Download your data when you have received this email from Instagram, your data downloads should be files in the form of <strong>instagram-xxxx-xxx.zip</strong><br/><img src={require('../img/instagram8.png')} /></li>
              </ol>
              }/>
            }
            <h5><li>Upload the data download zip files to the app</li></h5>
            Use the <strong>Process your data downloads</strong> section on the right
            <h5><li>The app processes the data downloads locally and presents you with insights derived from it</li></h5>
            All data is processed locally on your machine, that means the app works even without internet
            <h5><li>Explore your data!</li></h5>
            Explore data of different categories, for example Activity, Topics, Locations and different apps
            <h5><li>Want to take control of your data?</li></h5>
            <u><strong>Take action</strong></u> to inspect all your data, set your data preferences and delete data you don't want online platforms to keep:<br/>
            <button onClick={() => {setDeleteCard(deleteCard === 'google' ? '' : 'google')}} className={deleteCard === 'google' ? 'highlighted' : ''}>Google</button>&nbsp;
            <button onClick={() => {setDeleteCard(deleteCard === 'instagram' ? '' : 'instagram')}} className={deleteCard === 'instagram' ? 'highlighted' : ''}>Instagram</button>&nbsp;
            {
              deleteCard === 'google' &&
              <Card toggleCard={() => {setDeleteCard('')}} title='Inspect and delete your google data' content=
              {
                <ul>
                  <li>Google data and privacy dashboard: <a href='https://myaccount.google.com/data-and-privacy' target='_blank'>https://myaccount.google.com/data-and-privacy</a></li>
                  <li>Chrome privacy and security centre: <a href='chrome://settings/privacy' target='_blank'>chrome://settings/privacy</a></li>
                  <li>Delete browsing data: <a href='chrome://settings/clearBrowserData' target='_blank'>chrome://settings/clearBrowserData</a></li>
                </ul>
              }/>
            }
            {
              deleteCard === 'instagram' &&
              <Card toggleCard={() => {setDeleteCard('')}} title='Inspect and delete your Instagram (Meta) data' content=
              {
                <ul>
                  <li>High level overview of your data at Meta accounts centre: <a href='https://accountscenter.facebook.com/info_and_permissions' target='_blank'>https://accountscenter.facebook.com/info_and_permissions</a></li>
                  <li>Detailed information portal: <a href='https://www.facebook.com/your_information/' target='_blank'>https://www.facebook.com/your_information/</a></li>
                  <li>Manage Off-meta activities: <a href='https://accountscenter.instagram.com/info_and_permissions/off_facebook_activity/' target='_blank'>https://accountscenter.instagram.com/info_and_permissions/off_facebook_activity/</a></li>
                </ul>
              }/>
            }
          </ol>
        </div>

        <div className='upload-container'>
          <h4>Process your data downloads</h4>
          <div>Please upload a zip file</div>
          <input type='file' formEncType='multipart/form-data' name='zipfile' onChange={ (e) => {setFile(e.target.files[0]); setFileUploadStatus('')}}></input>
          <div className='mt-2 mb-3'>
            <button>Upload file</button>
            {fileUploadStatus && 
              fileUploadStatus === loadingStatus ? <span><span className='loading-icon'></span> Please wait and do not refresh or close the window, this might take a while depending on file size and your computer</span>: 
              fileUploadStatus.includes(warningStatusPrefix) ? 
                <span className='warning'> {fileUploadStatus.replace(warningStatusPrefix, '')}</span> :
                <span className='success'> {fileUploadStatus}</span>}
          </div>
          <div>
            <strong>Your data downloads</strong>
            <a data-tooltip-id="downloads-info-tooltip" data-tooltip-content={`Useful info from your data downloads is parsed and stored in ${dbPath},db.md,chat.json and nowhere else`}>
              &nbsp;<sup><FaInfoCircle/></sup></a>
            <Tooltip id="downloads-info-tooltip" clickable />
            {downloadFiles.length > 0 ? <div>
              {downloadFiles.map((file, index) => (
                <div key={index}>{file}</div>
              ))}
              <button>Clear all my data</button></div>:
              <div>You do not have any data downloads</div>}
          </div>
        </div>

        <Activity db={ db } isHome={ true }/>
        <Dialogue db={ db } isHome={ true }/>
        <Location db={ db } isHome={ true }/>
        <Interests db={ db } isHome={ true }/>
        <Pi db={ db } isHome={ true }/>
        <Instagram db={ db } isHome={ true }/>
        <Google db={ db } isHome={ true }/>
      </div>
    </div>
  )
}

export default Home