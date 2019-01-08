import * as React from 'react'
import './list.styl'
import Layout from '../../components/layout'
import Content from '../../components/content'
import CustomHeader from '../common/customHeader'
import CustomFooter from '../common/customFooter'

import { hashHistory } from 'react-router';

import * as cacheAPI from '../../utils/cacheAPI';

import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css';

class TransitionList  extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state={
      data: [],
      count: 0
    }
  }
  componentDidMount(){
    var self = this;
    cacheAPI.transactionList().then((d:any)=>{
      self.setState({
        data: d.transactions,
        count: d.count
      })
    })
  }
  render() {
    var self = this;
    return (
      <Layout className='transactionList' bgColor='white'>
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div style={{ width: '100%', backgroundImage: 'url("./images/list_bg.png")', backgroundRepeat: 'no-repeat', paddingTop: 75, paddingBottom: 98}}>
            <div className="container transactionListBody" style={{ minHeight: 690, paddingTop: 47 }}>
              <div className='withRow' style={{ height: 36, paddingLeft: 24, paddingRight: 20 }}>
                <div className='withRowLeftAuto' style={{ color: '#868b92', fontSize: 14 }}>
                  当前搜索参数: 2456
                </div>
                <div className='queryButton'>
                  高级选择器
                </div>
              </div>
              <div style={{ padding: "14px 23px 0 23px" }}>
                <table className="table table-hover" style={{ tableLayout: 'fixed'}} >
                  <thead style={{ backgroundColor: "#fafbff" }}>
                      <th style={{ width: 157/1154 * 100 +"%"}} scope="col">交易类型</th>
                      <th style={{ width: (312-157)/1154 * 100 +"%"}} scope="col">哈希</th>
                      <th style={{ width: (476-312)/1154 * 100 +"%"}} scope="col">从</th>
                      <th style={{ width: (623-476)/1154 * 100 +"%"}} scope="col">至</th>
                      <th style={{ width: (789-623)/1154 * 100 +"%"}} scope="col">代币值</th>
                      <th style={{ width: (897-789)/1154 * 100 +"%"}} scope="col">高度</th>
                      <th style={{ width: (981-815)/1154 * 100 +"%"}} scope="col">使用的配额</th>
                      <th scope="col">时间</th>
                  </thead>
                  <tbody>
                  {
                  self.state.data && self.state.data.map(function(d:any, i:number){
                    return (
                      <tr key={i}>
                        <td className='transactionTypeTd'>{d.type}</td>
                        <td>
                          <div className='transactionHashTd'>{d.hash}</div>
                        </td>
                        <td>
                          <div className='transactionFromTd'>{d.from}</div>
                        </td>
                        <td>
                          <div className='transactionToTd'>{d.to}</div>
                        </td>
                        <td className='transactionValueTd'>{d.gasUsed}</td>
                        <td>
                          <div className='transactionBlockNumberTd'>{d.blockNumber}</div>
                        </td>
                        <td className='transactionQuotaUsedTd'>{d.quotaUsed}</td>
                        <td className='transactionTimestampTd'>{d.timestamp}</td>
                      </tr>
                    )
                  })
                }
                  </tbody>
                </table>
                <div style={{ float: 'right'}}>
                  <Pagination onChange={()=>{}} current={1} total={ Math.ceil(self.state.count /10) } />
                </div>
              </div>
            </div>
          </div>

          <CustomFooter/>
        </Content>
      </Layout>
    );
  }
}
import {injectIntl} from 'react-intl';
import { bindActionCreators } from 'redux'
import * as appAction from '../../redux/actions/appAction'
import { IRootState } from '../../redux/states'
import { connect } from 'react-redux'

export default connect( (state:IRootState)=> ({app: state.app}), dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
}))(injectIntl(TransitionList))
