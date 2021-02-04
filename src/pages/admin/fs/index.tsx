import React from 'react'
import BoxFileSystemList from '../../../components/FileSystem/BoxFileSystemList'
import AdminMasterPage from '../../../components/MasterPages/AdminMasterPage'
import AdminPageDefault from '../../../components/MasterPages/AdminMasterPage/src/AdminPageDefault'
import BoxContent from '../../../components/Utils/BoxContent'
import Col from '../../../components/Utils/Col'

const fs: React.FC = () => {
  return (
    <AdminMasterPage>
      <AdminPageDefault titleLabel="File System">
        <BoxContent>
          <BoxFileSystemList />
        </BoxContent>
      </AdminPageDefault>
    </AdminMasterPage>
  )
}

export default fs
