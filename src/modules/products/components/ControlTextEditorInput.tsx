import React, { memo } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller, useFormContext } from 'react-hook-form'
import { API_TYNY_KEY, contentCSS, plugins } from '../../../configs/textEditor';
import FormControlGroup from '../../common/components/FormControlGroup'
import { DARK_BLUE } from '../../../configs/colors';
import { RequiredRuleProps } from '../../../models/input';

interface Props {
  label: string,
  name: string,
  required: RequiredRuleProps
}

const ControlTextEditorInput = (props: Props) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <FormControlGroup
      label={props.label}
      required={props.required.value}
      inputSize={6}
      errrorMessage={errors[`${props.name}`]?.message}
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
            initialValue={others.value
              ? others.value
              : 'Enter some text'}
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
              content_style: `body { font-family:OpenSans,Arial,sans-serif; font-size:16px;background-color:${DARK_BLUE}}`,
              statusbar: false,
              skin: 'oxide'
            }}
          />
        )}
        rules={{ required: props.required }}
      />
    </FormControlGroup>
  )
}

export default memo(ControlTextEditorInput)