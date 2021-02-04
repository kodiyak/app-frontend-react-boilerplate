import React from 'react'
import Head from 'next/head'
import AdminMasterPage from '../components/MasterPages/AdminMasterPage'
import Row from '../components/Utils/Row'

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Row>Salve quebradinha rsrsrs</Row>
    </div>
  )
}

export default Home
