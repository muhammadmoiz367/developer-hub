import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Input, Checkbox, Button } from 'antd';
import { FaGraduationCap, FaSchool } from 'react-icons/fa';
import { MdTitle } from 'react-icons/md';
import { GoCalendar } from 'react-icons/go';
import {RiNewspaperLine} from 'react-icons/ri'

import { addEducation } from '../redux/actions/profile';


const { TextArea } = Input;

const AddEducation = ({ addEducation, history }) => {
  const [currentDate, setCurrentDate] = useState(false);
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: true,
    description: '',
  });
  const { school, degree, fieldOfStudy, from, to, current, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    addEducation(formData, history);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <FaGraduationCap /> Add any school, bootcamp, etc that you have attended
      </p>
      <br />
      <div className='profile-form'>
        <Input
          size='large'
          placeholder='School or Bootcamp'
          name='school'
          prefix={<FaSchool />}
          value={school}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <Input
          size='large'
          placeholder='Degree or Certificate'
          name='degree'
          prefix={<RiNewspaperLine />}
          value={degree}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <Input
          size='large'
          placeholder='Field of study'
          name='fieldOfStudy'
          prefix={<MdTitle />}
          value={fieldOfStudy}
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

export default connect(null, { addEducation })(withRouter(AddEducation));
