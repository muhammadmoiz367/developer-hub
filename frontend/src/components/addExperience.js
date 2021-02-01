import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Input, Checkbox, Button} from 'antd';
import { FaCodeBranch } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { MdTitle } from 'react-icons/md';
import { HiOfficeBuilding } from 'react-icons/hi';
import {GoCalendar} from 'react-icons/go'

import { addExperience } from '../redux/actions/profile';

const { TextArea } = Input;

const AddExperience = ({ addExperience, history }) => {
  const [currentDate, setCurrentDate] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: true,
    description: '',
  });
  const { company, title, location, from, to, current, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    addExperience(formData, history);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <FaCodeBranch /> Add any developer/programming positions that you have
        had in the past
      </p>
      <br />
      <div className='profile-form'>
        <Input
          size='large'
          placeholder='Title'
          name='title'
          prefix={<MdTitle />}
          value={title}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <Input
          size='large'
          placeholder='Company'
          name='company'
          prefix={<HiOfficeBuilding />}
          value={company}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <Input
          size='large'
          placeholder='Location'
          name='location'
          prefix={<MdLocationOn />}
          value={location}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <div className='date'>
            <div>
                <GoCalendar />
                <span className="date-input-label" >Starting date</span>
                <input 
                    type="date" 
                    value={from}
                    className="date-input"
                    onChange={(e)=>{
                        handleChange(e);
                    }}
                    name='from'
                    />
                    <Checkbox
                    onChange={(e) => {
                    setFormData({ ...formData, current: e.target.checked });
                    setCurrentDate(!currentDate);
                    }}
                    checked={current}
                    style={{
                    verticalAlign: 'middle',
                    margin: '0 1rem',
                    marginTop: '0px',
                    }}
                >
                    Current
                </Checkbox>
            </div>
          {currentDate && (
              <Fragment>
                  <br/>
                  <GoCalendar />
                  <span className="date-input-label">Ending date</span>
                  <input 
                    type="date"
                    value={to}
                    onChange={(e)=>handleChange(e)}
                    className="date-input"
                    name='to'
                    />
              </Fragment>
          )}
        </div>
        <br />
        <TextArea
          rows={4}
          placeholder='A brief description about job'
          name='description'
          value={description}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <div className='profile-submit-btn'>
          <Link to='/dashboard'>
            <Button shape='round' size='large' className='back-btn'>
              Go Back
            </Button>
          </Link>
          <Button
            type='primary'
            shape='round'
            size='large'
            style={{ width: '20%' }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { addExperience })(withRouter(AddExperience));
