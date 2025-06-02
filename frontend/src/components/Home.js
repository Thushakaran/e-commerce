import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productActions";
import { toast } from 'react-toastify';
import Product from "../product/Product";

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.productsState)

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts);
    }, [error])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={`Buy Best Products`} />
                    <h1> Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product => (
                                <Product col={3} key={product._id} product={product} />
                            ))}

                        </div>
                    </section>
                </Fragment>
            }
        </Fragment>
    )
}