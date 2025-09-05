export class InvalidFileFormat extends Error {
  constructor() {
    super('Invalid file format. Only .png, .jpg and .jpeg are allowed.')
  }
}
