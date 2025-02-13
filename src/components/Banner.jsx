import React from 'react'
import InfoCard from './InfoCard'

const Banner = () => {
  return (
    <div className='banner'>
      <strong>This is a demo site with synthetic data for evaluation, it would be great if you could fill in this survey: <a href='https://forms.office.com/e/dpDWFVCT2U' target='_blank'>https://forms.office.com/e/dpDWFVCT2U</a>, thanks!<br/>
      Please use a computer or landscape mode for the best experience</strong>
      <InfoCard
        title='Learn more'
        content={
          <>
            <h5>Welcome</h5>
            This is a demo site for the app See Your Data: A Tool to Discover What Online Platforms Know About You<br/>
            See Your Data is a desktop app that runs on your computer directly due to privacy reasons, so your data never leaves your computer<br/>
            This site is populated with <strong>synthetic data of a fake user persona</strong> for the purpose of rapid evaluation, there is no meaning attached to any of the data and parts of it is generated with AI<br/>
            Some features, such as uploading your own data and interacting with the chatbot are disabled If you are interested in seeing what insights the app can find from your own data, please visit <a href='https://github.com/samlhk/seeyourdata-local' target='_blank'>https://github.com/samlhk/seeyourdata-local</a> for dowload instructions.
            <h5>Evaluation survey</h5>
            We would greatly appreciate it if you could fill in an anonymous survey to tell us what you feel about the app <a href='https://forms.office.com/e/dpDWFVCT2U' target='_blank'>https://forms.office.com/e/dpDWFVCT2U</a><br/>
            This site is designed to behave exactly the same to the desktop app (apart from the disabled features mentioned above) and you may imagine you are viewing your own data when completing the survey<br/>
            For the best experience, <strong>please use this site using a computer or a larger device</strong><br/>
            Thank you!
            <h5>Contact</h5>
            Please contact me at s2157573@ed.ac.uk if you have any quesitons or would like to participate in an interview in further evaluating the app.
          </>
        }
      />
    </div>
  )
}

export default Banner