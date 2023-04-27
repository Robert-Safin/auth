import { FormEventHandler } from 'react';
import classes from './profile-form.module.css';
import { useRef, FC } from 'react';

interface Props {
  onChangePassword: (passwordData: { oldPassword: string, newPassword: string }) => void;

}

const ProfileForm: FC<Props> = (props) => {

  const oldPasswordRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)


  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault()

    const enteredOldPassword = oldPasswordRef.current?.value as string
    const enteredNewPassword = newPasswordRef.current?.value as string

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    })

  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
