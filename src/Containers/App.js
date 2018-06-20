import React,{Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getImages} from '../Actions/actions'

class App extends Component {
  componentDidMount(){
    this.props.getImages();
  }
  render() {
    return(
      
      <div className="container">
        <div className="row">
          {this.props.loading?<p>Loading</p>:
          this.props.images.map((item,index)=>{
           return( <div key={index} className="card" style={{width: "18rem"}}>
              <img className="card-img-top" src={item.url} alt={item.title}/>
              <div className="card-body">
                <h6 className="card-title">Author: <br/>{item.data.photo.owner.realname}</h6>
                <p className="card-text"><small>{item.data.photo.description._content}</small></p>
              </div>
            </div>);
          })}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    images: state.reducer.images,
    loading: state.reducer.loading
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getImages
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
