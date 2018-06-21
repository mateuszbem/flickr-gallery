import React,{Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getImages,getMore} from '../Actions/actions'
import _ from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchBar from 'material-ui-search-bar';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text:'dogs',
      count: 10
    }
  }
  onChange = _.debounce((e) => {
      this.props.getImages(e),       
      this.setState({
        text:e
      })
  }, 300);
  onScroll = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 1000) && this.props.images.length) {
      this.props.getImages(this.state.text,this.state.count)
      this.setState({count:this.state.count+10})
    }
  }
  componentDidMount(){
    this.props.getImages(this.state.text,this.state.count);
    window.addEventListener('scroll', _.throttle(this.onScroll,500), false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, true);
  }
  render() {
    return(
      <div className="container ">
      <h1 className="my-4 text-center text-lg-left">Flickr Gallery</h1>
        <SearchBar
          value={this.state.text}
          onChange={(e)=>this.onChange(e)}
          style={{
            margin: '0 auto'
          }}
        />
        <hr/>
        {this.props.error?<div className="alert alert-danger"style={{color:'red'}}>{this.props.error.message}</div>:""}
        <div className="row text-center text-lg-left">
          <div className="col-12">
            <div className="card-columns">
            {this.props.images.map((item,index)=>{
            return( <div key={index} className="card">
                <img className="card-img-top" src={item.url} alt={item.title}/>
                <div className="card-body">
                  <h6 className="card-title">Author: <br/>{item.data.photo.owner.realname}</h6>
                  <p className="card-text"><small>{item.data.photo.description._content}</small></p>
                </div>
              </div>);
            })}
            </div>
            {this.props.loading?
          <div style={{position:"absolute", top: 'window.innerHeight-200',left: 'calc(50% - 4em)'}}><CircularProgress  size={50} /></div>
          :''}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    images: state.reducer.images,
    loading: state.reducer.loading,
    error: state.reducer.error
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getImages,getMore
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
