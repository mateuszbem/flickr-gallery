import axios from 'axios';
import _ from 'lodash';
let page = 20;
const apikey = "bc0f58f92aaecfff78981eb319fcca18";


export const getImages= (text="dogs",count=10) => dispatch => {
    const urlPhotos = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+apikey+"&text="+text+"&format=json&nojsoncallback=1&per_page="+count;
    const images = [];
    const data = [];
    dispatch({
        type: 'ASYNC_REQUEST',
        payload: true
    })
    axios.get(urlPhotos).then((resp)=>{
        resp.data.photos.photo.map((item)=>{
            images.push({
                url:'https://farm'+item.farm+'.staticflickr.com/'+item.server+'/'+item.id+'_'+item.secret+'.jpg',owner:item.owner,title:item.title,id:item.id,secret:item.secret,server:item.server,farm:item.farm
            })
        })
    }).then(()=>{
        dispatch(getInfo(images))
    }).catch((err)=>{
        dispatch({
            type: 'GET_IMAGES_ERROR',
            payload: err
        })
    })
}
export const getInfo = (images) => dispatch =>{
    const data = [];
    dispatch({
        type: 'ASYNC_REQUEST',
        payload: true
    })
    return Promise.all(
        images.map((item)=>{
            return axios.get("https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key="+apikey+"&photo_id="+item.id+"&secret="+item.secret+"&format=json&nojsoncallback=1")
            .then((resp)=>{
                data.push({
                    ...resp,
                    url:'https://farm'+item.farm+'.staticflickr.com/'+item.server+'/'+item.id+'_'+item.secret+'.jpg',owner:item.owner,title:item.title
                })
            })
        })).then(i=>{
            dispatch({
                type: 'GET_IMAGES',
                payload: data
            })
        }).catch((err)=>{
            dispatch({
                type: 'GET_IMAGES_ERROR',
                payload: err
            })
        })
}
export const getMore = (a,text) => dispatch =>{
    dispatch({
        type: 'ASYNC_REQUEST',
        payload: true
    })
    const urlPhotos = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+apikey+"&text="+text+"&format=json&nojsoncallback=1&per_page="+5;
    axios.get(urlPhotos).then((resp)=>{
        resp.data.photos.photo.map((item)=>{
            a.push({
                url:'https://farm'+item.farm+'.staticflickr.com/'+item.server+'/'+item.id+'_'+item.secret+'.jpg',owner:item.owner,title:item.title,id:item.id,secret:item.secret,server:item.server,farm:item.farm
            })
        })
    }).then(()=>{
        dispatch(getInfo(a))
    }).catch((err)=>{
        dispatch({
            type: 'GET_MORE_ERROR',
            payload: err
        })
    })
}