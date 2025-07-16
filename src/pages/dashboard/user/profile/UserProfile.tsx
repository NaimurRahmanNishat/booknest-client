import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import avatarImg from "../../../../assets/images/avatar.png";
import { useDispatch, useSelector } from 'react-redux';
import { useEditUserProfileMutation } from '@/redux/features/auth/authApi';
import { setUser } from '@/redux/features/auth/authSlice';

type User = {
  _id: string;
  username: string;
  profileImage: string;
  bio: string;
  profession: string;
};

const UserProfile = () => {
  const { user } = useSelector((state: { auth: { user: User } }) => state.auth);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // form state
  const [formData, setFormData] = useState({
    username: '',
    profileImage: '',
    bio: '',
    profession: '',
    userId: ''
  });

  // user update formData 
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        profileImage: user.profileImage || '',
        bio: user.bio || '',
        profession: user.profession || '',
        userId: user._id || ''
      });
    }
  }, [user]);

  // form input 
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // RTK Query 
  const [editProfile] = useEditUserProfileMutation();

  // form submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUser = {
      username: formData.username,
      profileImage: formData.profileImage,
      bio: formData.bio,
      profession: formData.profession,
      userId: formData.userId
    };

    try {
      const response = await editProfile({ userId: user?._id, role: updatedUser }).unwrap();
      dispatch(setUser(response));
      alert("Profile Updated Successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <div>
        <div className='flex items-center mb-4'>
          <img
            src={formData.profileImage || avatarImg}
            alt="User avatar"
            className="w-32 h-32 object-cover rounded-full ring"
          />
          <div className='ml-6 space-y-1'>
            <h2 className='text-2xl font-bold'>Username: {formData.username || "N/A"}</h2>
            <p className="text-gray-700">User Bio: {formData.bio || "N/A"}</p>
            <p className="text-gray-700">Profession: {formData.profession || "N/A"}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className='ml-auto text-blue-500 hover:text-blue-700 cursor-pointer'
            aria-label="Edit Profile"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3H4a1 1 0 00-1 1v14a1 1 0 001 1h7m2 0h7a1 1 0 001-1V4a1 1 0 00-1-1h-7m-2 0v14"></path>
            </svg>
          </button>
        </div>
      </div>

      {
        isModalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
            <div className='bg-background p-6 rounded-lg md:w-96 max-w-xl mx-auto relative'>
              <button
                className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer'
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Edit Profile Modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <h2 className='text-2xl font-semibold mb-4'>Edit Profile</h2>

              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label htmlFor="username" className='block text-sm font-medium text-gray-700'>Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label htmlFor="profileImage" className='block text-sm font-medium text-gray-700'>Profile Image URL</label>
                  <input
                    type="text"
                    name="profileImage"
                    id="profileImage"
                    value={formData.profileImage}
                    onChange={handleChange}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label htmlFor="bio" className='block text-sm font-medium text-gray-700'>Write Bio</label>
                  <textarea
                    name="bio"
                    id="bio"
                    value={formData.bio}
                    rows={3}  
                    onChange={handleChange}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm'
                    required
                  />
                </div>

                <div className='mb-4'>
                  <label htmlFor="profession" className='block text-sm font-medium text-gray-700'>Profession</label>
                  <input
                    type="text"
                    name="profession"
                    id="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm'
                    required
                  />
                </div>

                <button
                  type='submit'
                  className='mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer'
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default UserProfile;
