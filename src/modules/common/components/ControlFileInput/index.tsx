import React, { useState, useEffect, memo } from 'react'
import Dropzone from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { CloseIcon, CameraAltIcon } from '../Icons';
import FormControlGroup from '../FormControlGroup';
import defaultImg from '../../../../no-image-icon.png';
import { DARK_PURPLE } from '../../../../configs/colors'
import { RequiredRuleProps } from '../../../../models/input';

interface IFileInputProps {
  name: string,
  label: string,
  required: RequiredRuleProps,
  images?: { file: string, id: string }[]
}

const ControlFileInput = (props: IFileInputProps) => {
  const {
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors }
  } = useFormContext();

  const [imagesSelected, setImagesSelected] = useState<{
    id: number | string | null,
    file: string
  }[]>();

  const removeImage = (id: number | string | null, indexOfSelectedImage: number) => {
    // lấy file array từ react hook form 
    const fileArray: File[] = getValues('images');
    // lấy giá trị imagesOrder từ react hook form 
    const imagesOrderArray = getValues('imagesOrder');
    // lấy giá trị deleted_images từ react hook form 
    const imagesDeletedArray = getValues('deleted_images');

    // xóa trong images và imagesOrder của react hook form 
    const afterDeletedFileArray = fileArray.filter((item, index: number) => index !== indexOfSelectedImage);
    const afterDeletedImageOrdersArray = imagesOrderArray.filter((_: any, index: number) => index !== indexOfSelectedImage);

    setValue('images', afterDeletedFileArray);
    setValue('imagesOrder', afterDeletedImageOrdersArray);

    // lưu id của image được xóa vào mảng deleted_images
    if (id && props.images && props.images.length > 0) {
      const deletedImagesArrayAvailable = props.images.filter((image) => +image.id === +id).map(item => +item.id);
      setValue('deleted_images', [...imagesDeletedArray, ...deletedImagesArrayAvailable])
    }

    setImagesSelected((prev) => {
      if (prev) {
        const newArrayDisplayImages = prev.filter((image, index) => index !== indexOfSelectedImage);

        return newArrayDisplayImages
      }

      return prev
    })
  }

  const addImages = (files: any) => {
    // create URL để hiển thị 
    const urlArray = [...files].map(file => ({
      id: null,
      file: URL.createObjectURL(file)
    }));

    // lọc name để thêm vào imagesOrder
    const nameArray = [...files].map(file => file.name);

    // set image để hiển thị 
    setImagesSelected((prev) => {
      if (prev) {
        return ([...prev, ...urlArray])
      }

      return [...urlArray]
    })

    // lưu tên theo order
    setValue('imagesOrder', [...getValues('imagesOrder'), ...nameArray])

    // set các file vào images trong react hook form 
    setValue('images', [...getValues('images'), ...files])
  }

  useEffect(() => {
    if (props.images && props.images.length > 0) {
      const newArrayImages = props.images.map(image => ({
        id: image.id,
        file: image.file
      }))
      setImagesSelected(newArrayImages)
    }
  }, [])

  useEffect(() => {
    if (imagesSelected?.length === 0) {
      setError('images', {
        type: 'required',
        message: 'This field is required'
      })

      return;
    }
    console.log('clear')
    clearErrors('images')
  }, [imagesSelected])

  return (
    <FormControlGroup
      label={props.label}
      required={props.required.value}
      inputSize={8}
      errrorMessage={
        errors[`${props.name}`]?.message
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
              {!!imagesSelected?.length
                &&
                imagesSelected.map((image, index) => {

                  return (
                    <span
                      style={{
                        position: 'relative'
                      }}
                      key={index}>
                      <img
                        src={image.file}
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
                          removeImage(image.id, index)
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
    </FormControlGroup>
  )
}

export default memo(ControlFileInput)