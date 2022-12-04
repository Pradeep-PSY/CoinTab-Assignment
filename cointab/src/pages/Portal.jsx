import { Box, Text } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetData } from '../actions/Action'

const Portal = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(state=>state.auth)
    useEffect(()=>{
        dispatch(GetData())
    },[])
  return (
    <Box textAlign='center'>
        {
            data ? (
                <Box>

                <Text m='2' fontSize={'2xl'} color='green'>Name: {data.name.toUpperCase()}</Text>
                <Text m='2' fontSize={'2xl'} color='green'>Email: {data.email}</Text>
                </Box>
            ) :(
                ''
            )
        }
    </Box>
  )
}

export default Portal