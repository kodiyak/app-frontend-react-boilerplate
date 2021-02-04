import React from 'react'
import Head from 'next/head'
import AdminMasterPage from '../../components/MasterPages/AdminMasterPage'

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminMasterPage>Salve</AdminMasterPage>
    </div>
  )
}

export default Home
