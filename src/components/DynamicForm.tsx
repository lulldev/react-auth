import * as React from 'react';
import { 
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';


interface IDynamicFormProps {
  fields?: any[],
  onSubmit: () => void,
};

const DynamicForm = (props: IDynamicFormProps) => {
  if (!props.fields || props.fields.length === 0) {
    return null;
  }
  return (
    <Form onSubmit={props.onSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword" className="mr-sm-2">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
      </FormGroup>
      <FormGroup>
        <Button>Submit</Button>
      </FormGroup>
    </Form>
  )
};

export default DynamicForm;
