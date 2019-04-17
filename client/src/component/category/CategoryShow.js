import React from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import axios from '../axios/config';
import moment from 'moment'

const styles = theme => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: "50%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.down(600 + theme.spacing.unit * 2 * 2)]: {
            width: "80%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        background: "#000066",
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {

            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 0.5,
        },
        [theme.breakpoints.down(600 + theme.spacing.unit * 3 * 2)]: {

            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 0.5,
        },
    },
    cell: {

    }
})


class CategoryShow extends React.Component {
  constructor() {
      super()
      this.state = {
          category: []
      }

  }
  componentDidMount() {
      axios.get("/category", { headers: { "x-auth": localStorage.getItem("token") } })
          .then(response => {
              //console.log(response.data)
              const category = response.data
              this.setState(() => ({ category }))
          })
          .catch(err => {
              console.log(err)
          })
  }
  handleDelete = (id) => {
      const confirmDelete = window.confirm("Are you Sure ??")
      //const id = this.state.category._id
      console.log('delete', id)
      if (confirmDelete) {

          axios.delete(`/category/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
              .then((response) => {
                  console.log(response)
                  this.props.history.push('/category')
              })
              .catch((err) => {
                  console.log(err)
              })
      }
  }

    render() {
        const { classes } = this.props
        const { category } = this.state
        // console.log('isLoaded',isLoaded)
        const data = category.map(item => {

                return {

                    id: item._id,
                    name: item.name

                }



        })
        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>



                        <MaterialTable
                            columns={[
                                {
                                    title: 'Name', field: 'name',
                                    cellStyle: {
                                        fontSize: "14px",
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 600
                                    }
                                },

                            ]}
                            data={data}
                              editable={{
                                onRowDelete: oldData =>
                                axios.delete(`/category/${oldData.id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
                                    .then((response) => {
                                        //console.log('inside',response)
                                        let data = this.state.category;
                                        console.log('data',data)
                                        const index = data.findIndex(item=> item._id === oldData.id);
                                        console.log("index",index)
                                        data.splice(index, 1);
                                        this.setState({ category:data })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })


                               }}
                            title="Category List"
                            actions={[

                                {
                                    icon: 'add_box',
                                    tooltip: 'Add Category',
                                    onClick: (event, rowData) => {
                                        this.props.history.push(`/category/add`)
                                    },
                                    iconProps: {
                                        style: {
                                            fontSize: 24,
                                            color: 'black',
                                        },
                                    },
                                },
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit',
                                    onClick: (event, rowData) => {
                                        this.props.history.push(`/category/edit/${rowData.id}`)
                                    },
                                    iconProps: {
                                        style: {
                                          fontSize: 24,
                                          color: 'black',
                                        },
                                    },
                                }
                            ]}

                            options={{
                                actionsColumnIndex: -1,
                            }}

                        />

                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

CategoryShow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryShow);
