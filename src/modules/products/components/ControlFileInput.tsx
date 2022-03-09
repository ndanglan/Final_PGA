import React, { useCallback, useState, useEffect } from 'react'
import Dropzone from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { CloseIcon, CameraAltIcon } from '../../common/components/Icons';
import InputGroup from '../../common/components/Layout/InputGroup';
import defaultImg from '../../../no-image-icon.png';
import { DARK_PURPLE } from '../../../configs/colors'


interface IFileInputProps {
  name: string,
  label: string,
  required: boolean,
  images?: string[]
}

const ControlFileInput = (props: IFileInputProps) => {
  const {
    register,
    unregister,
    watch,
    setValue,
    getValues,
    formState: { errors } } = useFormContext();

  const [images, setImages] = useState<string[]>([]);

  const removeImage = (id: number) => {
    const newArr = images.slice(0);
    const afterDeleted = newArr.splice(id, 1);

    setImages(newArr)

    setValue('deleted_images', [...getValues('deleted_images'), ...afterDeleted])
  }

  useEffect(() => {
    register(props.name)

    return () => unregister(props.name)
  }, [props.name, register, unregister])

  useEffect(() => {
    if (props.images && props.images.length > 0) {
      setImages(props.images)
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
          const newUrlArr = e.map(item => URL.createObjectURL(item));
          const newNameArr = e.map(item => item.name);

          setImages((prev) => ([...prev, ...newUrlArr]))

          setValue('imagesOrder', [...getValues('imagesOrder'), ...newNameArr])
        }}>
        {({ getRootProps, getInputProps }) => (
          <>
            <input
              {...getInputProps()}
              name={props.name}
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