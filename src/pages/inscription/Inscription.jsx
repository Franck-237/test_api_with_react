import { Stack, Typography } from '@mui/material';
import React from 'react';
import boy from '../../assets/images/boy.png';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Inscription() {

  const navigate = useNavigate()
  const {handleSubmit, register, formState: {errors}} = useForm();
  const onSubmit = (data) => {
    if(data.motDePasse !== data.motDePasseConfirmation) {
      toast.error("Les mots de passe ne sont pas identiques")
    }else{
      axios.get(`http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}`)
      .then((res) => {
        if(res.data.length > 0) {
          toast.error("Un compte existe déjà avec cette adresse mail")
        } else {
          axios.post("http://localhost:3000/utilisateurs", data)
          .then((res) => {
            console.log(res);
            toast.success('Inscription réussie');
            navigate('/connexion');
          })
          .catch((err) => {
            console.log(err);
            toast.error("Une erreur est survenue");
          })
        }
      })
    }
  };

  return (
    <Stack className='font-opensans container pt-5 mx-auto'>
      <Typography variant="h5" className='text-center'>Inscription</Typography>
      <div className='container mx-auto my-10 max-w-[500px] lg:max-w-[1000px] bg-gray-100 border rounded-xl'>
        <form action="" method='post' className='flex justify-center' onSubmit={handleSubmit(onSubmit)}>
          <div className='py-10'>
            <div>
              <input type="text" name="" id="" placeholder="Votre Nom" className='border px-4 py-2 rounded-xl w-[300px] md:w-[400px] mb-5 ml-3' {...register("nomUtilisateur", {required:"Veuillez saisir un nom"})}/>
            </div>
            <div>
              <input type="email" name="" id="" placeholder="Votre email" className='border px-4 py-2 rounded-xl w-[300px] md:w-[400px] mb-5 ml-3' {...register("mailUtilisateur", {required:"Veuillez saisir votre adresse mail", pattern : "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"})}/>
            </div>
            <div>
              <input type="password" placeholder="Votre mdp" name="" id="" className='border px-4 py-2 rounded-xl w-[300px] md:w-[400px] mb-5 ml-3' {...register("motDePasse", {required:"Veuillez saisir un mot de passe", minLength: {value: 6, message: "Veuillez saisir un mot de passe de plus de 5 caractères"}})}/>
            </div>
            <div>
              <input type="password" placeholder="Confirmer votre mdp" name="" id="" className='border px-4 py-2 rounded-xl w-[300px] md:w-[400px] mb-5 ml-3' {...register("motDePasseConfirmation", {required:"Veuillez saisir un mot de passe", minLength: {value: 6, message: "Veuillez saisir un mot de passe de plus de 5 caractères"}})}/>
            </div>
            <div>
              <input type="submit" value="S'inscrire" className='mt-10 border text-white bg-orange-300 rounded-xl py-2 px-5 ml-3 text-center'/>
            </div>
          </div>
          <div className='hidden lg:block'>
            <img src={boy} alt="" className='w-[600px] h-auto'/>
          </div>
        </form>
      </div>
    </Stack>
  )
};
