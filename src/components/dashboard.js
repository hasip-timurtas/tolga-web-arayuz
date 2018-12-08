import React, { Component } from 'react';
import { db, auth } from './firebase'

class Dashboard extends Component {
  render() {
    return (
        <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="card text-white bg-primary">
              <div className="card-body pb-0">
                <div className="btn-group float-right">
                  <button type="button" className="btn btn-transparent dropdown-toggle p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="icon-settings" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
                <div className="text-value">9.823</div>
                <div>Members online</div>
              </div>
              <div className="chart-wrapper mt-3 mx-3" style={{height: 70}}>
                <canvas id="card-chart1" className="chart" height={70} />
              </div>
            </div>
          </div>
          {/*/.col*/}
          <div className="col-sm-6 col-lg-3">
            <div className="card text-white bg-info">
              <div className="card-body pb-0">
                <button type="button" className="btn btn-transparent p-0 float-right">
                  <i className="icon-location-pin" />
                </button>
                <div className="text-value">9.823</div>
                <div>Members online</div>
              </div>
              <div className="chart-wrapper mt-3 mx-3" style={{height: 70}}>
                <canvas id="card-chart2" className="chart" height={70} />
              </div>
            </div>
          </div>
          {/*/.col*/}
          <div className="col-sm-6 col-lg-3">
            <div className="card text-white bg-warning">
              <div className="card-body pb-0">
                <div className="btn-group float-right">
                  <button type="button" className="btn btn-transparent dropdown-toggle p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="icon-settings" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
                <div className="text-value">9.823</div>
                <div>Members online</div>
              </div>
              <div className="chart-wrapper mt-3" style={{height: 70}}>
                <canvas id="card-chart3" className="chart" height={70} />
              </div>
            </div>
          </div>
          {/*/.col*/}
          <div className="col-sm-6 col-lg-3">
            <div className="card text-white bg-danger">
              <div className="card-body pb-0">
                <div className="btn-group float-right">
                  <button type="button" className="btn btn-transparent dropdown-toggle p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="icon-settings" />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                  </div>
                </div>
                <div className="text-value">9.823</div>
                <div>Members online</div>
              </div>
              <div className="chart-wrapper mt-3 mx-3" style={{height: 70}}>
                <canvas id="card-chart4" className="chart" height={70} />
              </div>
            </div>
          </div>
          {/*/.col*/}
        </div>
        {/*/.row*/}
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-5">
                <h4 className="card-title mb-0">Traffic</h4>
                <div className="small text-muted">November 2017</div>
              </div>
              {/*/.col*/}
              <div className="col-sm-7 d-none d-md-block">
                <button type="button" className="btn btn-primary float-right">
                  <i className="icon-cloud-download" />
                </button>
                <div className="btn-group btn-group-toggle float-right mr-3" data-toggle="buttons">
                  <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option1" autoComplete="off" /> Day
                  </label>
                  <label className="btn btn-outline-secondary active">
                    <input type="radio" name="options" id="option2" autoComplete="off" defaultChecked /> Month
                  </label>
                  <label className="btn btn-outline-secondary">
                    <input type="radio" name="options" id="option3" autoComplete="off" /> Year
                  </label>
                </div>
              </div>
              {/*/.col*/}
            </div>
            {/*/.row*/}
            <div className="chart-wrapper" style={{height: 300, marginTop: 40}}>
              <canvas id="main-chart" className="chart" height={300} />
            </div>
          </div>
          <div className="card-footer">
            <div className="row text-center">
              <div className="col-sm-12 col-md mb-sm-2 mb-0">
                <div className="text-muted">Visits</div>
                <strong>29.703 Users (40%)</strong>
                <div className="progress progress-xs mt-2">
                  <div className="progress-bar bg-success" role="progressbar" style={{width: '40%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                </div>
              </div>
              <div className="col-sm-12 col-md mb-sm-2 mb-0">
                <div className="text-muted">Unique</div>
                <strong>24.093 Users (20%)</strong>
                <div className="progress progress-xs mt-2">
                  <div className="progress-bar bg-info" role="progressbar" style={{width: '20%'}} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} />
                </div>
              </div>
              <div className="col-sm-12 col-md mb-sm-2 mb-0">
                <div className="text-muted">Pageviews</div>
                <strong>78.706 Views (60%)</strong>
                <div className="progress progress-xs mt-2">
                  <div className="progress-bar bg-warning" role="progressbar" style={{width: '60%'}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                </div>
              </div>
              <div className="col-sm-12 col-md mb-sm-2 mb-0">
                <div className="text-muted">New Users</div>
                <strong>22.123 Users (80%)</strong>
                <div className="progress progress-xs mt-2">
                  <div className="progress-bar bg-danger" role="progressbar" style={{width: '80%'}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                </div>
              </div>
              <div className="col-sm-12 col-md mb-sm-2 mb-0">
                <div className="text-muted">Bounce Rate</div>
                <strong>40.15%</strong>
                <div className="progress progress-xs mt-2">
                  <div className="progress-bar" role="progressbar" style={{width: '40%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*/.card*/}
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="brand-card">
              <div className="brand-card-header bg-facebook">
                <i className="fa fa-facebook" />
                <div className="chart-wrapper">
                  <canvas id="social-box-chart-1" height={90} />
                </div>
              </div>
              <div className="brand-card-body">
                <div>
                  <div className="text-value">89k</div>
                  <div className="text-uppercase text-muted small">friends</div>
                </div>
                <div>
                  <div className="text-value">459</div>
                  <div className="text-uppercase text-muted small">feeds</div>
                </div>
              </div>
            </div>
          </div>
          {/*/.col*/}
          <div className="col-sm-6 col-lg-3">
            <div className="brand-card">
              <div className="brand-card-header bg-twitter">
                <i className="fa fa-twitter" />
                <div className="chart-wrapper">
                  <canvas id="social-box-chart-2" height={90} />
                </div>
              </div>
              <div className="brand-card-body">
                <div>
                  <div className="text-value">973k</div>
                  <div className="text-uppercase text-muted small">followers</div>
                </div>
                <div>
                  <div className="text-value">1.792</div>
                  <div className="text-uppercase text-muted small">tweets</div>
                </div>
              </div>
            </div>
          </div>
          {/*/.col*/}
          <div className="col-sm-6 col-lg-3">
            <div className="brand-card">
              <div className="brand-card-header bg-linkedin">
                <i className="fa fa-linkedin" />
                <div className="chart-wrapper">
                  <canvas id="social-box-chart-3" height={90} />
                </div>
              </div>
              <div className="brand-card-body">
                <div>
                  <div className="text-value">500+</div>
                  <div className="text-uppercase text-muted small">contacts</div>
                </div>
                <div>
                  <div className="text-value">292</div>
                  <div className="text-uppercase text-muted small">feeds</div>
                </div>
              </div>
            </div>
          </div>
          {/*/.col*/}
          <div className="col-sm-6 col-lg-3">
            <div className="brand-card">
              <div className="brand-card-header bg-google-plus">
                <i className="fa fa-google-plus" />
                <div className="chart-wrapper">
                  <canvas id="social-box-chart-4" height={90} />
                </div>
              </div>
              <div className="brand-card-body">
                <div>
                  <div className="text-value">894</div>
                  <div className="text-uppercase text-muted small">followers</div>
                </div>
                <div>
                  <div className="text-value">92</div>
                  <div className="text-uppercase text-muted small">circles</div>
                </div>
              </div>
            </div>
          </div>
          {/*/.col*/}
        </div>
        {/*/.row*/}
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                Traffic &amp; Sales
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="callout callout-info">
                          <small className="text-muted">New Clients</small>
                          <br />
                          <strong className="h4">9,123</strong>
                          <div className="chart-wrapper">
                            <canvas id="sparkline-chart-1" width={100} height={30} />
                          </div>
                        </div>
                      </div>
                      {/*/.col*/}
                      <div className="col-sm-6">
                        <div className="callout callout-danger">
                          <small className="text-muted">Recuring Clients</small>
                          <br />
                          <strong className="h4">22,643</strong>
                          <div className="chart-wrapper">
                            <canvas id="sparkline-chart-2" width={100} height={30} />
                          </div>
                        </div>
                      </div>
                      {/*/.col*/}
                    </div>
                    {/*/.row*/}
                    <hr className="mt-0" />
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Monday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-info" role="progressbar" style={{width: '34%'}} aria-valuenow={34} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: '78%'}} aria-valuenow={78} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Tuesday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-info" role="progressbar" style={{width: '56%'}} aria-valuenow={56} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: '94%'}} aria-valuenow={94} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Wednesday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-info" role="progressbar" style={{width: '12%'}} aria-valuenow={12} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: '67%'}} aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Thursday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-info" role="progressbar" style={{width: '43%'}} aria-valuenow={43} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: '91%'}} aria-valuenow={91} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Friday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-info" role="progressbar" style={{width: '22%'}} aria-valuenow={22} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: '73%'}} aria-valuenow={73} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Saturday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-info" role="progressbar" style={{width: '53%'}} aria-valuenow={53} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: '82%'}} aria-valuenow={82} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Sunday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-info" role="progressbar" style={{width: '9%'}} aria-valuenow={9} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: '69%'}} aria-valuenow={69} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*/.col*/}
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="callout callout-warning">
                          <small className="text-muted">Pageviews</small>
                          <br />
                          <strong className="h4">78,623</strong>
                          <div className="chart-wrapper">
                            <canvas id="sparkline-chart-3" width={100} height={30} />
                          </div>
                        </div>
                      </div>
                      {/*/.col*/}
                      <div className="col-sm-6">
                        <div className="callout callout-success">
                          <small className="text-muted">Organic</small>
                          <br />
                          <strong className="h4">49,123</strong>
                          <div className="chart-wrapper">
                            <canvas id="sparkline-chart-4" width={100} height={30} />
                          </div>
                        </div>
                      </div>
                      {/*/.col*/}
                    </div>
                    {/*/.row*/}
                    <hr className="mt-0" />
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <i className="icon-user progress-group-icon" />
                        <div>Male</div>
                        <div className="ml-auto font-weight-bold">43%</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-warning" role="progressbar" style={{width: '43%'}} aria-valuenow={43} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                    <div className="progress-group mb-5">
                      <div className="progress-group-header">
                        <i className="icon-user-female progress-group-icon" />
                        <div>Female</div>
                        <div className="ml-auto font-weight-bold">37%</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-warning" role="progressbar" style={{width: '43%'}} aria-valuenow={43} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header align-items-end">
                        <i className="icon-globe progress-group-icon" />
                        <div>Organic Search</div>
                        <div className="ml-auto font-weight-bold mr-2">191.235</div>
                        <div className="text-muted small">(56%)</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success" role="progressbar" style={{width: '56%'}} aria-valuenow={56} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header align-items-end">
                        <i className="icon-social-facebook progress-group-icon" />
                        <div>Facebook</div>
                        <div className="ml-auto font-weight-bold mr-2">51.223</div>
                        <div className="text-muted small">(15%)</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success" role="progressbar" style={{width: '15%'}} aria-valuenow={15} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header align-items-end">
                        <i className="icon-social-twitter progress-group-icon" />
                        <div>Twitter</div>
                        <div className="ml-auto font-weight-bold mr-2">37.564</div>
                        <div className="text-muted small">(11%)</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success" role="progressbar" style={{width: '11%'}} aria-valuenow={11} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header align-items-end">
                        <i className="icon-social-linkedin progress-group-icon" />
                        <div>LinkedIn</div>
                        <div className="ml-auto font-weight-bold mr-2">27.319</div>
                        <div className="text-muted small">(8%)</div>
                      </div>
                      <div className="progress-group-bars">
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success" role="progressbar" style={{width: '8%'}} aria-valuenow={8} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*/.col*/}
                </div>
                {/*/.row*/}
                <br />
                <table className="table table-responsive-sm table-hover table-outline mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">
                        <i className="icon-people" />
                      </th>
                      <th>User</th>
                      <th className="text-center">Country</th>
                      <th>Usage</th>
                      <th className="text-center">Payment Method</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src="/panel/img/avatars/1.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-success" />
                        </div>
                      </td>
                      <td>
                        <div>Yiorgos Avraamu</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>50%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="fa fa-cc-mastercard" style={{fontSize: 24}} />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>10 sec ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src="/panel/img/avatars/2.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-danger" />
                        </div>
                      </td>
                      <td>
                        <div>Avram Tarasios</div>
                        <div className="small text-muted">
                          <span>Recurring</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-br h4 mb-0" title="br" id="br" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>10%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-info" role="progressbar" style={{width: '10%'}} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="fa fa-cc-visa" style={{fontSize: 24}} />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>5 minutes ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src="/panel/img/avatars/3.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-warning" />
                        </div>
                      </td>
                      <td>
                        <div>Quintin Ed</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-in h4 mb-0" title="in" id="in" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>74%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-warning" role="progressbar" style={{width: '74%'}} aria-valuenow={74} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="fa fa-cc-stripe" style={{fontSize: 24}} />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>1 hour ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src="/panel/img/avatars/4.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-secondary" />
                        </div>
                      </td>
                      <td>
                        <div>Enéas Kwadwo</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-fr h4 mb-0" title="fr" id="fr" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>98%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: '98%'}} aria-valuenow={98} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="fa fa-paypal" style={{fontSize: 24}} />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Last month</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src="/panel/img/avatars/5.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-success" />
                        </div>
                      </td>
                      <td>
                        <div>Agapetus Tadeáš</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-es h4 mb-0" title="es" id="es" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>22%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-info" role="progressbar" style={{width: '22%'}} aria-valuenow={22} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="fa fa-google-wallet" style={{fontSize: 24}} />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Last week</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="avatar">
                          <img src="/panel/img/avatars/6.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
                          <span className="avatar-status badge-danger" />
                        </div>
                      </td>
                      <td>
                        <div>Friderik Dávid</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="flag-icon flag-icon-pl h4 mb-0" title="pl" id="pl" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>43%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <div className="progress progress-xs">
                          <div className="progress-bar bg-success" role="progressbar" style={{width: '43%'}} aria-valuenow={43} aria-valuemin={0} aria-valuemax={100} />
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="fa fa-cc-amex" style={{fontSize: 24}} />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Yesterday</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/*/.col*/}
        </div>
        {/*/.row*/}
      </div>
    );
  }
}

export default Dashboard;
