import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select'
import InputAdornment from '@material-ui/core/InputAdornment';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from '../axios/config';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from 'react-router-dom'
import { SERVER_URL } from '../config/config'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },

    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: "10%",

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 3,
        alignContent: 'center'
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    formlabel: {
        fontSize: '12px',
        marginTop: '5px'
    },
    textfield: {
        height: 5,
    },
    labelRoot: {
        fontSize: 15,
        marginBottom: 40
    },
    label: {
        padding: 0
    },
    container: {

        marginBottom: "10px"
    },
    input: {
        display: 'none',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },

    fileLabel: {
        fontSize: '14px',
        marginTop: '10px'
    }
});



class ProductForm extends React.Component {
    constructor(props) {
        super(props)
        //console.log(props.imageUrl)

        this.state = {
            name: props.name ? props.name : '',
            minPrice: props.minPrice ? props.minPrice : '',
            categoryData: [],
            SessionsData: [],
            category: props.category ? props.category : '',
            description: props.description ? props.description : '',
            file: '',

            nameError: '',
            minPriceError: '',
            descriptionError: '',
            fileError: '',
            categoryError: '',


        }

    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState(() => ({ [name]: value }))

    }

    handleSelect = (data) => {
        this.setState(() => ({ category: data }))
    }

    componentDidMount() {
        axios.get('/category', { headers: { "x-auth": localStorage.getItem("token") } })
            .then((response) => {
                // console.log(response)
                this.setState(() => ({
                    categoryData: response.data
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    fileHandle = (e) => {

        const file = e.target.files
        // console.log(file)
        this.setState(() => ({ file }))
    }
    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
            minPriceError: '',
            descriptionError: '',
            categoryError: '',
            fileError: ''

        }

        if (this.state.name.length === 0) {
            isError = true;
            errors.nameError = "Provide Name ";
        }
        if (this.state.name.length > 0 && this.state.name.length < 4) {
            isError = true;
            errors.nameError = "Name Should be atleast 4 characters";
        }
        if (this.state.description.length === 0) {
            isError = true;
            errors.descriptionError = "Provide Description ";
        }
        if (this.state.description.length > 0 && this.state.description.length < 25) {
            isError = true;
            errors.descriptionError = "Description Should be atleast 25 characters";
        }
        if (this.state.minPrice.length === 0) {
            isError = true;
            errors.minPriceError = "Provide Price"
        }
        if (this.state.minPrice.length > 0 && this.state.minPrice < 99) {
            isError = true;
            errors.minPriceError = "Minimum Price should be 100"
        }
        if (!this.props.name) {
            if (this.state.file.length === 0) {
                isError = true;
                errors.fileError = "Upload Image"
            }
            if (this.state.file.length > 0 && this.state.file.length <= 2) {
                isError = true;
                errors.fileError = "Upload Minimum 3 Images"
            }
            if (this.state.file.length > 2) {
                var re = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg)$");
                for (const file of this.state.file) {
                    if (!re.test(file.name)) {
                        isError = true;
                        errors.fileError = "Upload Only Jpg File"
                    }
                }
            }
        }
        if (this.state.category.length === 0) {
            isError = true;
            errors.categoryError = "Select Category"
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }

    handleSubmit = (e) => {

        e.preventDefault()

        const err = this.validate()
        if (!err) {

            const { name, category, description, minPrice } = this.state
            const formData = new FormData()
            formData.append('name', name)
            formData.append('category', category.value)
            formData.append('description', description)
            formData.append('minPrice', minPrice)
            for (const file of this.state.file) {
                formData.append('image', file)
            }
            // console.log(formData)
            this.props.handleSubmit(formData)
            // console.log(this.state)

        }

    }



    render() {
        const { classes } = this.props;
        let options = this.state.categoryData.map(function (category) {
            return { value: category._id, label: category.name };
        })
        // console.log(this.props)
        return (
            <React.Fragment>


                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography gutterBottom component="h5" variant="h5" align="center">
                            Product Submission
                        </Typography>
                        <React.Fragment>
                            <hr />
                            <React.Fragment>
                                <form className={classes.form}>
                                    <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                        <Grid item xs={2} className={classes.label} >
                                            <Typography variant="button" gutterBottom>Name</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                id="name"
                                                name="name"
                                                value={this.state.name}
                                                onChange={this.handleChange}
                                                fullWidth
                                                autoComplete="pname"
                                            />
                                            <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={24} className={classes.container} alignItems="center" justify="center">
                                        <Grid item xs={2} className={classes.label} >
                                            <Typography variant="button" gutterBottom>Description</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                id="description"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.handleChange}
                                                fullWidth
                                                multiline
                                                rows="4"
                                                autoComplete="pdescription"
                                            />
                                            <FormLabel className={classes.formlabel} error={true}>{this.state.descriptionError}</FormLabel>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={24} className={classes.container} alignItems="center" justify="center">
                                        <Grid item xs={2} className={classes.label} >
                                            <Typography variant="button" gutterBottom>Category</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Select
                                                name="category"
                                                value={this.state.category}
                                                onChange={this.handleSelect}
                                                options={options}
                                            />
                                            <FormLabel className={classes.formlabel} error={true}>{this.state.categoryError}</FormLabel>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={24} className={classes.container} alignItems="center" justify="center">
                                        <Grid item xs={2} className={classes.label} >
                                            <Typography variant="button" gutterBottom>Bid Price</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                id="price"
                                                name="minPrice"
                                                value={this.state.minPrice}
                                                onChange={this.handleChange}
                                                fullWidth
                                                autoComplete="price"
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">&#8377;</InputAdornment>,
                                                }}
                                            />
                                            <FormLabel className={classes.formlabel} error={true}>{this.state.minPriceError}</FormLabel>
                                        </Grid>
                                    </Grid>
                                    {!this.props.name &&
                                        <Grid container spacing={24} className={classes.container} alignItems="center" justify="center">
                                            <Grid item xs={2} className={classes.label} >
                                                <Typography variant="button" gutterBottom>Image</Typography>
                                            </Grid>

                                            <Grid item xs={7}>
                                                <input
                                                    name="image" onChange={this.fileHandle}
                                                    className={classes.input}
                                                    id="contained-button-file"
                                                    multiple
                                                    type="file"
                                                />
                                                <label htmlFor="contained-button-file">
                                                    <Button variant="contained" component="span" className={classes.button}>
                                                        Upload
                                                     <CloudUploadIcon className={classes.rightIcon} />
                                                    </Button>
                                                    <FormLabel className={classes.fileLabel} focused={true} required={true}>Can Upload Maximum 3 Images</FormLabel>
                                                </label><br />
                                                <FormLabel className={classes.formlabel} error={true}>{this.state.fileError}</FormLabel>
                                            </Grid>

                                        </Grid>

                                    }
                                    <Grid container spacing={0} alignItems="center" justify="center">

                                        <div className={classes.buttons}>
                                            <Link to='/user/dashboard'>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleBack}
                                                    className={classes.button}
                                                    fullWidth>
                                                    Back
                                            </Button>
                                            </Link>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleSubmit}
                                                className={classes.button}
                                                fullWidth
                                            > Submit
                                            </Button>
                                        </div>
                                    </Grid>
                                </form>
                            </React.Fragment>

                        </React.Fragment>

                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

ProductForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductForm);
