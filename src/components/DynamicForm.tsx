import * as React from 'react';
import { 
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

interface IDynamicField {
  id: string,
  type: any,
  label: string,
  required: boolean,
  name: string,
  disabled: boolean,
};

interface IDynamicFormProps {
  id: string,
  fields?: IDynamicField[],
  submitAction: (requestData: any) => void,
};

const DynamicForm = (props: IDynamicFormProps) => {
  if (!props.fields || props.fields.length === 0) {
    return null;
  }
  return (
    <Form
      id={props.id}
      onSubmit={(event) => {
        event.preventDefault();
        const formElement = event.currentTarget.getElementsByTagName('input');
        const requestData = {[props.id]: {}};
        Array.from(formElement).forEach((field: any) => {
          requestData[props.id][field.name] = field.value;
        });
        props.submitAction(requestData);
      }}
    >
      {
        props.fields.map((field: IDynamicField, key: number) => {
          return (
            <FormGroup key={key}>
              <Label for={field.id}>{field.label}</Label>
              <Input
                type={field.type}
                name={field.name} 
                id={field.id} 
                placeholder=""
                disabled={field.disabled}
                required={field.required}
              />
            </FormGroup>
          )
        })
      }
      <FormGroup>
        <Button>Submit</Button>
      </FormGroup>
    </Form>
  )
};

export default DynamicForm;
