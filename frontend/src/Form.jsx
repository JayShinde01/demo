import { useState, useEffect } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '', visible: false });
  const [data, setData] = useState(null);

  async function loadUsers() {
    try {
      const response = await axios.get('https://backendjay-x2x1.onrender.com/api/users');
      setData(response.data);
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: 'Failed to load users', visible: true });
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    setAlert({ ...alert, visible: false });

    try {
      await axios.post('https://backendjay-x2x1.onrender.com/api/form', values);
      setAlert({ type: 'success', message: 'Form submitted successfully!', visible: true });
      loadUsers(); // Refresh the user list
    } catch (err) {
      console.error(err);
      setAlert({ type: 'error', message: 'Failed to submit form', visible: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto' }}>
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

      <div style={{ marginTop: 40 }}>
        <h3>Registered Users:</h3>
        {data === null ? (
          <p>Loading...</p>
        ) : (
          data.map((user, index) => (
            <p key={index}>{user.name} - {user.email}</p>
          ))
        )}
      </div>
    </div>
  );
}
