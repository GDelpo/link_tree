import React, { memo } from 'react';
import MorphingAvatar from './MorphingAvatar';
import ProfileInfo from './ProfileInfo';
import CircularSocialLinks from './CircularSocialLinks';

const UserProfileHeader = memo(({ profileData }) => {
  return (
    <section className="max-w-4xl w-full" aria-labelledby="profile-heading">
      <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-8 md:gap-12">
        {/* Avatar del perfil */}
        <div className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56" role="img" aria-label="Foto de perfil">
          <MorphingAvatar imageUrl={profileData.profileImage} />
        </div>
        
        {/* Información del perfil */}
        <div className="flex flex-col">
          <ProfileInfo
            name={profileData.name}
            titles={profileData.titles}
            description={profileData.description}
          />
          
          {/* Enlaces sociales */}
          <nav className="mt-6" aria-label="Enlaces de redes sociales">
            <CircularSocialLinks links={profileData.socials} />
          </nav>
        </div>
      </div>
    </section>
  );
});

export default UserProfileHeader;