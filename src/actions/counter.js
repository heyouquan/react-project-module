// 编写actions
import { DECREASE, INCREASE } from '../constants/index'

export const decrease = () => ({ // 减少计数，() 表示return
    type: 'DECREASE',
    payload: {}
})

export const increase = () => ({ // 增加计数
    type: 'INCREASE',
    payload: {}
})

export const asyncIncrease = () => async (dispatch, getState) => { // 异步增加
    try {
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 2000)
        })
        dispatch(increase())
    } catch (error) {
        console.log(error)
    }
}