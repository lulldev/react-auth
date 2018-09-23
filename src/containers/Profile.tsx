import * as React from 'react';
import {
  Container,
  Card,
  CardBody,
  CardHeader,
  Button,
} from 'reactstrap';
import {Redirect} from 'react-router'
import {connect} from 'react-redux';
import {logout} from '../actions/login';


class Profile extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    if (!this.props.userId) {
      return <Redirect to="/" />
    }

    return (
      <Container>
        <Card>
          <CardHeader>
            <h1>Profile</h1>
          </CardHeader>
          <CardBody>
            User id is: {this.props.userId}<br/>
            <Button size="sm" onClick={this.props.logout}>logout</Button>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

function mapStateToProps(state: any) {  
  return {
    userId: state.login.userId,
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
