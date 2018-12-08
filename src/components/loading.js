import React from 'react'
import EmptyLayout from '../layouts/empty-layout'

const LoadingPage = () => 
    <EmptyLayout>  
        <div className="app flex-row align-items-center">
                <div className="container">
                <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card-group">
                    <div className="card text-white bg-primary py-5 d-md-down-none">
                        <div className="card-body text-center">
                        <div>
                            <h2>Loading...</h2>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </EmptyLayout>

export default LoadingPage