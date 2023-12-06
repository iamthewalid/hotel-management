import { useUser } from '../../store';

const ProfileCard = () => {
  const user = useUser((state) => state.user);

  return (
    <div className="user-profile">
      <h1>My Profile</h1>

      <br />

      <p>
        <b>Name :</b> {user.name}
      </p>
      <p>
        <b>Email :</b> {user.email}
      </p>
      <p>
        <b>isAdmin :</b> {user.isAdmin ? 'YES' : 'NO'}
      </p>
    </div>
  );
};

export default ProfileCard;
