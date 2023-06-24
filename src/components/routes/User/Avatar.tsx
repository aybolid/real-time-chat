import React from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import Button from '../../elements/Button';
import LoadAvatarModal from './modals/LoadAvatarModal';
import { useAppSelector } from '../../../app/hooks';
import { selectUserData } from '../../../app/features/currentUser/currentUserSlice';

export default function Avatar() {
  const [showLoadFile, setShowLoadFile] = React.useState(false);

  const data = useAppSelector(selectUserData);

  return (
    <>
      <div className="glass flex items-center justify-center gap-4 rounded-md bg-white p-4 shadow-md">
        <div className="group relative grid h-24 w-24 place-items-center overflow-hidden rounded-full">
          <img
            src={'/avatar-placeholder.svg'}
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
          <h2 className="text-xl font-semibold">{data?.name}</h2>
          <p>{data?.email}</p>
        </div>
      </div>
      {showLoadFile && <LoadAvatarModal setShowLoadFile={setShowLoadFile} />}
    </>
  );
}
