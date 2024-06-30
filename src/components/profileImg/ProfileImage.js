import React from 'react'
import profileImg from "../../assets/images/profileImg.png"

const ProfileImage = ({ img }) => {
    return (
        <img src={img || profileImg} className='profile-img' />
    )
}

export default ProfileImage
