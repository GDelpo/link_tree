import React from 'react';
import MorphingAvatar from './MorphingAvatar';
import ProfileInfo from './ProfileInfo';
import CircularSocialLinks from './CircularSocialLinks';
import { profileData } from '../data/content'; 

const ProfileHeader = () => {
  return (
    <div className="max-w-4xl w-full">
      <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-8 md:gap-12">
        <div className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56">
          <MorphingAvatar imageUrl={profileData.profileImage} />
        </div>
        <div className="flex flex-col">
          <ProfileInfo
            name={profileData.name}
            titles={profileData.typewriterTitles}
            description={profileData.description}
          />
          <div className="mt-6">
            <CircularSocialLinks links={profileData.socials} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;