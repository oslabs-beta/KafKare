import React, { useState } from 'react';
import mainLogo from '../../assets/KafKareTsmall.png';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Container, Flex, Center } from '@chakra-ui/react';
const { Title } = Typography;
const loginPage = (props) => {
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('');

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          axios
            .post('http://localhost:3002/user/login', dataToSubmit)
            .then((response) => {
              console.log(response);
              console.log('what response issssssssss', response.data);
              if (response.data.loginSuccess) {
                window.localStorage.setItem('userId', response.userId);
                props.history.push('/dashboard');
              } else {
                setFormErrorMessage('Check out your Account or Password again');
              }
            })
            .catch((err) => {
              setFormErrorMessage('Check out your Account or Password again');
              setTimeout(() => {
                setFormErrorMessage('');
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app">
            <nav className="noborder logo-container ">
              <img src={mainLogo} width="168" height="65" />

              <Container maxW="max" maxH="max">
                <Center pt="100px" pb="100px">
                  <Flex
                    direction="column"
                    align="center"
                    bg="hsl(218, 52%, 54%, 0.3)"
                    color="black"
                    width="400px"
                    borderRadius="8px"
                    padding="30px"
                    justify="center"
                    color="white"
                  >
                    <Title level={2}>Log In</Title>
                    <form onSubmit={handleSubmit} className="submit-form">
                      <Form.Item required>
                        <Input
                          id="email"
                          prefix={<EmailIcon />}
                          placeholder="Enter your email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.email && touched.email
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.email && touched.email && (
                          <div className="input-feedback">{errors.email}</div>
                        )}
                      </Form.Item>
                      <br />

                      <Form.Item required>
                        <Input
                          id="password"
                          prefix={<LockIcon />}
                          placeholder="Enter your password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password && touched.password
                              ? 'text-input error'
                              : 'text-input'
                          }
                        />
                        {errors.password && touched.password && (
                          <div className="input-feedback">
                            {errors.password}
                          </div>
                        )}
                      </Form.Item>
                      <br />

                      {formErrorMessage && (
                        <label>
                          <p
                            style={{
                              color: '#ff0000bf',
                              fontSize: '0.7rem',
                              border: '1px solid',
                              padding: '1rem',
                              borderRadius: '10px',
                            }}
                          >
                            {formErrorMessage}
                          </p>
                        </label>
                      )}

                      <Form.Item>
                        <div style={{ height: '7px' }}>
                          <Button
                            htmlType="submit"
                            style={{ width: '100', color: 'white' }}
                            disabled={isSubmitting}
                            onSubmit={handleSubmit}
                          >
                            Log in
                          </Button>
                        </div>
                        No account? <Link to="/register">Register now!</Link>
                      </Form.Item>
                      <br />
                      <br />
                    </form>
                  </Flex>{' '}
                </Center>
              </Container>
            </nav>
          </div>
        );
      }}
    </Formik>
  );
};
export default withRouter(loginPage);
