const successCodeDefaults = {
    'OK': {
        code: '200',
        description: 'The result meaning of "success" depends on the HTTP method: The resource describing the result of the action is transmitted in the message body.',
        header: 'The request succeeded',
        text: 'OK',
    },
    'Created': {
        code: '201',
        description: 'The request succeeded, and a new resource was created as a result. This is typically the response sent after POST requests, or some PUT requests.',
        header: 'The request succeeded',
        text: 'Created',
    },
    'Accepted': {
        code: '202',
        description: 'The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.',
        header: 'The request has been received but not yet acted upon',
        text: 'Accepted',
    },
};
export { successCodeDefaults };
