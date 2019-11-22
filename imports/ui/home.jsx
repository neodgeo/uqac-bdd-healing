import React from 'react';

import { StyleSheet, css } from 'aphrodite';

import { Switch, Card, Avatar } from 'antd';

const { Meta } = Card;

import WrappedSearchForm from './search';

const data = [
    {name:"name", creature:"this one"},
    {name:"name", creature:"this second"},
    {name:"name", creature:"this third"},
]

const Home = () => {
    return(
        <div>
            <Card title="Find your spell" style={{ width: "100%" }}>
                <WrappedSearchForm />
            </Card>
            {data.map((elem)=>{
                return(<Card style={{ width: "100%", marginTop: 16 }} loading={true}>
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title={elem.name}
                      description={elem.creature}
                    />
                  </Card>);
            }
            )}
        </div>
    );
};


export default Home;