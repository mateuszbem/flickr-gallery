import axios from 'axios';
import _ from 'lodash';
let page = 30;
const apikey = "bc0f58f92aaecfff78981eb319fcca18";
const urlPhotos = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+apikey+"&text=dogs&format=json&nojsoncallback=1&per_page="+page;

export const getImages= () => dispatch => {
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
    })
}
export const getInfo = (images) => dispatch =>{
    const data = [];
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
        })
}