import * as React from 'react';
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Alert,
  Button,
} from 'reactstrap';
import {Dispatch} from 'redux';
import {Redirect} from 'react-router'
import {connect} from 'react-redux';
import {login} from '../actions/login';
import {loadAuthForm} from '../actions/loadAuthForm';
import {SimpleAction} from '../types/actions';
import DynamicForm from '../components/DynamicForm';
import {IDynamicField} from '../types/dynamicField';


interface ILoginProps {
  formData: object|null;
  userId: null|string;
  isLoginFail: boolean;
  loadAuthForm: () => void;
  login: (requestData: object) => void;
};

class Login extends React.Component<ILoginProps, any> {

  private static formId = 'authentication';

  constructor(props: ILoginProps) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  public render() {
    const fields: IDynamicField[] = [];

    if (this.props.formData) {
      const authFormData = this.props.formData[Login.formId];
      if (authFormData.hasOwnProperty('children') && Array.isArray(authFormData.children)) {
        authFormData.children.forEach((receivedField: any) => {
          fields.push({
            type: receivedField.input_type,
            id: receivedField.id,
            disabled: receivedField.disabled,
            label: receivedField.label,
            required: receivedField.required,
            name: receivedField.short_name,
          });
        });
      } 
      else {
        throw new Error('Error loading form from endpoint!');
      }
    }

    if (this.props.userId) {
      return <Redirect to="/profile" />
    }

    return (
      <Container>
        <Card>
          <CardHeader>
            <h1>Login</h1>
          </CardHeader>
          <CardBody>
            {this.props.isLoginFail && 
              <Alert color="danger">Неверный логин/пароль</Alert>}
            <DynamicForm
                id="authentication"
                fields={fields}
                submitAction={this.submitHandler}
              />
          </CardBody>
        </Card>
      </Container>
    );
  }
  
  public componentWillMount(): void {
    this.props.loadAuthForm();
  }

  protected submitHandler(requestData: object) {
    this.props.login(requestData);
  }
}

function mapStateToProps(state: any) {  
  return {
    formData: state.loadingAuthForm.formData,
    isLoginFail: state.login.isLoginFail,
    userId: state.login.userId,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<SimpleAction>) => {
  return {
    loadAuthForm: () => loadAuthForm(dispatch),
    login: (requestData: object) => login(dispatch, requestData),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
