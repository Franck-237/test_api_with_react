import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  
  const navigate = useNavigate();
  useEffect (() => {
    if(localStorage.getItem("utiisateur")){
      navigate('/connexion')
    }
  });
  
  return (
    <div>Dashboard</div>
  )
}
