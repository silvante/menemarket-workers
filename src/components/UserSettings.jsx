import React, { useState } from 'react'

const UserSettings = ({userProfile}) => {
  const [imageBase64, setImageBase64] = useState(null);

  const [name, setname] = useState(userProfile.name)
  const [bio, setbio] = useState(userProfile.bio)
  const [avatar, setavatar] = useState(userProfile.avatar)
  const [username, setusername] = useState(userProfile.username)



  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      setImageBase64(reader.result);
      uploadToServer(reader.result);
    };

    reader.onerror = (error) => {
      console.error("Error converting image to Base64:", error);
    };
  };

  return (
    <div className='flex-1 bg-white rounded-3xl border p-5'>
        <h2 className='text-xl mb-5'>Malumotlarni sozlash</h2>
        <form className='space-y-5'>
          <div className='w-full space-y-1'>
            <p>Profil uchun rasm*</p>
            <label htmlFor="base64" className='bg-gray-300 w-24 h-24 flex items-center justify-center rounded-xl overflow-hidden'>
              {
                imageBase64 ? (
                  <img src={imageBase64} alt="base64" className='w-full h-full aspect-square object-cover' />
                ) : (
                  <i className='bx bx-image-add text-3xl'></i>
                )
              }
            </label>
            <input type="file" id='base64' accept='image/*' onChange={handleImageUpload} className='hidden' />
          </div>
          <div className='w-full space-y-1'>
            <label htmlFor="bio">Shaxsiy bio*</label>
            <input type="text" id="bio" className='bg-gray-200 border outline-none py-3 px-5' placeholder='maximum 225 ta harf' />
          </div>
          <div className='flex gap-5'>
            <div className='flex-1 space-y-1'>
              <label htmlFor="name">ismni taxrirlash*</label>
              <input type="text" id="name" className='bg-gray-200 border outline-none py-3 px-5' placeholder='maximum 225 ta harf' />
            </div>
            <div className='flex-1 space-y-1'>
              <label htmlFor="username">foidalanuvchi nomini taxrirlash*</label>
              <input type="text" id="username" className='bg-gray-200 border outline-none py-3 px-5' placeholder='maximum 225 ta harf' />
            </div>
          </div>
          <div className='flex flex-col justify-start space-y-1'>
            <label>malumotlarni saqlash*</label>
            <button type='submit' className='btn-primary py-2 px-5 w-56'>O'zgarishlarni saqlash</button>
          </div>
        </form>
    </div>
  )
}

export default UserSettings