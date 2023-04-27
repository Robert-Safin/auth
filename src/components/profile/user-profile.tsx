
import ProfileForm from './profle-form'
import classes from './user-profile.module.css';

import {FC} from 'react'

const UserProfile:FC = () => {
  // Redirect away if NOT auth

  const ChangePassword = async(passwordData : {oldPassword:string, newPassword:string}) => {
    const response = await fetch("api/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type" : "application/json"
      }
    })

  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={ChangePassword}/>
    </section>
  );
}

export default UserProfile;
