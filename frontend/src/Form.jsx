import { useState,useEffect } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '', visible: false });
  const [data,setData]=useState();
  async function loadUsers() {
    try {
      const response=await axios.get('http://localhost:5000/api/users');
      console.log(response.data);
       setData(response.data)
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: 'Failed to submit form', visible: true });
    }
  }
useEffect(()=>{
    loadUsers();
},[]);
  const onFinish = async (values) => {
    setLoading(true);
    setAlert({ ...alert, visible: false });

    try {
      await axios.post('http://localhost:5000/api/form', values);
      setAlert({ type: 'success', message: 'Form submitted successfully!', visible: true });
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: 'Failed to submit form', visible: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Register</h2>

      {alert.visible && (
        <Alert
          message={alert.message}
          type={alert.type}
          showIcon
          closable
          style={{ marginBottom: 20 }}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Enter a valid email' }
          ]}
        >
          <Input placeholder="example@email.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter a password' }]}
        >
          <Input.Password placeholder="Your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
   <div>
  {alert.visible && (
    <Alert
      message={alert.message}
      type={alert.type}
      showIcon
      closable
      style={{ marginBottom: 20 }}
      onClose={() => setAlert({ ...alert, visible: false })}
    />
  )}

  <Form layout="vertical" onFinish={onFinish}>
    {/* Form Items... */}
  </Form>

  {/* Show users */}
  {data == null ? (
    <h1>Loading...</h1>
  ) : (
    <div style={{ maxWidth: 400, margin: '20px auto' }}>
      <h3>Registered Users:</h3>
      {data.map((user, index) => (
        <p key={index}>{user.name} - {user.email}</p>
      ))}
    </div>
  )}
</div>

</div>
  );
}
