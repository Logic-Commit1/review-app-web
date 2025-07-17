export const ROUTES = {
  ROOT: '/',
  INVALID: '/invalid',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_OF_SERVICE: '/terms-of-service',
  REVIEW: '/:id/review',
  SHARE: '/:id',
  APPOINTMENT: '/view/:id',
  HELP: '/help',
  DELETE_ACCOUNT: '/delete-account',
  ANDROID: '/android',
  IOS: '/ios',
  DEMO: '/s/demo',
  CLUB: '/club',
  GROUP: '/g/:id'
};

export const getReviewRoute = (id: string | null | undefined) =>
  id ? ROUTES.REVIEW.replace(':id', id) : ROUTES.INVALID;

export const getShareRoute = (id: string | null | undefined) =>
  id ? ROUTES.SHARE.replace(':id', id) : ROUTES.INVALID;

export const getAppointmentRoute = (id: string | null | undefined) =>
  id ? ROUTES.APPOINTMENT.replace(':id', id) : ROUTES.INVALID;
