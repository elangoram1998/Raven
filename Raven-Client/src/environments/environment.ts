// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ENT_POINT: 'http://localhost:3000',
  signUp: '/api/auth/register',
  signIn: '/api/auth/login',
  friendSuggestion: '/api/friendSuggestion/getFriendSuggestion',
  myFeed: '/api/post/getMyFeed',
  logout: '/api/auth/logout',
  addFriend: '/api/friendSuggestion/addFriend',
  loadMyNotifications: '/api/notification/myNotifications',
  newPost: '/api/post/newPost',
  updatePost: '/api/post/updatePost',
  updateUserData: '/api/user/updateUserData',
  getAllPostComments: '/api/comment/getPostComments',
  addComment: '/api/comment/addComment',
  addreply: '/api/comment/addReply',
  likeComment: '/api/comment/likeComment',
  likeReply: '/api/comment/LikeReply',
  loadMessages: '/api/chat/loadMessages',
  updateMsgSeenCount: '/api/chat/updateMsgCount',
  getChatRoomCount: '/api/chat/getChatRoomCount',
  getAllUpdatedChatRooms: '/api/chat/allUpdatedChatRooms',
  getMyPosts: '/api/user/getMyPosts',
  getSavedPosts: '/api/user/getMySavedPosts',
  removeProfilePic: '/api/user/removeProfilePic',
  changeProfilePic: '/api/user/changeProfilePic',
  editProfile: '/api/user/editProfile',
  changePassword: '/api/user/changePassword',
  updateNotificationStatus: '/api/notification/updateStatus',
  getUsersData: '/api/user/getUsersData',
  updateFollowings: '/api/user/updateFollowings',
  updateChatRoom: '/api/user/updateChatRooms',
  viewProfile: '/api/user/viewProfile',
  deletePost: '/api/post/deletePost',
  sendCode: '/api/auth/sendCode',
  verifyCode: '/api/auth/verifyCode',
  resetPassword: '/api/auth/resetPassword'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
