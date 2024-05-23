import React from 'react'
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'

export default function Dashboard() {
  
  const navigate = useNavigate();
  useEffect (() => {
    if(localStorage.getItem("utiisateur")){
      navigate('/connexion')
    }
  });
  
  return (
    <div>
      <Link to='/inscription'>Inscription</Link>
      <Link to='/connexion'>Connexion</Link>
    </div>
  )
}
