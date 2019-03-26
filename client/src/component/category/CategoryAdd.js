import React from 'react'
import axios from '../axios/config';
import FormCategory from './CategoryForm'


class AddCategory extends React.Component {
    constructor() {
        super()

    }

    render() {
        return (
            <div>
                <h2>add</h2>
                <FormCategory />

            </div>
        )

    }
}
export default AddCategory