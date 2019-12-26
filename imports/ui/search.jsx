import React from 'react';

import { Form, Icon, Input, Button, Select, Checkbox } from 'antd';

import { StyleSheet, css } from 'aphrodite';
import { spellData } from '../api/Spell';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';




function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const { Option } = Select;

const text = new ReactiveVar('')
const textPlace = new ReactiveVar(['titre','description'])
const spellClass = new ReactiveVar('')
const composante = new ReactiveVar([])

function onChangeTextPlace(value) {
  console.log(`selected ${value}`);
  textPlace.set(value)
}

function onChangeSpellClass(value) {
  console.log(`selected ${value}`);
  spellClass.set(value)
}
 
function onChangeComposante(value) {
  console.log(`selected ${value}`);
  composante.set(value)
}

function onChangeInput(e) {
  console.log(`selected ${e.target.value}`);
  text.set(e.target.value)
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
        // console.log('Received values of form: ', values);
        // console.log(text.get(), textPlace.get(), spellClass.get(), composante.get());
        // console.log(spellData.find().fetch())
        var query = {components:{$in: composante.get()}}
        if(spellClass.get().length > 0){
          // console.log("here class")
          query ['levels.class']={$in:spellClass.get()}
        } 
        if(textPlace.get().length == 2 ){
          // console.log("here or")
          query['$or'] = [{name: {$regex:text.get(), $options: 'i'}}, {description:{$regex:text.get(), $options: 'i'}}]
        }else if(textPlace.get()[0] == 'description'){
          // console.log("here desc")
          query['description'] = {$regex:text.get(), $options: 'i'}
        }else if(textPlace.get()[0] == 'titre'){
          // console.log("here name")
          query['name'] = {$regex:text.get(), $options: 'i'}
        }

        // console.log(query)
        var result = spellData.find(query).fetch()
        // console.log(result)
        result.forEach((elem)=>{
          var distinctCreature = [... new Set (elem.creature)]
          elem.creature = distinctCreature
        })
        Session.set('spellResult',result)
      }
    });
    // console.log(this.props.form.getFieldsValue())
  };

 



  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;


    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
            <Input
              prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder=""
              onChange={onChangeInput}
            />
            <Checkbox.Group options={textOption} onChange={onChangeTextPlace} defaultValue={['titre',"description"]}></Checkbox.Group>
        </Form.Item>
        <Form.Item>
            <Select
                mode="multiple"
                className={ css(styles.select)}
                showSearch
                style={{ width: 200 }}
                placeholder="Select a class"
                optionFilterProp="children"
                onChange={onChangeSpellClass}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
                {Session.get('classValues').map((elem)=> {return (<Option value={elem}>{elem}</Option>)})}
            </Select>
            <div>
                Composante <Checkbox.Group options={composanteOption} onChange={onChangeComposante}></Checkbox.Group>
            </div>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Find
            </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSearchForm = Form.create({ name: 'search' })(HorizontalLoginForm);

export default WrappedSearchFormContainer = withTracker(()=>{
  var classValues = Session.get('classValues')
  if(classValues.length == 0) {
      var valuesAll = []
      const intervalQuery = Meteor.setInterval(()=> {
        valuesAll = spellData.find().fetch()
        if(valuesAll.length == 0){
          return
        }
        var valuesClass = []
        valuesAll.forEach((elem)=>{
          elem.levels.forEach((elemLvl)=>{
            valuesClass.push(elemLvl.class)
          })
        })
        var final = [... new Set(valuesClass)]
        Session.set('classValues', final)
        Meteor.clearInterval(intervalQuery)
      }, 1000)
  }
  console.log(classValues)
  return{
      classValues:classValues
  }
})(WrappedSearchForm);

const styles = StyleSheet.create({
    select:{
      width:"100%",
    },
    input:{
      width:"30%",  
    }
  });