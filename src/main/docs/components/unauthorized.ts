export const unauthorized = {
  description: 'Bad credentials',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
