import React from "react"
import axios from "axios"
import { apis } from "../config"

const ORDER = "ORDER"
const CHECKOUT = "CHECKOUT"
const CALL = "CALL"

function getNotificationInfo(type,tableNm) {
    switch(type){
        case ORDER:
            return {
                title: "Order Notification",
                body: `Table ${tableNm} has ordered.`
            }
        case CHECKOUT:
            return {
                title: "Checkout Notification",
                body: `Table ${tableNm} is calling for checkout.`
            }
        case CALL:
            return {
                title: "Call Notification",
                body: `Table ${tableNm} is calling...`
            }
    }
}


const callSendNotification = async (type,data) => {
    try {
        let info = getNotificationInfo(type,data.table_nm_vn)
        const res = await axios.post(apis.NOTIFICATION_SEND, {
            "target": "member",
            "title": info.title,
            "body": info.body,
            "notificationDataDto": {
                "table_id": data.table_id,
                "table_info_id": data.table_info_id,
                "table_nm_vn": data.table_nm_vn,
                "table_stt_nm": "Ordering",
                "note_tx": ""
            }
        })
    } catch (error) {
        console.log(`callSendNotification ${error}`)
    }
}

export default{
    callSendNotification,
    ORDER,
    CHECKOUT,
    CALL,
}