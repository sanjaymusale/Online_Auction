import React from 'react'
import axios from '../axios/config'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { Link } from 'react-router-dom'



export default class ProductInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            session: {},
            categoryData: {},
            data: '',
            isLoaded: false,
            isOpen: false,
            photoIndex: 0


        }

    }

    componentDidMount() {
        const id = this.props.match.params.id
        // console.log('id', id)
        Promise.all([axios.get(`/products/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } }),
        axios.get(`/sessions/product/${id}`),
        axios.get('/category', { headers: { 'x-auth': localStorage.getItem('token') } })])
            .then((response) => {
                const pr = response
                console.log('pr', pr)
                this.setState(() => ({ product: response[0].data, isLoaded: true, session: response[1].data }))
            })
            .catch((err) => {
                console.log(err)
            })
    }








    render() {

        const { photoIndex, isOpen } = this.state;
        const product = this.state.product

        const session = this.state.session
        const category = this.state.product.category


        //console.log(this.state.photoIndex)
        //console.log(category)

        // const result = category.find(cat => cat._id == product.category)
        // // this.setState(() => ({ data: result }))
        // console.log(result)
        //console.log(product.category)
        //console.log(product.imageUrl[0])


        return (
            //console.log(this.state.photoIndex)


            < div >

                <div className="container">
                    {/* <div className="row"> */}

                    <div className="col-md-1"></div>





                    {/* <h5>product : {product.name}</h5>




                <  img src={product.imageUrl} onClick={() => this.setState({ isOpen: true })} style={{ width: "200px", height: "200px" }} />

                {isOpen && (
                    <Lightbox
                        mainSrc={product.imageUrl} style={{ width: "400px", height: "600px" }}
                        // nextSrc={images[(photoIndex + 1) % images.length]}
                        // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    // onMovePrevRequest={() =>
                    //     this.setState({
                    //         photoIndex: (photoIndex + images.length - 1) % images.length,
                    //     })
                    // }
                    // onMoveNextRequest={() =>
                    //     this.setState({
                    //         photoIndex: (photoIndex + 1) % images.length,
                    //     })
                    // }
                    />
                )} */}
                    {
                        this.state.isLoaded && (
                            <>
                                <br />
                                <h5>product : {product.name}</h5>






                                <  img src={product.imageUrl[photoIndex]} onClick={() => this.setState({ isOpen: true })} style={{ width: "200px", height: "200px" }} />

                                {isOpen && (
                                    <Lightbox
                                        mainSrc={product.imageUrl[photoIndex]} style={{ width: "400px", height: "600px" }}
                                        nextSrc={product.imageUrl[(photoIndex + 1) % product.imageUrl.length]}
                                        prevSrc={product.imageUrl[(photoIndex + product.imageUrl.length - 1) % product.imageUrl.length]}
                                        onCloseRequest={() => this.setState({ isOpen: false })}
                                        onMovePrevRequest={() =>
                                            this.setState({
                                                photoIndex: (photoIndex + product.imageUrl.length - 1) % product.imageUrl.length,
                                            })
                                        }
                                        onMoveNextRequest={() =>
                                            this.setState({
                                                photoIndex: (photoIndex + 1) % product.imageUrl.length
                                            })
                                        }
                                    />
                                )}
                                <br />

                                <h5>category : {product.category.name}</h5>
                                <h5>seller : {product.seller.firstName}</h5>
                            </>
                        )
                    }

                    <h5>price :  {product.minPrice}</h5><br />
                    <h5>date :  {session.date}</h5>
                    <h5>start :  {session.startSession}</h5>
                    <h5>end :   {session.endSession}</h5>
                    <Link to='/user/dashboard'>back</Link>


                </div>
            </div>



            // </div >










        )
    }

}


