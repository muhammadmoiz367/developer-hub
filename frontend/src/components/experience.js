import React, { Fragment } from 'react'
import { Table, Space } from 'antd';
import {connect} from 'react-redux'
import Moment from 'react-moment'

import {deleteExperience} from '../redux/actions/profile'

const Experience = ({experience, deleteExperience}) => {
    const columns = [
        {
          title: 'Company',
          dataIndex: 'company',
          key: 'company'
        },
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from'
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to'
        },
        {
            title: 'Action',
            key: 'action',
            render: (data, record) => (
              <Space size="middle">
                <a onClick={()=>deleteExperience(data.key)} >Delete</a>
              </Space>
            ),
          }
      ];
      const data=experience.map(exp=>{
          return{
              key: exp._id,
              company: exp.company,
              title: exp.title,
              from: <Moment format="DD/MM/YYYY">{exp.from}</Moment>,
              to: exp.current === true ? 'Current' : <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          }
      })
      console.log(experience)
    return (
        <div className="m-2">
            <h2>Experience credentials</h2>
            <Table  size="middle" columns={columns} dataSource={data} pagination={false} />
        </div>
    )
}

export default connect(null, {deleteExperience})(Experience)