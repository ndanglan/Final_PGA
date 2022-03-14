import React, { useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { CloseIcon, CameraAltIcon } from '../Icons';
import InputGroup from '../Layout/InputGroup';
import defaultImg from '../../../../no-image-icon.png';
import { DARK_PURPLE } from '../../../../configs/colors'


interface IFileInputProps {
  name: string,
  label: string,
  required: boolean,
  images?: { file: string, id: string }[]
}

const ControlFileInput = (props: IFileInputProps) => {
  const {
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext();

  const [images, setImages] = useState<string[]>([]);

  const removeImage = (id: number) => {
    // lấy file array từ react hook form 
    const fileArray: File[] = getValues('images');
    // lấy giá trị imagesOrder từ react hook form 
    const imagesOrderArray = getValues('imagesOrder');
    // lấy giá trị deleted_images từ react hook form 
    const imagesDeletedArray = getValues('deleted_images');

    // xóa trong images và imagesOrder
    const afterDeletedFileArray = fileArray.filter((item, index) => index !== id);
    const afterDeletedImageOrdersArray = imagesOrderArray.filter((item: string, index: number) => index !== id);

    setValue('images', afterDeletedFileArray);
    setValue('imagesOrder', afterDeletedImageOrdersArray);

    // lưu id của image được xóa vào mảng deleted_images
    if (props.images && props.images.length > 0) {
      const deletedImagesArray = props.images.filter((image, index) => index === id).map(item => +item.id);

      setValue('deleted_images', [...imagesDeletedArray, ...deletedImagesArray])
    }

    const newArrayDisplayImages = images.filter((image, index) => index !== id);
    setImages(newArrayDisplayImages)
  }

  const addImages = (files: any) => {
    // create URL để hiển thị 
    const urlArray = [...files].map(file => URL.createObjectURL(file));

    // lọc name để thêm vào imagesOrder
    const nameArray = [...files].map(file => file.name);

    setImages((prev) => ([...prev, ...urlArray]))

    // lưu tên theo order
    setValue('imagesOrder', [...getValues('imagesOrder'), ...nameArray])

    // set các file vào images trong react hook form 
    setValue('images', [...getValues('images'), ...files])
  }

  useEffect(() => {
    if (props.images && props.images.length > 0) {
      setImages(props.images.map(image => image.file))
    }
  }, [props.images])

  return (
    <InputGroup
      label={props.label}
      required={props.required}
      inputSize={8}
      errorsType={
        errors[`${props.name}`]
          ? 'required'
          : undefined
      }
    >
      <Dropzone
        onDrop={(e) => {
          addImages(e);
        }}>
        {({ getRootProps, getInputProps }) => (
          <>
            <input
              {...getInputProps()}
              name={props.name}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  addImages(e.target.files);
                }
              }}
            />
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              flexWrap: 'wrap'
            }}>
              {!!images?.length && images.map((image, index) => {
                // console.log(image);
                return (
                  <span
                    style={{
                      position: 'relative'
                    }}
                    key={index}>
                    <img
                      src={image}
                      alt='image'
                      style={{
                        width: '130px',
                        height: '130px',
                        marginRight: '15px',
                      }}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = defaultImg
                      }}
                    />
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        position: 'absolute',
                        backgroundColor: DARK_PURPLE,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        right: '10px',
                        top: '0px',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        removeImage(index)
                      }}
                    >
                      <CloseIcon sx={{ color: '#000' }} />
                    </div>
                  </span>
                )
              })}
              <div
                style={{
                  width: '130px',
                  height: '130px',
                  border: '1px dashed #fff',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                {...getRootProps()}
              >
                <CameraAltIcon
                  sx={{
                    width: '50px',
                    height: '50px'
                  }}
                />
              </div>
            </div>
          </>
        )}
      </Dropzone>
    </InputGroup>
  )
}

export default ControlFileInput