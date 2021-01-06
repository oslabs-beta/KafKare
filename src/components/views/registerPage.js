import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button } from 'antd';
import { Container, Flex, Center } from '@chakra-ui/react';
import axios from 'axios';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const registerPage = (props) => {
  return (
    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
          };

          axios
            .post('http://localhost:3002/user/signup', dataToSubmit)
            .then((res) => {
              console.log('register page', res.data);
              if (res.data.success) {
                props.history.push('/');
              } else {
                alert('Fail to register, please try it again!');
              }
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
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app-1">
            <Container maxW="max" maxH="max">
              <Center pt="100px" pb="100px">
                <Flex
                  direction="column"
                  align="center"
                  bg="hsl(218, 52%, 54%, 0.3)"
                  color="white"
                  borderRadius="8px"
                  padding="80px"
                  justify="center"
                >
                  <h1>Sign up</h1>
                  <Form
                    style={{ minWidth: '375px' }}
                    {...formItemLayout}
                    onSubmit={handleSubmit}
                    className="submit-form"
                  >
                    <Form.Item required label="Name">
                      <Input
                        style={{ minWidth: '70%' }}
                        id="name"
                        placeholder="Enter your name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.name && touched.name
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                      )}
                    </Form.Item>
                    <br />
                    <Form.Item
                      required
                      label="Email"
                      hasFeedback
                      validateStatus={
                        errors.email && touched.email ? 'error' : 'success'
                      }
                    >
                      <Input
                        style={{ minWidth: '70%' }}
                        id="email"
                        placeholder="Enter your Email"
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

                    <Form.Item
                      required
                      label="Password"
                      hasFeedback
                      validateStatus={
                        errors.password && touched.password
                          ? 'error'
                          : 'success'
                      }
                    >
                      <Input
                        style={{ minWidth: '70%' }}
                        id="password"
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
                        <div className="input-feedback">{errors.password}</div>
                      )}
                    </Form.Item>

                    <Form.Item required label="Confirm" hasFeedback>
                      <Input
                        style={{ minWidth: '70%' }}
                        id="confirmPassword"
                        placeholder="Enter your confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.confirmPassword && touched.confirmPassword
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="input-feedback">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                      <Button onClick={handleSubmit} disabled={isSubmitting}>
                        Submit
                      </Button>

                      <Link to="/">
                        <Button>Cancel</Button>
                      </Link>
                    </Form.Item>
                  </Form>
                </Flex>{' '}
              </Center>
            </Container>
          </div>
        );
      }}
    </Formik>
  );
};
export default registerPage;
