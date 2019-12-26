import React from 'react';

import { StyleSheet, css } from 'aphrodite';

import { Switch, Card, Avatar } from 'antd';

import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { creatureData } from '../api/Creature';



const { Meta } = Card;

import WrappedSearchForm from './search';

var data = [
    {name:"Search", creature:["this creature", "that creature", "thoses creatures"], description:"here you can find the description of the spell", levels:[{class:"wizard",level:2}],components:["F","V"]},
    {name:"For", creature:["this creature", "that creature", "thoses creatures"], description:"here you can find the description of the spell", levels:[{class:"sorcery",level:4}],components:["F","S"]},
    {name:"A spell", creature:["this creature", "that creature", "thoses creatures"], description:"here you can find the description of the spell", levels:[{class:"try",level:2}],components:["M","V"]},
]

const desc = (data)=> {
    return (<div>
        <div>{data.description}</div>
        { data.creature ? <div>{data.creature.map((elem, index)=>{return (<a href={creatureData.findOne({name:elem.toLowerCase()}) ? creatureData.findOne({name:elem.toLowerCase()}).link : '#'} target="_blank"><span>{elem}{index == data.creature.length - 1 ? '' : ' - '}</span></a>)})}</div> : ''}
        <div>{data.levels.map((elem, index)=>{return (<span>{elem.class} : {elem.level}{index == data.levels.length - 1 ? '' : ' - '}</span>)})}</div>
        <div>{data.components.map((elem, index)=>{return (<span>{elem}{index == data.components.length - 1 ? '' : ', '}</span>)})}</div>
        </div>)
}


const Home = ({dataDB}) => {
    return(
        <div>
            <Card title="Find your spell" style={{ width: "100%" }}>
                <WrappedSearchForm />
            </Card>
            {dataDB.map((elem)=>{
                return(<Card style={{ width: "100%", marginTop: 16 }} loading={false}>
                    <Meta
                      avatar={
                        <Avatar src={"http://localhost:3000/701x1000_"+name.replace(' ', '%20')+".png"} />
                        // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={elem.name}
                      description={desc(elem)}
                    />
                  </Card>);
            }
            )}
        </div>
    );
};


export default HomeContainer = withTracker(()=>{
    var dataDB = Session.get('spellResult')
    if(dataDB.length == 0) dataDB = data
    console.log(dataDB)
    return{
        dataDB:dataDB
    }
})(Home);