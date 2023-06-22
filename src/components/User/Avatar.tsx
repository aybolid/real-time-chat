import React from 'react';
import getAvatarPlaceholder from '../../utils/getAvatarPlaceholder';
import { User } from '@supabase/supabase-js';
import UserMeta from '../../interfaces/Auth/UserMetadata';
import { MdPhotoCamera } from 'react-icons/md';
import Button from '../elements/Button';
import LoadAvatarModal from './modals/LoadAvatarModal';

export default function Avatar({ user }: { user: User }) {
  const [showLoadFile, setShowLoadFile] = React.useState(false);

  const data = user.user_metadata as UserMeta;

  return (
    <>
      <div className="glass flex items-center justify-center gap-4 rounded-md bg-white p-4 shadow-md">
        <div className="group relative grid h-24 w-24 place-items-center overflow-hidden rounded-full">
          <img
            src={getAvatarPlaceholder(data.name)}
            alt="Avatar"
            className="w-full"
          />
          <Button
            onClick={() => setShowLoadFile(true)}
            title="Change Avatar"
            className="absolute left-0 top-0 hidden h-full w-full place-items-center gap-0 bg-black/40 group-hover:grid"
          >
            <MdPhotoCamera className="text-white" size={28} />
          </Button>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{data.name}</h2>
          <p>{user?.email}</p>
        </div>
      </div>
      {showLoadFile && <LoadAvatarModal setShowLoadFile={setShowLoadFile} />}
    </>
  );
}
