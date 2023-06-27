import { Button, Form, Form as FormAntd, Input, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';

export type FormValues = {
  isEnabled: boolean;
  username: string;
  name: string;
  teamname?: string;
  token?: string;
  owner: string;
  repositories: string[];
};

export type Props = {
  initValues?: FormValues;
  onSave: (values: FormValues) => void;
};

const defaultFormValues: FormValues = {
  username: '',
  name: '',
  isEnabled: true,
  token: '',
  owner: '',
  repositories: [],
};

const ConfigurationForm = ({
  initValues = defaultFormValues,
  onSave,
}: Props) => {
  // TODO: Do not init useState using initValues, find another way
  const [isEnabled, setIsEnabled] = useState(initValues.isEnabled);

  const [isTeamRequired, setIsTeamRequired] = useState(false);
  const [isTokenRequired, setIsTokenRequired] = useState(false);

  const [form] = Form.useForm();

  // TODO: Fix the labelCol and wrapperCol from property
  return (
    <FormAntd
      form={form}
      labelCol={{
        xs: { span: 24 },
        sm: { span: 6 },
        lg: { span: 4 },
      }}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 16 },
        lg: { span: 18 },
      }}
      validateMessages={{
        // eslint-disable-next-line no-template-curly-in-string
        required: '${label} is required!',
      }}
      name="configuraton"
      onFinish={onSave}
    >
      <FormAntd.Item
        name="isEnabled"
        label="Enabled"
        initialValue={initValues.isEnabled}
        rules={[{ type: 'boolean' }]}
      >
        <Switch
          data-testid="isEnable-switch"
          checked={isEnabled}
          onChange={(checked: boolean) => {
            setIsEnabled(checked);
            if (checked === false) {
              form.resetFields();
              /**
               * Since store can have the isEnabled as true, the initial value will be true instead of false.
               * We are forcing to set the isEnabled to false when user disable the configuration.
               */
              form.setFieldsValue({
                isEnabled: false,
              });
            }
          }}
        />
      </FormAntd.Item>
      <FormAntd.Item
        name="name"
        label="Name"
        initialValue={initValues.name}
        required={isEnabled}
        rules={[{ required: isEnabled }]}
      >
        <Input data-testid="name-input" disabled={!isEnabled} />
      </FormAntd.Item>
      <FormAntd.Item
        name="username"
        label="Username"
        initialValue={initValues.username}
        required={isEnabled}
        rules={[{ required: isEnabled }]}
      >
        <Input data-testid="username-input" disabled={!isEnabled} />
      </FormAntd.Item>
      <FormAntd.Item
        name="owner"
        label="Owner"
        initialValue={initValues.owner}
        required={isEnabled}
        rules={[{ required: isEnabled }]}
      >
        <Input data-testid="owner-input" disabled={!isEnabled} />
      </FormAntd.Item>
      <FormAntd.Item
        name="teamname"
        label="Team"
        initialValue={initValues.teamname}
        required={isTeamRequired}
      >
        <Input data-testid="teamname-input" disabled={!isEnabled} />
      </FormAntd.Item>
      <FormAntd.Item
        name="token"
        label="Token"
        initialValue={initValues.token}
        required={isTokenRequired}
      >
        <Input.Password data-testid="token-input" disabled={!isEnabled} />
      </FormAntd.Item>
      <FormAntd.Item
        name="repositories"
        label="Repositories"
        initialValue={initValues.repositories}
        required={isEnabled}
        rules={[{ required: isEnabled }]}
      >
        <Select
          data-testid="repositories-select"
          mode="tags"
          tokenSeparators={[',']}
          disabled={!isEnabled}
        />
      </FormAntd.Item>
      <FormAntd.Item
        wrapperCol={{
          xs: { offset: 18 },
          sm: { span: 16 },
          lg: { span: 18 },
        }}
      >
        <Button data-testid="on-save-button" type="primary" htmlType="submit">
          Save
        </Button>
      </FormAntd.Item>
    </FormAntd>
  );
};

export default ConfigurationForm;