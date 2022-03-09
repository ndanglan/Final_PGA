import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller, useFormContext } from 'react-hook-form'
import { API_TYNY_KEY, contentCSS, plugins } from '../../../configs/textEditor';
import InputGroup from '../../common/components/Layout/InputGroup'

interface Props {
  label: string,
  name: string,
  required: boolean
}

const ControlTextEditorInput = (props: Props) => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <InputGroup
      label={props.label}
      required={props.required}
      inputSize={6}
    >
      <Controller
        control={control}
        name={props.name}
        render={({
          field: { onChange, ...others }
        }) => (
          <Editor
            {...others}
            onEditorChange={(e) => {
              onChange(e)
            }}
            apiKey={API_TYNY_KEY}
            initialValue="<p>Enter text here...</p>"
            init={{
              height: 250,
              width: '100%',
              content_css: contentCSS,
              menubar: false,
              plugins: plugins,
              toolbar:
                'bold | italic | code' +
                ' bullist numlist | ',
              toolbar_mode: 'sliding',
              content_style: 'body { font-family:OpenSans,Arial,sans-serif; font-size:16px }',
              statusbar: false,
              skin: 'oxide'
            }}
          />
        )}
        rules={{ required: props.required }}
      />
    </InputGroup>
  )
}

export default ControlTextEditorInput