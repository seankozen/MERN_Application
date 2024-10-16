import React from 'react'

import './NewPlace.css';
import Input from '../../shared/components/FormElements/Input';

function NewPlace() {
  return (
    <form className='place-form'>
      <Input type="text" label="Title" validators={[]} errorText="Please enter a valid title." /*onInput={}*//>
    </form>
  )
}

export default NewPlace