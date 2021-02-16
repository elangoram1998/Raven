export interface NotificationModel {
    _id: string,
    notification_type: string,
    sender: {
        _id: string,
        username: string,
        avatar: string
    },
    createdAt: Date
}
