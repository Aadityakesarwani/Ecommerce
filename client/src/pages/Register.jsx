import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";




const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {

  const error = useSelector((state) => state.user);

  const isRegistered = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    register(dispatch, user);
  };



  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}> { }
          <Input
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="name"
          />
          <Input
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            placeholder="last name"
          />
          <Input
            name="username"
            value={user.username}
            onChange={handleInputChange}
            placeholder="username"
          />
          <Input
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="email"
          />
          <Input
            name="password"
            type="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="password"
          />
          <Input
            name="confirmPassword"
            type="password"
            value={user.confirmPassword}
            onChange={handleInputChange}
            placeholder="confirm password"
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">
            CREATE
            </Button> { }
          {error && (
            <div style={{ color: 'red', fontSize: '14px', marginTop: '8px' }}>
              Username, email, and password should be unique.
            </div>
          )}

        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;