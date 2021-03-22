import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

export const fetchAds = () => (dispatch) => {
    // dispatch(adsLoading(true))
    async function fetchData() {
        return await fetch(`${baseUrl}ads`, {
            mode: 'no-cors',
            method: 'GET'
        })
            .then(response => {
                if (response.ok) {
                    return response
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText)
                    error.response = response
                    return error
                }
            },
                error => {
                    var errmess = new Error(error.message)
                    return errmess
                })
            .then((response) => { return response.json() })
            .then(response => dispatch(addAllAds(response)))
            .catch(error => dispatch(adsFailed(error)))
    }
    fetchData()

}

export const adsLoading = () => ({
    type: ActionTypes.ADS_LOADING
})

export const adsFailed = (errmess) => ({
    type: ActionTypes.ADS_FAILED,
    payload: errmess
})

export const addAllAds = (ads) => ({
    type: ActionTypes.ADD_ADS,
    payload: ads
})

export const delAd = (adId) => (dispatch) => {
    return fetch(`${baseUrl}ads`, {
        mode: 'no-cors',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adId: adId })
    })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                return JSON.stringify(error)
            }
        },
            error => {
                var errmess = new Error(error.message)
                return JSON.stringify(errmess)
            })
        .then((response) => { return response.json() })
        .then(response => { if (response.success == true) dispatch(fetchAds()) })
        .catch(error => console.log(error))
}


export const fetchCategories = () => (dispatch) => {
    // dispatch(catLoading(true))
    async function fetchData() {
        return await fetch(`${baseUrl}fetchCat`, {
            mode: 'no-cors',
            method: 'GET'
        })
            .then(response => {
                if (response.ok) {
                    return response
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText)
                    error.response = response
                    return error
                }
            },
                error => {
                    var errmess = new Error(error.message)
                    return errmess
                })
            .then((response) => { return response.json() })
            // .then (response => console.log((response)))
            .then(response => dispatch(catAllAds(response)))
            .catch(error => dispatch(catFailed(error)))
    }
    fetchData()
}

export const catLoading = () => ({
    type: ActionTypes.CAT_LOADING
})

export const catFailed = (errmess) => ({
    type: ActionTypes.CAT_FAILED,
    payload: errmess
})

export const catAllAds = (cat) => ({
    type: ActionTypes.ADD_CAT,
    payload: cat
})
