
import ProfileForm from './profle-form'
import classes from './user-profile.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function UserProfile() {
  // Redirect away if NOT auth
  // const router = useRouter();
  // const { data: session,status } = useSession()

  // if (status === "unauthenticated") {
  //   router.push('/auth');
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
