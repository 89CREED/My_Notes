import React from 'react'
import { Select, Input } from '@chakra-ui/react'

const Filters = ({filter, setFilter}) => {
  return (
    <div className='flex flex-col gap-5'>
          <Input placeholder='Search' onChange={(e) => setFilter({...filter, search: e.target.value})}/>
          <Select onChange={(e) => setFilter({...filter, sortOrder: e.target.value})}>
            <option value="desc">New</option>
            <option value="asc">Old</option>
          </Select>
        </div>
  )
}

export default Filters