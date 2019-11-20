import React from 'react';

import { Form, Icon, Input, Button, Select, Checkbox } from 'antd';

import { StyleSheet, css } from 'aphrodite';


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

const textOption = [
    {label:"titre", value:"titre"},
    {label:"description", value:"description"}
];

const composanteOption = [
    {label:"V", value:"V"},
    {label:"S", value:"S"},
    {label:"M", value:"M"}
];

class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };



  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;


    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
            <Input
              prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder=""
            />
            <Checkbox.Group options={textOption}></Checkbox.Group>
        </Form.Item>
        <Form.Item>
            <Select
                className={ css(styles.select)}
                showSearch
                style={{ width: 200 }}
                placeholder="Select a class"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
                <Option value="test">test</Option>
                <Option value="Jiangsu">Jiangsu</Option>
            </Select>
            <div>
                Composante <Checkbox.Group options={composanteOption}></Checkbox.Group>
            </div>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                Find
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSearchForm = Form.create({ name: 'search' })(HorizontalLoginForm);

export default WrappedSearchForm

const styles = StyleSheet.create({
    select:{
      width:"100%",
    },
    input:{
      width:"30%",  
    }
  });