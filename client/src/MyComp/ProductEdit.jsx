import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { Table, TableBody, TableCell, TableHead, TableRow, makeStyles, Paper, IconButton, TextField } from '@material-ui/core';

import { DeleteForever, Edit, ImageOutlined, MoneyOutlined, DateRange, DescriptionRounded, Update, Details, MergeType, Done, } from '@material-ui/icons';
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    selectTableCell: {
        width: 60
    },
    tableCell: {
        width: 130,
        height: 40
    },
    image: {
        width: 50,
        height: 50
    },
    paper: {
        margin: 20,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflowX: "auto"
    },
    input: {
        width: 130,
        height: 40
    }
})
)



export const ProductEdit = () => {

    const classes = useStyles()

    const [products, setProducts] = useState([
        // { _id: "669", product: "hazmola", description: "pachan", price: 20, date: "1970-01-01", image: 'spider.jpg', type: 'food', isEditMode: false },
        // { _id: "60c6", product: "hp laptop", description: "fasttter", price: 2000000, date: "1970-01-01", image: 'spider.jpg', type: 'electronic', isEditMode: false }
    ])
    const [previous, setPrevious] = React.useState({});

    const [isEditMode, setIsEditMode] = React.useState({ id: null });



    //fetch data
    useEffect(() => {
        axios.get('https://react-shopworld.herokuapp.com/product').then((res) => setProducts(res.data))

    }, [])



    //edit in custom cell
    const CustomTableCell = (product, column) => {


        return (
            <TableCell align="left" className={classes.tableCell} >

                {product._id === isEditMode.id ?

                    (<TextField
                        className={classes.input}
                        value={product[column]}
                        name={column}
                        type={column === 'date' ? 'date' : column === 'price' ? 'number' : 'text'}
                        onChange={(e) => { handleChange(e, product) }}
                    />)
                    :
                    product[column]
                }

            </TableCell>
        )
    }

    //handle change
    function handleChange(e, row) {


        if (!previous[row._id]) {
            setPrevious(state => ({ ...state, [row._id]: row }))
        }

        const value = e.target.value;
        const name = e.target.name;

        const newProductRows = products.map(product => {
            if (product._id === row._id) {
                return { ...product, [name]: value };
            }
            return product;
        })

        setProducts(newProductRows)

    }




    //save the edit mode change
    function onToggleEditMode(id) {

        setProducts(state => {
            return products.map(product => {

                if (product._id === id) {
                    setIsEditMode({ ...isEditMode, id: isEditMode.id === null ? product._id : null })

                    return product
                }
                return product
            })
        })
    }




    function onRevert(id) {

        const newRows = products.map(product => {
            if (product._id === id) {
                return previous[id] ? previous[id] : product;
            }
            return product;
        });

        setProducts(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    }


    //delete
    const handleDelete = (e, id) => {
        e.preventDefault()

        axios.delete('https://react-shopworld.herokuapp.com/product/' + id)
            .then(res =>
                axios.get('http://localhost:4000/product')
                    .then((res) => setProducts(res.data))
                    .catch((err) => console.log(err))
            )
            .catch(err => { console.log('errrrr', err) })
    }

    //update
    const handleEdit = (id) => {

        setIsEditMode({id : null} )

        products.map(product => {
            if(product._id === id){
                console.log(id, product)

                axios.post('https://react-shopworld.herokuapp.com/product/update/' + id, product)
                    .then((res) => { alert('record added'); console.log(res.data) })
                    .catch((e) => { console.log('errrr', e) })
                    return
            }
            }
        )

       
    }


    return (

        <Paper className={classes.paper}>
            <Table className={classes.table} >

                <TableHead>
                    <TableRow>

                        <TableCell style={{ width: '15%' }}> <Update />  Update     </TableCell>

                        <TableCell> Sno.</TableCell>
                        <TableCell> Id</TableCell>
                        <TableCell><DateRange />  Date</TableCell>
                        <TableCell>Product Name  <Details /> </TableCell>
                        <TableCell> <MoneyOutlined /> Price</TableCell>
                        <TableCell> <MergeType /> Type</TableCell>
                        <TableCell> <DescriptionRounded /> Description</TableCell>
                        <TableCell> <ImageOutlined /> Image</TableCell>

                    </TableRow>
                </TableHead>

                <TableBody>



                    {products.map((product, index) => {


                        return (

                            <TableRow key={index} >

                                <TableCell className={classes.selectTableCell}>

                                    {product._id === isEditMode.id ? (
                                        <>
                                            <IconButton
                                                aria-label="done"
                                                onClick={() => { handleEdit(product._id) }}
                                            >
                                                <Done />
                                            </IconButton>

                                            <IconButton
                                                aria-label="revert"
                                                onClick={() => onRevert(product._id)}
                                            >
                                                <RevertIcon />
                                            </IconButton>
                                        </>
                                    ) : (

                                        <>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => onToggleEditMode(product._id)}>
                                                <Edit />
                                            </IconButton>

                                            <IconButton onClick={(e) => { handleDelete(e, product._id) }}  >
                                                <DeleteForever />
                                            </IconButton>
                                        </>

                                    )}

                                </TableCell>

                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell >{product._id ? product._id : 'null'}</TableCell>


                                {CustomTableCell(product, "date")}
                                {CustomTableCell(product, "product")}
                                {CustomTableCell(product, "price")}
                                {CustomTableCell(product, "type")}
                                {CustomTableCell(product, "description",)}


                                <TableCell>
                                    <img src={`/uploads/images/${product.image}`} className={classes.image} alt={product.image} />
                                </TableCell>

                            </TableRow>)
                    })}



                </TableBody>



            </Table>

        </Paper>
    )
}
