import React, { PureComponent } from 'react';

import {    Dimensions,    Modal,    WebView,    Share,    Image} from 'react-native';

import {    Header,    Content,    Container,    Body,    Left,    Right,    Title,    Button, Footer, FooterTab, Text,Label,Thumbnail} from 'native-base';

const  webViewHeight = Dimensions.get('window').height*8

export default class ModalComponent extends PureComponent {

    constructor(props) {
        super(props)
        this._handleClose = this._handleClose.bind(this)
        this._handleShare = this._handleShare.bind(this)
    }

    _handleClose() {
        return this.props.onClose()
    }

    _handleShare() {
        const { url,title } = this.props.articleData,
        message =  `${title}\n\nRead more @\n${url}\n\nshared via RN News App`
        return Share.share(
            {title,message,url:message},
            {dialogTitle:`Share ${title}`}
        )
    }
 

    render() {
        const { showModal, articleData } = this.props
            return (
                <Modal onRequestClose={this._handleClose} visible={showModal} transparent animationType="slide">
                    <Container style={{margin:16,marginBottom:0,backgroundColor:'#ffffff'}}>
                        <Header >
                            <Left>
                                <Button transparent onPress={this._handleClose}>
                                    <Image resizeMode="center" style={{ width: 18, height: 18 }} source={require('../images/ic_close_white_18dp.png')} />
                                </Button>
                            </Left>
                            <Body>
                                <Title>{articleData.brand+" "+articleData.model}</Title>
                            </Body>
                            <Right>
                            <Button transparent onPress={this._handleShare}>
                                    <Image style={{ width: 18, height: 18 }} 
                                    source={require('../images/ic_share_white_18dp.png') } />
                                </Button>
                            </Right>
                        </Header>
                        <Content style={{padding: 20, marginTop:20, fontSize: 18,}}>
                            <Text>{"Type: "+articleData.type}</Text>
                            <Text>{"Brand: "+articleData.brand}</Text>
                            <Text>{"Model: "+articleData.model}</Text>
                            <Text>{"Year of production: "+articleData.yearOfProduction}</Text>
                            <Text>{"Engine power: "+articleData.enginePower+"KM"}</Text>
                            <Text>{"Fuel type: "+articleData.fuelType}</Text>
                            <Text>{"Milage: "+articleData.milage+"km"}</Text>
                            <Text>{"Prize: "+articleData.prize+"zł"}</Text>
                            <Thumbnail style={{marginTop:20,width:300, height:150 ,backgroundColor: '#eee', alignSelf:'center'}} square large source={{ cache:'force-cache', uri: articleData.imgLink != null ? articleData.imgLink :
                            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=' }}/>                                                                                                                
                        </Content>                    
                    </Container>
                </Modal>
            )
    }
}
