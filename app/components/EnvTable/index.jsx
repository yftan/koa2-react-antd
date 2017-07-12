import { Table, Input, Button, Icon } from 'antd';
import React from 'react'
import {fetchEnvState} from '../../actions/env.js'
import {connect} from 'react-redux'
import './index.less'
// const data = [{
//     key: '1',
//     packageName: 'libotbmathparser',
//     version: 1.5,
//     address: 'Ubuntu',
//     denpends: 'libc6(<=2.4),libcc1(>=1:3.0)',
//     description:'SAGA GIS Python bindings'
// }, {
//     key: '2',
//     packageName: 'libotbmathParser',
//     version: 2.0,
//     address: 'CentOS6',
//     denpends: 'libc6(<=2.4),libcc1(>=1:3.0)',
//     description:'osgEarth development files'
// }, {
//     key: '3',
//     packageName: 'libotbossimplugins',
//     version: 3.0,
//     address: 'Ubuntu',
//     denpends: 'libc6(<=2.4),libcc1(>=1:3.0)',
//     description:'Generic Mapping Tools'
// }, {
//     key: '4',
//     packageName: 'libotbpolarimetry',
//     version: 2.0,
//     address: 'CentOS7',
//     denpends: 'libc6(<=2.4),libcc1(>=1:3.0)',
//     description:'ORFEO Toolbox comand line'
// }];

@connect(
    state => state.env
)

export default class EnvTable extends React.Component {
    constructor(){
        super()
        this.state = {
            filterDropdownVisible: false,
            data:[],
            searchText: '',
            filtered: false,
        };
    }

    static fetch (state, dispatch) {
        const fetchTasks = []
        fetchTasks.push(
         dispatch(fetchEnvState(state))
        )
        return fetchTasks
    }

    // 前端在组件挂载后，要判断一下这个页面的状态数据，有没有初始化，如果没有，应该加载一次
    // 避免在前端路由跳转后，新的页面没有数据而报错
    componentDidMount () {
        const {loaded} = this.props
        if (!loaded) {
            this.constructor.fetch(this.props, this.props.dispatch)
        }
    }

    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
    onSearch = () => {
        const { searchText } = this.state;
        console.log(searchText)
        const reg = new RegExp(searchText, 'gi');
        const data = this.props.envConfig
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: data.map((record) => {
                const match = record.Package.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    Package: (
                        <span>
              {record.Package.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }
    render() {
        //console.log("=========EnvTable=========");
        //console.log(this.props.envConfig);
        const envData = this.props.envConfig;
        const columns = [{
            title: 'Package',
            dataIndex: 'Package',
            key: 'packageName',
            width:'20%',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.state.searchText}
                        onChange={this.onInputChange}
                        onPressEnter={this.onSearch}
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
            filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDropdownVisible,
            onFilterDropdownVisibleChange: (visible) => {
                this.setState({
                    filterDropdownVisible: visible,
                }, () => this.searchInput.focus());
            },
        }, {
            title: 'Version',
            dataIndex: 'Version',
            key: 'version',
            width:'20%',
        }, {
            title: 'Depends',
            dataIndex: 'Depends',
            key: 'depends',
            width:'50%',
        },{
            title: 'Linux',
            dataIndex: 'Origin',
            key: 'origin',
            width:'10%',
            filters: [{
                text: 'Ubuntu',
                value: 'Ubuntu',
            }, {
                text: 'CentOS6',
                value: 'CentOS6',
            }],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        }];
        return <Table columns={columns} dataSource={envData} />;
    }
}
