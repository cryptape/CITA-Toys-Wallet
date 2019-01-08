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

class BlockList  extends React.Component<any,any> {
  constructor(props:any) {
    super(props);
    this.state={
      data: [],
      count: 0
    }
  }
  componentDidMount(){
    var self = this;
    cacheAPI.blockList().then((d:any)=>{
      self.setState({
        data: d.result.blocks,
        count: d.result.count
      })
    })
  }
  render() {
    var self = this;
    return (
      <Layout className='blockList' bgColor='white'>
        <Content style={{ width: '100%', height: '100%' }}>
          <CustomHeader/>
          <div style={{ width: '100%', backgroundImage: 'url("./images/list_bg.png")', backgroundRepeat: 'no-repeat', paddingTop: 75, paddingBottom: 98}}>
            <div className="container blockListBody" style={{ minHeight: 690, paddingTop: 47 }}>
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
                      <th style={{ width: 232/1154 * 100 +"%"}} scope="col">高度</th>
                      <th style={{ width: (591-232)/1154 * 100 +"%"}} scope="col">哈希</th>
                      <th style={{ width: (815-591)/1154 * 100 +"%"}} scope="col">出块时间</th>
                      <th style={{ width: (995-815)/1154 * 100 +"%"}} scope="col">交易数</th>
                      <th scope="col">Quota消耗</th>
                  </thead>
                  <tbody>
                  {
                  self.state.data && self.state.data.map(function(d:any, i:number){
                    return (
                      <tr key={i}>
                        <td className='blockNumberTd'>{d.header.number}</td>
                        <td>
                          <div className='blockHashTd'>{d.hash}</div>
                        </td>
                        <td className='blockTimestampTd'>{d.header.timestamp}</td>
                        <td className='blockTransactionCountTd'>{d.transactionsCount}</td>
                        <td className='blockQuotaUsedTd'>{d.header.quotaUsed}</td>
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
}))(injectIntl(BlockList))
