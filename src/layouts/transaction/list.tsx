import React from 'react'
import './list.styl'
import Layout from '../../components/layout'
import Header from '../common/Header'
import Footer from '../common/Footer'

import TransactionTable from '../common/transactionTable'
import TransactionSearchModal from '../common/transactionSearchModal'

import { hashHistory } from 'react-router'

class TransitionList extends React.Component<any, any> {
  componentDidMount() {
    var self = this
    var params = self.props.location.query
    var pageNum = params.pageNum ? parseInt(params.pageNum) : 1
    var pageSize = params.pageSize ? parseInt(params.pageSize) : 10
    var addressFrom = params.addressFrom || ''
    var addressTo = params.addressTo || ''
    self.props.transactionAction.getTransactionList(
      pageNum,
      pageSize,
      addressFrom,
      addressTo
    )
  }
  componentWillReceiveProps(nextProps: any) {
    var self = this
    if (
      JSON.stringify(nextProps.location.query) !==
      JSON.stringify(this.props.location.query)
    ) {
      var params = nextProps.location.query
      var pageNum = params.pageNum ? parseInt(params.pageNum) : 1
      var pageSize = params.pageSize ? parseInt(params.pageSize) : 10
      var addressFrom = params.addressFrom || ''
      var addressTo = params.addressTo || ''
      self.props.transactionAction.getTransactionList(
        pageNum,
        pageSize,
        addressFrom,
        addressTo
      )
    }
  }
  render() {
    var self = this
    var data = self.props.transaction.list
    var globalTickTime = self.props.app.globalTickTime
    return (
      <Layout className="transactionList" bgColor="white">
        <Header location={self.props.location} app={self.props.app} />
        <div
          style={{
            width: '100%',
            backgroundImage: 'url("./images/list_bg.png")',
            backgroundRepeat: 'no-repeat',
            paddingTop: 75,
            paddingBottom: 98
          }}
        >
          <div
            className="container transactionListBody"
            style={{ minHeight: 690, paddingTop: 47 }}
          >
            <div
              className="withRow"
              style={{ minHeight: 36, paddingLeft: 24, paddingRight: 20 }}
            >
              <div
                className="withRowLeftAuto"
                style={{ color: '#868b92', fontSize: 14 }}
              >
                当前搜索参数:
                <br />
                addressFrom: {self.props.transaction.list.addressFrom}
                addressTo: {self.props.transaction.list.addressTo}
              </div>
              <div
                className="queryButton operationItem"
                onClick={() => {
                  self.props.appAction.showModal({
                    ui: TransactionSearchModal,
                    uiProps: {
                      style: {
                        width: '60%'
                      },
                      from: self.props.transaction.list.addressFrom,
                      to: self.props.transaction.list.addressTo,
                      appAction: self.props.appAction
                    }
                  })
                }}
              >
                高级选择器
              </div>
            </div>
            <div style={{ padding: '14px 23px 0 23px', minHeight: 690 - 36 }}>
              <TransactionTable
                data={data}
                globalTickTime={globalTickTime}
                network={self.props.network}
                onChange={(page: number, pageSize: number) => {
                  hashHistory.push(
                    '/transaction/list?pageNum=' +
                      page +
                      '&pageSize=' +
                      pageSize +
                      '&addressFrom=' +
                      self.props.transaction.list.addressFrom +
                      '&addressTo=' +
                      self.props.transaction.list.addressTo
                  )
                }}
              />
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    )
  }
}
import { injectIntl } from 'react-intl'
import { bindActionCreators } from 'redux'
import * as appAction from '../../redux/actions/appAction'
import * as transactionAction from '../../redux/actions/transaction'

import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect(
  (state: IRootState) => ({ 
    app: state.app, 
    network: state.network,
    transaction: state.transaction
   }),
  dispatch => ({
    appAction: bindActionCreators(appAction, dispatch),
    transactionAction: bindActionCreators(transactionAction, dispatch)
  })
)(injectIntl(TransitionList))
