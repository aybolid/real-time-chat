import React from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import useScrollLock from '../../../hooks/useScrollLock';
import ModalWrapper from '../../elements/ModalWrapper';
import { MdClose, MdUpload } from 'react-icons/md';
import { useDropzone } from 'react-dropzone';
import Button from '../../elements/Button';
import bytesToKb from '../../../utils/bytesToKb';
import { uploadUserAvatar } from '../../../lib/supabase/bucket';
import { useAuth } from '../../../lib/supabase/auth';

export default function LoadAvatarModal({
  setShowLoadFile,
}: {
  setShowLoadFile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    data: { user },
  } = useAuth();

  const ref = React.useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setShowLoadFile(false));
  useScrollLock();

  const [files, setFiles] = React.useState<File[]>([]);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileUpload = async () => {
    const { error } = await uploadUserAvatar(
      files[0],
      user?.id as string
    ).finally(() => {
      setFiles([]);
      setShowLoadFile(false);
    });
    if (error) {
      alert(error.message);
    }
  };

  const FilesTable = (): JSX.Element => {
    return (
      <div className="relative mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase">
            <tr>
              <th scope="col" className="border px-6 py-3">
                Preview
              </th>
              <th scope="col" className="border px-6 py-3">
                File name
              </th>
              <th scope="col" className="border px-6 py-3">
                File type
              </th>
              <th scope="col" className="border px-6 py-3">
                File size
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((f) => (
              <tr key={f.name} className="border-b last:border-none">
                <th
                  scope="row"
                  className="whitespace-nowrap border px-6 py-2 font-medium text-white"
                >
                  <img
                    src={URL.createObjectURL(f)}
                    alt="Preview"
                    className="h-12 w-12 rounded-full"
                  />
                </th>
                <td className="border px-6 py-2">{f.name}</td>
                <td className="border px-6 py-2">{f.type}</td>
                <td className="border px-6 py-2">{bytesToKb(f.size)} Kb</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <ModalWrapper>
      <div
        className="glass w-full max-w-3xl rounded-md bg-white p-4 text-white shadow-lg"
        ref={ref}
      >
        <div className="flex w-full items-start justify-between gap-2">
          <h2 className="mb-4 text-xl font-semibold">Upload Avatar</h2>
          <Button
            title="Close"
            onClick={() => setShowLoadFile(false)}
            className="opacity-60 hover:opacity-100"
          >
            <MdClose size={28} />
          </Button>
        </div>

        <div
          {...getRootProps()}
          className="w-full cursor-pointer rounded-md border-2 border-dashed border-white bg-white/20 p-8 text-center"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-4">
            <MdUpload size={36} />
            <p className="my-2 text-sm">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <small>PNG, JPG or JPEG</small>
          </div>
          <input
            {...getInputProps({ maxLength: 1, multiple: false })}
            className="hidden"
          />
        </div>

        {files.length > 0 && <FilesTable />}

        <div className="mt-4 flex w-full items-center justify-end">
          <Button
            onClick={handleFileUpload}
            disabled={files.length === 0}
            className="btn-lg btn-success flex items-center justify-center gap-2"
          >
            <MdUpload size={24} />
            <span>Upload</span>
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
