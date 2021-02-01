import React from 'react'
import { Table, Space } from 'antd';
import {connect} from 'react-redux'
import Moment from 'react-moment'

import {deleteEducation} from '../redux/actions/profile'

const Education = ({education, deleteEducation}) => {
    const data=education.map(edu=>{
        return{
            key: edu._id,
            school: edu.school,
            degree: edu.degree,
            from: <Moment format="DD/MM/YYYY">{edu.from}</Moment>,
            to: edu.current === true ? 'Current' : <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        }
    })
    const handleClick=(data)=>{
        console.log(data.key)
        deleteEducation(data.key);
        window.location.reload()
    }
    const columns = [
        {
          title: 'School',
          dataIndex: 'school',
          key: 'school'
        },
        {
          title: 'Degree',
          dataIndex: 'degree',
          key: 'degree',
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
                  <a onClick={()=>handleClick(data)} >Delete</a>
                </Space>
              ),
          }
      ];
      
      console.log(education)
    return (
        <div className="m-2">
            <h2>Education credentials</h2>
            {data.length>0
            ? (<Table  size="middle" columns={columns} dataSource={data} pagination={false} />)
            : (<p>No data to show</p>)
            }
        </div>
    )
}

export default connect(null, {deleteEducation})(Education)