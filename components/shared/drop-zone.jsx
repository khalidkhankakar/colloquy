import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
function Dropzone({fieldChange}) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept:
    {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*':['.mp4','.mkv','.WebM','.mov']
    } , // Accept both images and videos
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      fieldChange(acceptedFiles)
    },
  });

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    fieldChange(newFiles)
  };

  const thumbs = files.map((file,index) => (
    <div
      className="inline-flex border border-gray-300 rounded mr-2 mb-2 p-1 relative"
      key={file.name}
    >
      <ImCross className="absolute top-0 right-0 h-6 w-6 cursor-pointer rounded-full p-1"  onClick={() => removeFile(index)}/>
      <div className="flex items-center justify-evenly flex-wrap overflow-hidden">
        {file.type.startsWith("image") ? ( // Check if the file is an image
          <Image
            src={file.preview}
            className="h-28 w-20 object-fill"
            alt={file.name}
            width={400}
            height={400}
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        ) : (
          <video
            src={file.preview}
            className=" h-28 w-20"
            alt={file.name}
            poster="/assets/videoposter.png"
            controls={false} // Add controls for video playback
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        )}
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="w-full h-44 overflow-y-auto ">
      {files.length <= 0 ? (
        <div
          {...getRootProps({
            className: "dropzone border space-y-2 cursor-pointer w-full flex-center flex-col border-gray-300 h-full rounded p-2",
          })}
        >
          <input {...getInputProps()} />
          <BsFillFileEarmarkPlusFill className="h-16 w-16 " />
          <p className="text-sm tracking-widest">Drag 'n' drop images/videos</p>
        </div>
      ) : (
        <aside className="flex  flex-wrap mt-4">{thumbs}</aside>
      )}
    </section>
  );
}

export default Dropzone;
