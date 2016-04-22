/* global google */

import * as types from '../constants/actionTypes.js';

const HEATMAP_LAYER_NAME = 'HeatMap';
const CLUSTER_LAYER_NAME = 'Clusters';

const initialState = {
  lpoint: {
    lat: 0,
    lng: 0
  },
  isCircleVisible: false,
  isMapClickEnabled: true,
  clickRadius: 250,
  layers: [
    {
      label: HEATMAP_LAYER_NAME,
      value: HEATMAP_LAYER_NAME
    },
    {
      label: CLUSTER_LAYER_NAME,
      value: CLUSTER_LAYER_NAME
    }
  ],
  selectedLayer: HEATMAP_LAYER_NAME
};

export default function map(state = initialState, action) {
  switch (action.type) {
    case types.MAP_CHANGE_VALUE:
      return {
        ...state,
        [action.name]: action.value
      };
    case types.MAP_CLICK:
      // if click is enabled and circle already shown - then do not do anything
      // wait until popup is closed
      if (state.isCircleVisible || !state.isMapClickEnabled) {
        return state;
      }

      // otherwise show the circle
      return {
        ...state,
        isCircleVisible: true,
        lpoint: action.lpoint
      };
    case types.NAVBAR_SEARCHSTRING_FOCUS:
    case types.SLIDEPANEL_SHOW:
    case types.POPUP_CLOSE:
      // if circle is already hidden - do not do anything
      if (!state.isCircleVisible) {
        return state;
      }

      // otherwise hide the circle
      return {
        ...state,
        isCircleVisible: false,
        lpoint: {
          lat: 0,
          lng: 0
        }
      };
    default:
      // nothing to do
      return state;
  }
}
