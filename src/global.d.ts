export type WindowLocation<S = LocationState> = Window['location'] & HLocation<S>;
export function useLocation(): WindowLocation;
export function useLocation<T = {}>(): WindowLocation<T>;
