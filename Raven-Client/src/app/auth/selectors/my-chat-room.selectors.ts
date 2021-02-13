import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyChatRoom } from 'src/app/model/my-chat-room';

export const selectMyChatRooms=createFeatureSelector<MyChatRoom>('myChatRoom')