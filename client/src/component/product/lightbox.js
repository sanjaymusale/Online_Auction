import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app



export default class LightboxExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: '',
            isOpen: false,
            photo: 'http://localhost:3001/public/uploads/image-1554311021545.jpg',
            photo1: 'http://localhost:3001/public/uploads/image-1554444812742.jpg',
            photo2: 'http://localhost:3001/public/uploads/image-1554444812744.jpg'
        };
    }

    render() {
        const { isOpen } = this.state;

        return (
            <div>
                < img src={this.state.photo} onClick={() => this.setState({ isOpen: true })} style={{ width: "200px", height: "200px" }} />



                {isOpen && (
                    <Lightbox
                        mainSrc={this.state.photo}
                        nextSrc={this.state.photo1}
                        //prevSrc={this.state.photo2}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        // onMovePrevRequest={() =>
                        //     this.setState({
                        //         photoIndex: (photoIndex + images.length - 1) % images.length,
                        //     })
                        // }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: this.state.photo1,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}