import {take, put, select} from 'redux-saga/effects';
import axios from 'axios';
import uuid from 'uuid';
import * as mutations from './mutations';

const url = 'http://localhost:9090';

export function* taskCreationSaga() {
    while(true) {
        const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID = `U1`;
        const taskID = uuid(); // to generate random id
        //create a mutation for createTask mutation to add random id and inform the reducer
        yield put(mutations.createTask(taskID,groupID,ownerID))
        const {res} = yield axios.post(url+ `/task/new`, {
            task:{
                id: taskID,
                group: groupID,
                owner: ownerID,
                isComplete: false,
                name: 'New Task'
            }
        });
        console.info('got response', res)
    }
}

export function* taskModificationSaga() {
    while(true) {
        const task = yield take([
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME,
            mutations.SET_TASK_COMPLETE
        ]);
        axios.post(url+`/task/update`, {
            task: {
                id: task.taskID,
                group: task.groupID,
                name: task.name,
                isComplete: task.isComplete
            }
        })
    }
}