import * as React from 'react';
import {
  Container,
  Card,
  CardBody,
  CardHeader,
} from 'reactstrap';
import {connect} from 'react-redux';
import {startLoadingAuthForm, completeLoadingAuthForm, failLoadingAuthForm} from '../actions/auth';
import DynamicForm from '../components/DynamicForm';


class Login extends React.Component<any, any> {

  private static formId = 'authentication';

  constructor(props: any) {
    super(props);
  }
  
  public componentWillMount(): void {
    this.props.startLoadingAuthForm();
    fetch('https://api.vs12.nwaj.ru/v1/forms/post/user/authentication')
      .then((response: any) => {
        return response.json();
      })
      .then((formData: any) => {
        this.props.completeLoadingAuthForm(formData);
      })
      .catch(() => {
        this.props.failLoadingAuthForm(new Error('Error loading form data'));
      });
  }

  public render() {
    
    // if (!this.props.formData || !this.props.formData[Login.formId]) {
    //   alert('Invalid form data on endpoint');
    //   return null;
    // }

    const fields: any[] = [];

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
    }
    
    return (
      <Container>
        <Card>
          <CardHeader>
            <h1>Login</h1>
          </CardHeader>
          <CardBody>
            <DynamicForm
              id="authentication"
              fields={fields}
              submitAction={() => {
                console.log('call redux action')
              }}
            />
          </CardBody>
        </Card>
      </Container>
    );
  }
}

function mapStateToProps(state: any) {  
  return {
    formData: state.auth.formData,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    startLoadingAuthForm: () => dispatch(startLoadingAuthForm()),
    completeLoadingAuthForm: (formData: any) => dispatch(completeLoadingAuthForm(formData)),
    failLoadingAuthForm: (error: any) => dispatch(failLoadingAuthForm(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
