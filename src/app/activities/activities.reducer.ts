import { ActivitiesActions, ActivitiesActionTypes } from './activities.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Activity } from './models/activity';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { AppActionTypes, AppActions } from '../app.actions';
export interface State extends EntityState<Activity> { }

export const activityAdapter: EntityAdapter<Activity> = createEntityAdapter<Activity>();

export const initialState: State = activityAdapter.getInitialState();

export function reducer(state = initialState, action: ActivitiesActions | AppActions): State {
    switch (action.type) {
        case AppActionTypes.FetchDataSuccess:
            activityAdapter.removeAll(state);
            return activityAdapter.addMany(action.payload.activities, state);
        case ActivitiesActionTypes.AddActivitySuccess:
            return activityAdapter.addOne(action.activity, state);
        case ActivitiesActionTypes.DeleteActivitySuccess:
            return activityAdapter.removeOne(action.activityId, state);
        default:
            return state;
    }
}
