import React from 'react';
import PropTypes from 'prop-types';

import { Btn } from '../../common/Btn/Btn';
import { Loading } from '../../common/Loading/Loading';
import { Error } from '../../common/Error/Error';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAllApartments, getLoadingApartments, fetchAllApartments } from '../../../redux/apartmentsRedux.js';

import styles from './Offers.module.scss';

class Component extends React.Component {

  state = {
    page: 0,
    rowsPerPage: 5,
    searchPhrase: '',
  }

  componentDidMount() {
    const {fetchAllOffers} = this.props;
    fetchAllOffers();
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({page: 0, rowsPerPage: parseInt(event.target.value, 10)});
  }

  handleChangePage = (event, newPage) => {
    this.setState({page: newPage});
  };

  handleSearch(phrase) {
    // this.props.changeSearchPhrase(phrase);
    this.setState({ searchPhrase: phrase });
  }

  render() {
    const { className, allApartments, loading } = this.props;
    const { page, rowsPerPage, searchPhrase } = this.state;
    // console.log('allApartments', allApartments);
    // console.log('searchPhrase', searchPhrase);

    const offersAfterSearching = allApartments.filter(
      item =>
        item.name.indexOf(searchPhrase) >= 0 ||
        item.city.indexOf(searchPhrase) >= 0 ||
        item.category.indexOf(searchPhrase) >= 0
    );

    let repository = '';
    if(searchPhrase === undefined || searchPhrase === '' || searchPhrase === null) {
      repository = allApartments;
    } else {
      repository = offersAfterSearching;
    }

    if(loading && loading.active === true) {
      return(
        <Loading />
      );
    }
    else if(loading && loading.error === true) {
      return(
        <Error />
      );
    }
    else{
      return (
        <div className={clsx(className, styles.root)}>
          <h2 className={styles.title}>Offers</h2>
          <div className={styles.headContainer}>
            <div className={styles.search}>
              <div className={styles.search__icon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={event => this.handleSearch(event.currentTarget.value)}
              />
            </div>
            <div className={styles.btnContainer}>
              <Btn variant='contained' color='primary' link='/offers/add' text='Add new offer' />
            </div>
          </div>
          <Paper className={styles.box__item}>
            <TableContainer>
              <Table className={styles.table}>
                <TableHead className={styles.table__head}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Bedrooms</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={styles.table__body}>
                  {repository && repository.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(offer => (
                    <TableRow key={offer._id}>
                      <TableCell component="th" scope="row">{offer.name}</TableCell>
                      <TableCell align="right">{offer.city}</TableCell>
                      <TableCell align="right">{offer.category}</TableCell>
                      <TableCell align="right">{offer.price}</TableCell>
                      <TableCell align="right">{offer.bedrooms}</TableCell>
                      <TableCell align="right" className={styles.btn__more}>
                        <Btn variant='outlined' color='primary' link={`/offers/${offer._id}`} text='More' />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              page={page}
              rowsPerPageOptions={[5, 10, 20]}
              rowsPerPage={rowsPerPage}
              component="div"
              count={repository.length}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              onChangePage={this.handleChangePage}
            />
          </Paper>
        </div>
      );
    }
  }
}

Component.propTypes = {
  className: PropTypes.string,
  allApartments: PropTypes.array,
  fetchAllOffers: PropTypes.func,
  loading: PropTypes.object,
};

const mapStateToProps = state => ({
  allApartments: getAllApartments(state),
  loading: getLoadingApartments(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllOffers: offer => dispatch(fetchAllApartments(offer)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Offers,
  Container as Offers,
  Component as OffersComponent,
};
