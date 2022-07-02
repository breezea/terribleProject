import { axiosMo as request } from "@/utils/http";



export function acidData(data = {}) {
    return request({
        url:'/getAcid',
        method:'post',
        data
    })
}


// 获取外出数据
export function outData(pageNo='1',pageSize='99') {
    return request({
        url:`/getoperationleavelist?pageNo=${pageNo}&pageSize=${pageSize}`,
        method:'post',
    })
}

// 拒绝外出
export function outReject(id,status) {
    return request({
        url:'/operationleave',
        method:'post',
        data:{
            'id':id,
            'finish':status
        }
    })
}

export function signData(data={"pageNo":1,"pageSize":99}){
    return request({
        url:'/gethealthy',
        method:'post',
        data,
    })
}