import React, { ReactElement } from 'react';
import Select from 'react-select';
import randomstring from 'randomstring';
import * as SelectExp from 'react-select';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import { UseFormMethods } from 'react-hook-form';
import { IAuthor } from '../interfaces/author';


interface Props extends SelectExp.Props {
  formMethods: UseFormMethods;
  options: any[];
  name: string;
  label?: string;
  id?: string;
  fromResource: IAuthor;
  toResource?: string;
  refresh?: any;
}

export default function HasManyPicker({
  label,
  id = randomstring.generate(7),
  formMethods,
  name,
  fromResource,
  toResource,
  refresh,
  ...rest
}: Props): ReactElement {
  const { register, errors, setValue, getValues } = formMethods;
  return (
    <FormGroup>
      {
        label &&
        <Label htmlFor={id}>{label}</Label>
      }
      <Select
        {...rest}
        placeholder="Selectionner"
        isMulti 
        id={id}
        onChange={(values, { action, removedValue }) => {
          const vals = values || [];
          if(toResource === 'secret_order'){
            //@ts-ignore
            setValue('secret_order_ids', JSON.stringify(vals.map(val => val.value)))
          }
        }}
      />
      {errors.hasOwnProperty(name) && <FormFeedback>This field is required</FormFeedback>}
    </FormGroup>
  )
}
