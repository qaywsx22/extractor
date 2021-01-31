export const LOAD_FILE = "Load file";
export const CLEAR_CANVAS = "Clear canvas";
export const SELECTION_MODE = "Selection mode";
export const CROP_IMAGE = "Crop image";
export const VECTORIZE = "Vectorize";

export const DIALOG_CANCEL = "Cancel";

export const SHOW_SAVE_DIALOG = "Save";
export const SAVE_DIALOG_ACCEPTED = "Save SVG image";

export const SHOW_SETTINGS_DIALOG = "Settings";
export const SETTINGS_DIALOG_ACCEPTED = "Save settings";

export const DECREMENT_PDF_PAGE = "Previouse page";
export const INCREMENT_PDF_PAGE = "Next page";
export const SET_PAGE = "Set page";

export const ZOOM_IN = "Zoom in";
export const ZOOM_OUT = "Zoom out";
export const SET_ZOOM = "Set zoom";
export const RESET_ZOOM = "Reset zoom";

export const RESET_POSITION = "Reset position";

export const SelectionMode = {
  RECT: "rect",
  POLYGON: "poly"
}

export function loadFile(fileName) {
  return {type: LOAD_FILE, fileName};
}

export function clearCanvas() {
  return {type: LOAD_FILE};
}

export function toggleSelectionMode() {
  return {type: SELECTION_MODE};
}

export function cropImage() {
  return {type: CROP_IMAGE};
}

export function toggleSelectionMode() {
  return {type: SELECTION_MODE};
}

export function vectorize() {
  return {type: VECTORIZE};
}

export function cancelDialog() {
  return {type: DIALOG_CANCEL};
}

export function showSaveDialog() {
  return {type: SHOW_SAVE_DIALOG};
}

export function saveImage() {
  return {type: SAVE_DIALOG_ACCEPTED};
}

export function showSettingsDialog() {
  return {type: SHOW_SETTINGS_DIALOG};
}

export function saveSettings() {
  return {type: SETTINGS_DIALOG_ACCEPTED};
}

export function decrementPage() {
  return {type: DECREMENT_PDF_PAGE};
}

export function incrementPage() {
  return {type: INCREMENT_PDF_PAGE};
}

export function setPage() {
  return {type: SET_PAGE};
}

export function zoomIn() {
  return {type: ZOOM_IN};
}

export function zoomOut() {
  return {type: ZOOM_OUT};
}

export function resetZoom() {
  return {type: RESET_ZOOM};
}

export function resetPosition() {
  return {type: RESET_POSITION};
}
